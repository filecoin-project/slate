import * as MW from "~/node_common/middleware";
import * as Constants from "~/node_common/constants";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as LibraryManager from "~/node_common/managers/library";

import FORM from "formidable";
import FS from "fs-extra";

const initCORS = MW.init(MW.CORS);
const initAuth = MW.init(MW.RequireCookieAuthentication);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  initCORS(req, res);
  initAuth(req, res);

  const f = new FORM.IncomingForm();
  f.uploadDir = Constants.FILE_STORAGE_URL;
  f.keepExtensions = true;
  f.parse(req, async (e, fields, files) => {
    if (e) {
      return res
        .status(500)
        .send({ decorator: "SERVER_UPLOAD_PARSE_FAILURE", error: true });
    }

    if (!files.image) {
      return res
        .status(500)
        .send({ decorator: "SERVER_UPLOAD_NOT_IMAGE_TYPE", error: true });
    }

    const path = files.image._writeStream.path;
    const data = LibraryManager.createLocalDataIncomplete(files.image);

    // TODO(jim): Send this file to buckets.
    const id = Utilities.getIdFromCookie(req);
    const user = await Data.getUserById({
      id,
    });

    const {
      buckets,
      bucketKey,
      bucketName,
    } = await Utilities.getBucketAPIFromUserToken(user.data.tokens.api);

    let readFile;
    let push;
    try {
      // NOTE(jim): Push pathPath to your bucket.
      readFile = await FS.readFileSync(path).buffer;
      push = await buckets.pushPath(bucketKey, data.name, readFile);
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .send({ decorator: "SERVER_BUCKETS_PUSH_ISSUE", error: true });
    }

    // NOTE(jim): Update your user flag.
    const updated = LibraryManager.updateDataIPFS(data, {
      ipfs: push.path.path,
    });

    // NOTE(jim): Update your library
    const updatedUserData = LibraryManager.addData({ user, data: updated });

    // NOTE(jim): Update your user
    const response = await Data.updateUserById({
      id: user.id,
      data: updatedUserData,
    });

    // NOTE(jim): Remove the file when you're done with it.
    await FS.unlinkSync(`./${path}`);

    return res.status(200).send({
      decorator: "SERVER_UPLOAD",
      data: updated,
    });
  });
};
