import * as MW from "~/node_common/middleware";
import * as Constants from "~/node_common/constants";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";

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
      return res.status(500).send({ decorator: "SERVER_UPLOAD", error: true });
    }

    if (!files.image) {
      return res
        .status(500)
        .send({ decorator: "SERVER_UPLOAD_NOT_IMAGE", error: true });
    }

    const file = files.image;
    const data = {
      decorator: "FILE",
      icon: file.type,
      size: file.size,
      name: file.name,
      file: file.name,
      type: file.type,
      path: file._writeStream.path,
      date: new Date(),
      network: "IPFS",
    };

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

    // NOTE(jim): Push pathPath to your bucket.
    const readFile = await FS.readFileSync(data.path).buffer;
    const push = await buckets.pushPath(bucketKey, file.name, readFile);
    data.ipfs = push.path.path;
    data.id = data.ipfs;

    user.data.library[0].children.push(data);

    // TODO(jim): Update library on user.
    const response = await Data.updateUserById({
      id: user.id,
      data: { ...user.data },
    });

    // NOTE(jim): Remove the file when you're done with it.
    await FS.unlinkSync(`./${data.path}`);

    return res.status(200).send({
      decorator: "SERVER_UPLOAD",
      data,
    });
  });
};
