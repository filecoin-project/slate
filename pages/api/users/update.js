import * as Environment from "~/node_common/environment";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as Validations from "~/common/validations";

import BCrypt from "bcrypt";

export default async (req, res) => {
  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res
      .status(500)
      .send({ decorator: "SERVER_USER_UPDATE", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return res
      .status(404)
      .send({ decorator: "SERVER_USER_UPDATE_USER_NOT_FOUND", error: true });
  }

  if (user.error) {
    return res
      .status(500)
      .send({ decorator: "SERVER_USER_UPDATE_USER_NOT_FOUND", error: true });
  }

  // const PG = Powergate.get(user);

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
        .send({ decorator: "SERVER_INVALID_PASSWORD", error: true });
    }

    const rounds = Number(Environment.LOCAL_PASSWORD_ROUNDS);
    const salt = await BCrypt.genSalt(rounds);
    const hash = await Utilities.encryptPassword(req.body.password, salt);

    await Data.updateUserById({
      id: user.id,
      salt,
      password: hash,
    });
  }

  return res.status(200).send({ decorator: "SERVER_USER_UPDATE" });
};
