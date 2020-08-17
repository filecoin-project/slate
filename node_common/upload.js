import * as LibraryManager from "~/node_common/managers/library";
import * as Utilities from "~/node_common/utilities";

import B from "busboy";

const HIGH_WATER_MARK = 1024 * 1024 * 3;

export const formMultipart = async (req, res, { user }) => {
  let data = null;

  const upload = () =>
    new Promise(async (resolve, reject) => {
      let form = new B({
        headers: req.headers,
        highWaterMark: HIGH_WATER_MARK,
      });

      form.on("file", async function (fieldname, stream, filename, encoding, mime) {
        data = LibraryManager.createLocalDataIncomplete({
          name: filename,
          type: mime,
        });

        let push;
        try {
          const token = user.data.tokens.api;
          const { buckets, bucketKey } = await Utilities.getBucketAPIFromUserToken(token);
          push = await buckets.pushPath(bucketKey, data.id, stream);
        } catch (e) {
          return reject({
            decorator: "SERVER_BUCKETS_PUSH_ISSUE",
            error: true,
            message: e,
          });
        }

        return resolve({ decorator: "SERVER_BUCKET_STREAM_SUCCESS", data: push.path.path });
      });

      form.on("error", (e) => {
        return reject({
          decorator: "SERVER_BUCKET_STREAM_FAILURE",
          error: true,
          message: e,
        });
      });

      req.pipe(form);
    });

  const response = await upload();

  if (response.error) {
    return response;
  }

  try {
    const token = user.data.tokens.api;
    const { buckets } = await Utilities.getBucketAPIFromUserToken(token);
    const newUpload = await buckets.listIpfsPath(response.data);
    data.size = newUpload.size;
  } catch (e) {
    return {
      decorator: "SERVER_BUCKETS_VERIFY_ISSUE",
      error: true,
      message: e,
    };
  }

  return { decorator: "SERVER_UPLOAD_SUCCESS", data, ipfs: response.data };
};
