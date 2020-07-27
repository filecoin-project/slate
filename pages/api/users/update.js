import * as Environment from "~/node_common/environment";
import * as MW from "~/node_common/middleware";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as Validations from "~/common/validations";
import * as Powergate from "~/node_common/powergate";

import DB from "~/node_common/database";
import PG from "~/node_common/powergate";
import BCrypt from "bcrypt";

const initCORS = MW.init(MW.CORS);
const initAuth = MW.init(MW.RequireCookieAuthentication);

export default async (req, res) => {
  initCORS(req, res);
  initAuth(req, res);

  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res
      .status(500)
      .json({ decorator: "SERVER_USER_UPDATE", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return res
      .status(404)
      .json({ decorator: "SERVER_USER_UPDATE_USER_NOT_FOUND", error: true });
  }

  if (user.error) {
    return res
      .status(500)
      .json({ decorator: "SERVER_USER_UPDATE_USER_NOT_FOUND", error: true });
  }

  const PG = Powergate.get(user);

  if (req.body.data) {
    const response = await Data.updateUserById({
      id: user.id,
      data: { ...user.data, ...req.body.data },
    });
  }

  if (req.body.username) {
    const existing = await Data.getUserByUsername({
      username: req.body.username,
    });

    if (!existing) {
      await Data.updateUserById({
        id: user.id,
        username: req.body.username,
      });
    }
  }

  // TODO(jim): Do not expose how many times you are salting
  // in OSS, add a random value as an environment variable.
  if (req.body.type == "CHANGE_PASSWORD") {
    if (!Validations.password(req.body.password)) {
      return res
        .status(500)
        .json({ decorator: "SERVER_INVALID_PASSWORD", error: true });
    }

    const salt = await BCrypt.genSalt(13);
    const hash = await BCrypt.hash(req.body.password, salt);
    const double = await BCrypt.hash(hash, salt);
    const triple = await BCrypt.hash(double, Environment.LOCAL_PASSWORD_SECRET);

    await Data.updateUserById({
      id: user.id,
      salt,
      password: triple,
    });
  }

  // TODO(jim): POWERGATE_ISSUE 0.2.0
  // Should work when our hosted Powergate works.
  if (req.body.type === "SET_DEFAULT_STORAGE_CONFIG") {
    let data;
    try {
      data = await PG.ffs.setDefaultStorageConfig(req.body.config);
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .send({ decorator: "SERVER_USER_UPDATE_SETTINGS_CONFIG", error: true });
    }
  }

  // TODO(jim): POWERGATE_ISSUE 0.2.0
  // Should work when our hosted Powergate works.
  if (req.body.type === "CREATE_FILECOIN_ADDRESS") {
    let data;
    try {
      data = await PG.ffs.newAddr(
        req.body.address.name,
        req.body.address.type,
        req.body.address.makeDefault
      );
    } catch (e) {
      return res
        .status(500)
        .send({ decorator: "SERVER_CREATE_FILECOIN_ADDRESS", error: true });
    }
  }

  return res.status(200).json({ decorator: "SERVER_USER_UPDATE" });
};
