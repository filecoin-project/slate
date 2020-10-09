import * as LibraryManager from "~/node_common/managers/library";
import * as Utilities from "~/node_common/utilities";
import * as Social from "~/node_common/social";
import * as Strings from "~/common/strings";
import * as Logs from "~/node_common/script-logging";

import AbortController from "abort-controller";
import B from "busboy";
import Queue from "p-queue";

const HIGH_WATER_MARK = 1024 * 1024 * 3;

// NOTE(jim): This method is my attempt to be forceful around busboy calls.
//            We don't want a ton of async methods flying around.
//            So force one function at a time.
function safeForcedSingleConcurrencyFn(
  actionFn,
  rejectFn,
  queue,
  req,
  user,
  controller
) {
  queue.add(async function() {
    try {
      await actionFn();
    } catch (e) {
      // NOTE(jim): immediately pause the queue
      Logs.error("emergency: pausing the queue");
      queue.pause();

      // NOTE(jim): Guarantee we kill the signal on textiles end.
      Logs.error("emergency: sending abort signal to textile");
      controller.abort();

      Logs.error("emergency: reporting bug to slack");
      // NOTE(jim): Report any bugs to slack.
      Social.sendTextileSlackMessage({
        file: "/node_common/upload.js",
        user,
        message: e.message,
        code: e.code,
        functionName: `safeCall`,
      });

      // NOTE(jim): Kill the pipe
      Logs.error("emergency: unpipe");
      req.unpipe();

      Logs.error("emergency: exit promise with failure");
      return rejectFn({
        decorator: "UPLOAD_FAILURE",
        error: true,
        message: e.message,
      });
    }
  });
}

export const formMultipart = async (req, res, { user, bucketName }) => {
  const heapUsed = Strings.bytesToSize(process.memoryUsage().heapUsed);
  Logs.task(`Starting heap size ${heapUsed}`, "BROWSER->RENDER->TEXTILE");

  // NOTE(jim): Variable for the file to save to DB later.
  let data = null;
  let dataPath = null;

  // NOTE(jim): One function at a time.
  const singleConcurrencyQueue = new Queue({ concurrency: 1 });

  // NOTE(jim): Prepares the abort controller.
  const controller = new AbortController();
  const { signal } = controller;

  // NOTE(jim): Prepares the buckets state for this file.
  let {
    buckets,
    bucketKey,
    bucketRoot,
  } = await Utilities.getBucketAPIFromUserToken({
    user,
    bucketName,
  });

  const _upload = async () => {
    return new Promise(function(resolve, reject) {
      let form = new B({
        headers: req.headers,
        highWaterMark: HIGH_WATER_MARK,
      });

      // NOTE(jim): We only use this method to get a perfect stream
      form.on("file", function(fieldname, stream, filename, encoding, mime) {
        return safeForcedSingleConcurrencyFn(
          async () => {
            data = LibraryManager.createLocalDataIncomplete({
              name: filename,
              type: mime,
            });

            if (!buckets) {
              throw new Error("!buckets");
            }

            let push = await buckets.pushPath(bucketKey, data.id, stream, {
              root: bucketRoot,
              signal,
            });

            // NOTE(jim): Save to memory so when busboy is finished
            //            We can resolve this elegantly.
            dataPath = push.path.path;

            // NOTE(jim): We don't need the pipe anymore !!!
            req.unpipe();
            Logs.task("Busboy pipe finish", "BROWSER->RENDER->TEXTILE");
          },
          reject,
          singleConcurrencyQueue,
          req,
          user,
          controller
        );
      });

      // NOTE(jim): We don't need this, but lets elegantly handle events.
      form.on("finish", () => {
        return safeForcedSingleConcurrencyFn(
          () => {
            Logs.task(dataPath, "BROWSER->RENDER->TEXTILE");

            if (Strings.isEmpty(dataPath)) {
              throw new Error("IPFS asset URL missing");
            }

            return resolve({
              decorator: "UPLOAD_STREAM_SUCCESS",
              data: dataPath,
            });
          },
          reject,
          singleConcurrencyQueue,
          req,
          user,
          controller
        );
      });

      // NOTE(jim): We don't need this, shouldn't happen.
      form.on("error", function(e) {
        return safeForcedSingleConcurrencyFn(
          () => {
            throw new Error(e);
          },
          reject,
          singleConcurrencyQueue,
          req,
          user,
          controller
        );
      });

      Logs.task("Busboy pipe start", "BROWSER->RENDER->TEXTILE");

      req.pipe(form);
    });
  };

  const response = await _upload();

  console.log(response);

  if (response && response.error) {
    return response;
  }

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

  try {
    const newUpload = await refreshed.buckets.listIpfsPath(response.data);
    data.size = newUpload.size;

    Logs.task(
      `A new ${Strings.bytesToSize(data.size)} file was uploaded successfully`,
      "BROWSER->RENDER->TEXTILE"
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

  Logs.task(`Upload workflow complete !!!`, "BROWSER->RENDER->TEXTILE");
  Logs.task(`Upload workflow complete !!!`, "BROWSER->RENDER->TEXTILE");
  Logs.task(`Upload workflow complete !!!`, "BROWSER->RENDER->TEXTILE");
  return { decorator: "UPLOAD_SUCCESS", data, ipfs: response.data };
};
