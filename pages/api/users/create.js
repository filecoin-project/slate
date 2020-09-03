import * as Environment from "~/node_common/environment";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as LibraryManager from "~/node_common/managers/library";
import * as Validations from "~/common/validations";

import BCrypt from "bcrypt";

import { PrivateKey } from "@textile/hub";

export default async (req, res) => {
  const existing = await Data.getUserByUsername({
    username: req.body.data.username,
  });

  if (existing) {
    return res
      .status(403)
      .send({ decorator: "SERVER_EXISTING_USER_ALREADY", error: true });
  }

  if (!Validations.username(req.body.data.username)) {
    return res
      .status(500)
      .send({ decorator: "SERVER_INVALID_USERNAME", error: true });
  }

  if (!Validations.password(req.body.data.password)) {
    return res
      .status(500)
      .send({ decorator: "SERVER_INVALID_PASSWORD", error: true });
  }

  const rounds = Number(Environment.LOCAL_PASSWORD_ROUNDS);
  const salt = await BCrypt.genSalt(rounds);
  const hash = await Utilities.encryptPassword(req.body.data.password, salt);
  // const pg = await Powergate.createNewToken();

  // TODO(jim):
  // Single Key Textile Auth.
  const identity = await PrivateKey.fromRandom();
  const api = identity.toString();

  // TODO(jim):
  // Don't do this once you refactor.
  const {
    buckets,
    bucketKey,
    bucketName,
  } = await Utilities.getBucketAPIFromUserToken(api);

  const user = await Data.createUser({
    password: hash,
    salt,
    username: req.body.data.username.toLowerCase(),
    data: {
      photo: "https://slate.host/static/a1.jpg",
      body: "A user of Slate.",
      settings_deals_auto_approve: false,
      tokens: { api },
      library: LibraryManager.init({ bucketName, readableName: "Data" }),
    },
  });

  if (!user) {
    return res
      .status(404)
      .send({ decorator: "SERVER_USER_CREATE_USER_NOT_FOUND", error: true });
  }

  if (user.error) {
    return res
      .status(500)
      .send({ decorator: "SERVER_USER_CREATE_USER_NOT_FOUND", error: true });
  }

  return res.status(200).send({
    decorator: "SERVER_USER_CREATE",
    user: { username: user.username, id: user.id },
  });
};
