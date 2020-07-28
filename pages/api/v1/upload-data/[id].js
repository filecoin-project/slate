import * as MW from "~/node_common/middleware";
import * as Constants from "~/node_common/constants";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as LibraryManager from "~/node_common/managers/library";
import * as Strings from "~/common/strings";

import FORM from "formidable";
import FS from "fs-extra";

const initCORS = MW.init(MW.CORS);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  initCORS(req, res);

  if (Strings.isEmpty(req.headers.authorization)) {
    return res.status(404).send({
      decorator: "SERVER_API_KEY_MISSING",
      error: true,
    });
  }

  // NOTE(jim): Get Slate to make sure we can add to it.
  let slate = await Data.getSlateById({ id: req.query.id });

  if (!slate) {
    return res.status(404).json({
      decorator: "V1_SERVER_UPLOAD_SLATE_NOT_FOUND",
      error: true,
    });
  }

  if (slate.error) {
    return res.status(500).json({
      decorator: "V1_SERVER_UPLOAD_SLATE_NOT_FOUND",
      error: true,
    });
  }

  const parsed = Strings.getKey(req.headers.authorization);
  const key = await Data.getAPIKeyByKey({
    key: parsed,
  });

  if (!key) {
    return res.status(403).send({
      decorator: "V1_SERVER_API_KEY_NOT_FOUND",
      error: true,
    });
  }

  if (key.error) {
    return res.status(500).send({
      decorator: "V1_SERVER_API_KEY_NOT_FOUND",
      error: true,
    });
  }

  const f = new FORM.IncomingForm();
  f.uploadDir = Constants.FILE_STORAGE_URL;
  f.keepExtensions = true;
  f.parse(req, async (e, fields, files) => {
    if (e) {
      return res
        .status(500)
        .send({ decorator: "V1_SERVER_UPLOAD_PARSE_FAILURE", error: true });
    }

    if (!files.image) {
      return res
        .status(500)
        .send({ decorator: "V1_SERVER_UPLOAD_NOT_IMAGE_TYPE", error: true });
    }

    const path = files.image._writeStream.path;
    const data = LibraryManager.createLocalDataIncomplete(files.image);

    // TODO(jim): Send this file to buckets.
    const id = Utilities.getIdFromCookie(req);
    const user = await Data.getUserById({
      id: key.owner_id,
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
        .send({ decorator: "V1_SERVER_BUCKETS_PUSH_ISSUE", error: true });
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

    // NOTE(jim): Make the call again to handle any time difference.
    slate = await Data.getSlateById({ id: req.query.id });

    if (!slate) {
      return res.status(404).json({
        decorator: "V1_SERVER_UPLOAD_SLATE_NOT_FOUND",
        error: true,
      });
    }

    if (slate.error) {
      return res.status(500).json({
        decorator: "V1_SERVER_UPLOAD_SLATE_NOT_FOUND",
        error: true,
      });
    }

    // NOTE(jim): We have a key, we know the slate is real, so add to it.
    const update = await Data.updateSlateById({
      id: slate.id,
      updated_at: new Date(),
      data: {
        ...slate.data,
        objects: [
          {
            id: updated.id,
            ownerId: user.id,
            name: updated.name,
            url: `https://hub.textile.io${updated.ipfs}`,
          },
          ...slate.data.objects,
        ],
      },
    });

    if (!update) {
      return res.status(500).json({
        decorator: "V1_SERVER_UPLOAD_TO_SLATE_ERROR",
        error: true,
      });
    }

    if (update.error) {
      return res.status(500).json({
        decorator: "V1_SERVER_UPLOAD_TO_SLATE_ERROR",
        error: true,
      });
    }

    return res.status(200).send({
      decorator: "V1_UPLOAD_DATA_TO_SLATE",
      data: updated,
      slate: update,
      url: `https://hub.textile.io${updated.ipfs}`,
    });
  });
};
