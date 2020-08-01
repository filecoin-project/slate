import * as Constants from "~/node_common/constants";
import * as LibraryManager from "~/node_common/managers/library";
import * as Utilities from "~/node_common/utilities";

import FS from "fs-extra";
import FORM from "formidable";

export const formMultipart = (req, res, { user }) =>
  new Promise((resolve, reject) => {
    const f = new FORM.IncomingForm();
    f.uploadDir = Constants.FILE_STORAGE_URL;
    f.keepExtensions = true;
    f.parse(req, async (e, fields, files) => {
      if (e) {
        return reject({
          decorator: "SERVER_UPLOAD_PARSE_FAILURE",
          error: true,
          message: e,
        });
      }

      if (!files.image) {
        return reject({
          decorator: "SERVER_UPLOAD_NOT_IMAGE_TYPE",
          error: true,
          message: files,
        });
      }

      const path = files.image._writeStream.path;
      const localPath = `./${path}`;
      const data = LibraryManager.createLocalDataIncomplete(files.image);

      const {
        buckets,
        bucketKey,
        bucketName,
      } = await Utilities.getBucketAPIFromUserToken(user.data.tokens.api);

      let readFile;
      let push;
      // TODO(jim): Send this file to buckets.
      try {
        // NOTE(jim): Push pathPath to your bucket.
        readFile = await FS.readFileSync(path).buffer;
        push = await buckets.pushPath(bucketKey, data.name, readFile);
      } catch (e) {
        return reject({
          decorator: "SERVER_BUCKETS_PUSH_ISSUE",
          error: true,
          message: e,
        });
      }

      // NOTE(jim): Remove the file when you're done with it.
      await FS.unlinkSync(localPath);

      return resolve({ data, ipfs: push.path.path });
    });
  });
