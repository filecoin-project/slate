import * as Constants from "~/node_common/constants";
import * as LibraryManager from "~/node_common/managers/library";
import * as Utilities from "~/node_common/utilities";

import FS from "fs-extra";
import FORM from "formidable";

// TODO(jim): Ideally we never keep the file locally.
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

      if (!files.data) {
        return reject({
          decorator: "SERVER_UPLOAD_ERROR_CHECK_FORM_TYPE",
          error: true,
          message: files,
        });
      }

      const path = files.data._writeStream.path;
      const localPath = `./${path}`;
      const data = LibraryManager.createLocalDataIncomplete(files.data);

      const { buckets, bucketKey, bucketName } = await Utilities.getBucketAPIFromUserToken(user.data.tokens.api);

      let readFile;
      let push;
      try {
        readFile = FS.createReadStream(path, {
          highWaterMark: 1024 * 1024 * 3,
        });

        push = await buckets.pushPath(bucketKey, data.name, readFile);
      } catch (e) {
        await FS.unlinkSync(localPath);

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
