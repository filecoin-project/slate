import * as LibraryManager from "~/node_common/managers/library";
import * as Utilities from "~/node_common/utilities";
import * as Social from "~/node_common/social";

import B from "busboy";

const HIGH_WATER_MARK = 1024 * 1024 * 3;

export const formMultipart = async (req, res, { user, bucketName }) => {
  let data = null;

  const upload = () =>
    new Promise(async (resolve, reject) => {
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
          console.log("[upload] pushing to textile");
          push = await buckets.pushPath(bucketKey, data.id, stream);
          console.log("[upload] finished pushing to textile");
        } catch (e) {
          Social.sendTextileSlackMessage({
            file: "/node_common/upload.js",
            user,
            message: e.message,
            code: e.code,
            functionName: `buckets.pushPath`,
          });

          return reject({
            decorator: "SERVER_UPLOAD_ERROR",
            error: true,
            message: e.message,
          });
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
          functionName: `form`,
        });

        return reject({
          decorator: "SERVER_UPLOAD_ERROR",
          error: true,
          message: e.message,
        });
      });

      req.pipe(form);
    });

  const response = await upload();

  if (response && response.error) {
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
