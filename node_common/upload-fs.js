import * as LibraryManager from "~/node_common/managers/library";
import * as Utilities from "~/node_common/utilities";
import * as Constants from "~/node_common/constants";

import B from "busboy";
import FS from "fs";
import path from "path";

import { v4 as uuid } from "uuid";

const HIGH_WATER_MARK = 1024 * 1024 * 3;

export const formMultipart = (req, res, { user }) =>
  new Promise(async (resolve, reject) => {
    let form = new B({
      headers: req.headers,
      highWaterMark: HIGH_WATER_MARK,
    });

    let target = null;
    let tempPath = null;

    form.on("file", function(fieldname, file, filename, encoding, mime) {
      target = {
        type: mime,
        name: filename,
      };

      // TODO(jim):
      // Construct a stream instead.
      tempPath = path.join(
        Constants.FILE_STORAGE_URL,
        path.basename(`temp-${uuid()}`)
      );
      let outStream = FS.createWriteStream(tempPath);
      return file.pipe(outStream);
    });

    form.on("error", async (e) => {
      await FS.unlinkSync(tempPath);
      return reject({
        decorator: "SERVER_UPLOAD_PARSE_FAILURE",
        error: true,
        message: e,
      });
    });

    form.on("finish", async () => {
      // NOTE(jim):
      // FS.createReadStream works the most consistently.
      const readStream = FS.createReadStream(tempPath, {
        highWaterMark: HIGH_WATER_MARK,
      });
      const data = LibraryManager.createLocalDataIncomplete(target);

      // TODO(jim): Put this call into a file for all Textile related calls.
      let { buckets, bucketKey } = await Utilities.getBucketAPIFromUserToken({
        user,
      });

      if (!buckets) {
        return reject({
          decorator: "SERVER_BUCKETS_INIT_ISSUE",
          error: true,
        });
      }

      let push;
      try {
        push = await buckets.pushPath(bucketKey, data.name, readStream);
      } catch (e) {
        await FS.unlinkSync(tempPath);
        return reject({
          decorator: "SERVER_BUCKETS_PUSH_ISSUE",
          error: true,
          message: e,
        });
      }

      // NOTE(jim)
      // Delete temporary local file,
      await FS.unlinkSync(tempPath);

      let { buckets, bucketKey } = await Utilities.getBucketAPIFromUserToken({
        user,
      });

      if (!buckets) {
        return reject({
          decorator: "SERVER_BUCKETS_INIT_ISSUE",
          error: true,
        });
      }

      // NOTE(jim)
      // Get remote file size from bucket.
      // TODO(jim): Put this call into a file for all Textile related calls.
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

      return resolve({ decorator: "SERVER_UPLOAD_SUCCESS", data, ipfs });
    });

    return req.pipe(form);
  });
