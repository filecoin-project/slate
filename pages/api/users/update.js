import * as Environment from "~/node_common/environment";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as Validations from "~/common/validations";
import * as Social from "~/node_common/social";
import * as ViewerManager from "~/node_common/managers/viewer";
import * as SearchManager from "~/node_common/managers/search";

import BCrypt from "bcrypt";

export default async (req, res) => {
  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res.status(500).send({ decorator: "SERVER_USER_UPDATE", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return res.status(404).send({ decorator: "SERVER_USER_UPDATE_USER_NOT_FOUND", error: true });
  }

  if (user.error) {
    return res.status(500).send({ decorator: "SERVER_USER_UPDATE_USER_NOT_FOUND", error: true });
  }

  let unsafeResponse;

  if (req.body.username) {
    const existing = await Data.getUserByUsername({
      username: req.body.username.toLowerCase(),
    });

    if (existing && existing.id !== id) {
      return res.status(500).send({ decorator: "SERVER_USERNAME_IS_TAKEN", error: true });
    }
  }

  if (req.body.type === "SAVE_DEFAULT_ARCHIVE_CONFIG") {
    let b;
    try {
      b = await Utilities.getBucketAPIFromUserToken({
        user,
        bucketName: "data",
      });
    } catch (e) {
      console.log(e);
      Social.sendTextileSlackMessage({
        file: "/pages/api/users/update.js",
        user,
        message: e.message,
        code: e.code,
        functionName: `Utilities.getBucketAPIFromUserToken`,
      });

      return res.status(500).send({ decorator: "SERVER_FAILED_TO_GET_BUCKET", error: true });
    }

    try {
      const configResponse = await b.buckets.setDefaultArchiveConfig(b.bucketKey, req.body.config);
    } catch (e) {
      console.log(e);
      Social.sendTextileSlackMessage({
        file: "/pages/api/users/update.js",
        user,
        message: e.message,
        code: e.code,
        functionName: `b.buckets.setDefaultArchiveConfig`,
      });

      return res.status(500).send({ decorator: "SERVER_DEFAULT_ARCHIVE_CONFIG", error: true });
    }
  }

  if (req.body.type == "CHANGE_PASSWORD") {
    if (!Validations.password(req.body.password)) {
      return res.status(500).send({ decorator: "SERVER_INVALID_PASSWORD", error: true });
    }

    const rounds = Number(Environment.LOCAL_PASSWORD_ROUNDS);
    const salt = await BCrypt.genSalt(rounds);
    const hash = await Utilities.encryptPassword(req.body.password, salt);

    unsafeResponse = await Data.updateUserById({
      id: user.id,
      salt,
      password: hash,
    });
  } else {
    unsafeResponse = await Data.updateUserById({
      id: user.id,
      username: req.body.username ? req.body.username.toLowerCase() : user.username,
      data: { ...user.data, ...req.body.data },
    });
  }

  if (unsafeResponse && !unsafeResponse.error) {
    ViewerManager.hydratePartialViewer(unsafeResponse);

    if (
      user.username !== unsafeResponse.username ||
      user.data.name !== unsafeResponse.data.name ||
      user.data.photo !== unsafeResponse.data.photo
    ) {
      SearchManager.updateUser(unsafeResponse, "EDIT");
    }
  }

  return res.status(200).send({ decorator: "SERVER_USER_UPDATE" });
};
