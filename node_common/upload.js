import * as LibraryManager from "~/node_common/managers/library";
import * as Utilities from "~/node_common/utilities";
import * as Social from "~/node_common/social";

import AbortController from "abort-controller";
import B from "busboy";

const HIGH_WATER_MARK = 1024 * 1024 * 3;

export const formMultipart = async (req, res, { user, bucketName }) => {
  let data = null;
  const controller = new AbortController();
  const { signal } = controller;

  const upload = () =>
    new Promise(async (resolve, reject) => {
      signal.onabort = () => {
        req.unpipe();
        return reject({
          decorator: "SERVER_SIGNAL_ABORT",
          error: true,
          message:
            "We triggered an abort from a Textile writable stream failure.",
        });
      };

      let form = new B({
        headers: req.headers,
        highWaterMark: HIGH_WATER_MARK,
        fileHwm: HIGH_WATER_MARK,
      });

      form.on("file", async function(
        fieldname,
        stream,
        filename,
        encoding,
        mime
      ) {
        data = LibraryManager.createLocalDataIncomplete({
          name: filename,
          type: mime,
        });

        const {
          buckets,
          bucketKey,
          bucketRoot,
        } = await Utilities.getBucketAPIFromUserToken({
          user,
          bucketName,
        });

        if (!buckets) {
          return reject({
            decorator: "SERVER_BUCKET_INIT_FAILURE",
            error: true,
          });
        }

        let push;
        try {
          console.log("[upload] PUSHING FILE");
          push = await buckets.pushPath(bucketKey, data.id, stream, {
            root: bucketRoot,
            signal,
          });
          console.log("[upload] SUCCESSFUL PUSH");
        } catch (e) {
          Social.sendTextileSlackMessage({
            file: "/node_common/upload.js",
            user,
            message: e.message,
            code: e.code,
            functionName: `buckets.pushPath (aborting)`,
          });

          return controller.abort();
        }

        return resolve({
          decorator: "SERVER_BUCKET_STREAM_SUCCESS",
          data: push.path.path,
        });
      });

      form.on("error", (e) => {
        Social.sendTextileSlackMessage({
          file: "/node_common/upload.js",
          user,
          message: e.message,
          code: e.code,
          functionName: `form (aborting)`,
        });

        controller.abort();
      });

      req.pipe(form);
    });

  const response = await upload();

  console.log("[ upload ]", response);
  if (response && response.error) {
    console.log("[ upload ] ending due to errors.");
    return response;
  }

  const { buckets } = await Utilities.getBucketAPIFromUserToken({
    user,
    bucketName,
  });

  if (!buckets) {
    return {
      decorator: "SERVER_BUCKET_INIT_FAILURE",
      error: true,
    };
  }

  try {
    const newUpload = await buckets.listIpfsPath(response.data);
    data.size = newUpload.size;
  } catch (e) {
    Social.sendTextileSlackMessage({
      file: "/node_common/upload.js",
      user,
      message: e.message,
      code: e.code,
      functionName: `buckets.listIpfsPath`,
    });

    return {
      decorator: "SERVER_UPLOAD_ERROR",
      error: true,
      message: e.message,
    };
  }

  return { decorator: "SERVER_UPLOAD_SUCCESS", data, ipfs: response.data };
};
