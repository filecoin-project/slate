import * as LibraryManager from "~/node_common/managers/library";
import * as Utilities from "~/node_common/utilities";
import * as Social from "~/node_common/social";
import * as Strings from "~/common/strings";
import * as Logs from "~/node_common/script-logging";

import AbortController from "abort-controller";
import BusBoyConstructor from "busboy";
import Queue from "p-queue";

const WORKER_NAME = "BROWSER->RENDER->TEXTILE";
const HIGH_WATER_MARK = 1024 * 1024 * 3;
const FORCED_TIMEOUT = 1.75 * 60 * 1000;

export async function formMultipart(req, res, { user, bucketName }) {
  console.log("\n\n\n");

  // NOTE(jim): read-only
  const singleConcurrencyQueue = new Queue({ concurrency: 1 });

  const controller = new AbortController();
  const { signal } = controller;

  const heapUsed = Strings.bytesToSize(process.memoryUsage().heapUsed);

  // NOTE(jim): writable fields
  const timeoutMap = {};

  let data = null;
  let dataPath = null;

  Logs.taskTimeless(`${user.username} is pushing ${req.params.b}`, WORKER_NAME);
  Logs.taskTimeless(`heap size is ${heapUsed}`, WORKER_NAME);

  // NOTE(jim): Buckets are required
  let {
    buckets,
    bucketKey,
    bucketRoot,
  } = await Utilities.getBucketAPIFromUserToken({
    user,
    bucketName,
  });

  // NOTE(jim): We can exit early if buckets don't initialize for us.
  if (!buckets) {
    Logs.error("Utilities.getBucketAPIFromUserToken()");
    return {
      decorator: "UPLOAD_NO_BUCKETS",
      error: true,
      message: `No buckets for ${user.username}.`,
    };
  }

  const _createStreamAndUploadToTextile = async () => {
    return new Promise(function(resolvePromiseFn, rejectPromiseFn) {
      //
      //
      // NOTE(jim): Stream -> Server -> Stream -> Server
      //            [Your Browser] -> [Render.com:Express] -> [Textile:Bucket]
      //
      //
      function _safeForcedSingleConcurrencyFn(actionFn, rejectFn, timeoutId) {
        singleConcurrencyQueue.add(async function() {
          try {
            await actionFn();
          } catch (e) {
            // NOTE(jim): If we get here, and the timeout still exists, we must
            //            clear it ASAP.
            if (timeoutMap[timeoutId]) {
              Logs.note(`${timeoutId} : clearTimeout()`);
              clearTimeout(timeoutMap[timeoutId]);
              delete timeoutMap[timeoutId];
            }

            // NOTE(jim): Prevent any other functions from firing.
            Logs.error(`${timeoutId} : queue.pause()`);
            singleConcurrencyQueue.pause();

            // NOTE(jim): Abort the stream in Textile's library.
            Logs.error(`${timeoutId} : controller.abort()`);
            controller.abort();

            // NOTE(jim): Notify our team's Slack
            Logs.error(`${timeoutId} : sendTextileSlackMessage()`);
            Social.sendTextileSlackMessage({
              file: "/node_common/upload.js",
              user,
              message: e.message,
              code: e.code,
              functionName: `${timeoutId} : _safeForcedSingleConcurrencyFn()`,
            });

            // NOTE(jim): Stop piping data.
            Logs.error(`${timeoutId} : req.unpipe()`);
            req.unpipe();

            // NOTE(jim): Finally reject the promise.
            Logs.error(
              `${timeoutId} : rejectFn() of safeForcedSingleConcurrencyFn()`
            );
            return rejectFn({
              decorator: "UPLOAD_FAILURE",
              error: true,
              message: e.message,
              id: timeoutId,
            });
          }
        });
      }

      // NOTE(jim):
      // Our configuration doesn't store files locally.
      let busBoyInstance = new BusBoyConstructor({
        headers: req.headers,
        highWaterMark: HIGH_WATER_MARK,
      });

      // NOTE(jim)
      // We use this method to get the following values
      //
      // stream    - NodeStream constructor
      // mime      - the file type we can use for rendering later
      // filename  - filenames with extensions are useful for determining the type
      //             later
      busBoyInstance.on("file", function(
        fieldname,
        stream,
        filename,
        encoding,
        mime
      ) {
        const timeoutId = `${user.username}-${filename}`;

        data = LibraryManager.createLocalDataIncomplete({
          name: filename,
          type: mime,
        });

        return _safeForcedSingleConcurrencyFn(
          async () => {
            // NOTE(jim): Keeps global reference to timeout
            //            to ensure you can kill it later
            timeoutMap[timeoutId] = setTimeout(function() {
              delete timeoutMap[timeoutId];
              Logs.error(`${timeoutId} : TIMEOUT ABORTING !!!`);
              controller.abort();
            }, FORCED_TIMEOUT);

            Logs.task(
              `${timeoutId} : ${FORCED_TIMEOUT /
                1000} seconds timeout is activated`,
              WORKER_NAME
            );

            // TODO(jim): This is where we need to keep an eye out.
            //            We may need to configure this differently.
            let push = await buckets.pushPath(bucketKey, data.id, stream, {
              root: bucketRoot,
              signal,
              progress: (num) => {
                if (num % (HIGH_WATER_MARK * 10) !== 0) {
                  return;
                }

                Logs.note(`${timeoutId} : ${Strings.bytesToSize(num)}`);
              },
            });

            // NOTE(jim): You want to clear the timeout as quickly
            //            as possible because we should be able to
            //            trust the request was succesful.
            clearTimeout(timeoutMap[timeoutId]);
            delete timeoutMap[timeoutId];

            dataPath = push.path.path;

            req.unpipe();

            Logs.task(`${timeoutId} : req.unpipe()`, WORKER_NAME);
          },
          rejectPromiseFn,
          timeoutId
        );
      });

      // NOTE(jim): BusBoy is guaranteed to be finished when this is called.
      busBoyInstance.on("finish", function() {
        return _safeForcedSingleConcurrencyFn(() => {
          Logs.task("busboy finished");

          // NOTE(jim): Reject when there is no actual URL returned from
          //            streaming the data to Textile.
          if (Strings.isEmpty(dataPath)) {
            return rejectPromiseFn({
              decorator: "UPLOAD_FAILURE",
              error: true,
              message: "Missing Textile URL data.",
            });
          }

          Logs.task(dataPath, WORKER_NAME);

          return resolvePromiseFn({
            decorator: "UPLOAD_STREAM_SUCCESS",
            data: dataPath,
          });
        }, rejectPromiseFn);
      });

      // NOTE(jim): Not sure when this fires, but make sure it falls into our logic.
      busBoyInstance.on("error", function(e) {
        return _safeForcedSingleConcurrencyFn(() => {
          throw new Error(e.message);
        }, rejectPromiseFn);
      });

      Logs.task("req.pipe(busBoyInstance)", WORKER_NAME);
      req.pipe(busBoyInstance);
    });
  };

  // NOTE(jim): The callsite for the stream passing.
  const response = await _createStreamAndUploadToTextile();
  console.log(response);

  if (response && response.error) {
    res.set("Connection", "close");

    return response;
  }

  // NOTE(jim): If it is successful, we want to grab a new bucket instance so we can verify.
  Logs.note("non-essential Utilities.getBucketAPIFromuserToken()");
  let refreshed = await Utilities.getBucketAPIFromUserToken({
    user,
    bucketName,
  });

  if (!refreshed.buckets) {
    Logs.error("upload failed");
    return {
      decorator: "UPLOAD_FAILURE",
      error: true,
    };
  }

  // NOTE(jim): Try to verify the file size on Textile's bucket side.
  try {
    const newUpload = await refreshed.buckets.listIpfsPath(response.data);
    data.size = newUpload.size;

    Logs.task(
      `${data.name} with ${Strings.bytesToSize(data.size)} upload complete.`,
      WORKER_NAME
    );
  } catch (e) {
    Social.sendTextileSlackMessage({
      file: "/node_common/upload.js",
      user,
      message: e.message,
      code: e.code,
      functionName: `refreshed.listIpfsPath`,
    });

    return {
      decorator: "UPLOAD_VERIFY_FAILURE",
      error: true,
      message: e.message,
    };
  }

  // NOTE(jim): We have finished all the work involving the upload.
  Logs.task(`SUCCESS !!!`, WORKER_NAME);

  console.log(`\n\n\n`);
  return { decorator: "UPLOAD_SUCCESS", data, ipfs: response.data };
}
