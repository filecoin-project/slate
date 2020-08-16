import * as LibraryManager from "~/node_common/managers/library";
import * as Utilities from "~/node_common/utilities";

import FORM from "formidable";

import { PassThrough } from "stream";

export const formMultipart = (req, res, { user }) =>
  new Promise(async (resolve, reject) => {
    const f = new FORM.IncomingForm();
    const p = new PassThrough({ highWaterMark: 1024 * 1024 * 3 });
    const file = {};

    const { buckets, bucketKey } = await Utilities.getBucketAPIFromUserToken(user.data.tokens.api);

    f.keepExtensions = true;

    f.onPart = (part) => {
      if (!part.filename) {
        form.handlePart(part);
        return;
      }

      file.name = part.filename;
      file.type = part.mime;

      part.on("data", function (buffer) {
        p.write(buffer);
      });

      part.on("end", function (data) {
        p.end();
      });
    };

    f.on("progress", (bytesReceived, bytesExpected) => {
      // console.log({ bytesReceived, bytesExpected });
    });

    f.parse(req, async (e) => {
      if (e) {
        return reject({
          decorator: "SERVER_UPLOAD_PARSE_FAILURE",
          error: true,
          message: e,
        });
      }

      if (!file && !file.name) {
        return reject({
          decorator: "SERVER_UPLOAD_ERROR_CHECK_FORM_TYPE",
          error: true,
          message: file,
        });
      }

      // NOTE(jim): Creates a Slate compatable Data object.
      const data = LibraryManager.createLocalDataIncomplete(file);

      let push;
      try {
        push = await buckets.pushPath(bucketKey, data.name, p);
      } catch (e) {
        return reject({
          decorator: "SERVER_BUCKETS_PUSH_ISSUE",
          error: true,
          message: e,
        });
      }

      let ipfs = push.path.path;
      try {
        const newUpload = await buckets.listIpfsPath(ipfs);
        data.size = newUpload.size;
      } catch (e) {
        return reject({
          decorator: "SERVER_BUCKETS_VERIFY_ISSUE",
          error: true,
          message: e,
        });
      }

      return resolve({ data, ipfs });
    });
  });
