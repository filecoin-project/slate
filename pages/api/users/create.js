import * as MW from "~/node_common/middleware";
import * as Data from "~/node_common/data";
import * as Strings from "~/common/strings";

import PG from "~/node_common/powergate";
import JWT from "jsonwebtoken";
import BCrypt from "bcrypt";

import { Libp2pCryptoIdentity } from "@textile/threads-core";

const initCORS = MW.init(MW.CORS);
const SECRET = `$2b$13$${process.env.LOCAL_PASSWORD_SECRET}`;

export default async (req, res) => {
  initCORS(req, res);

  if (Strings.isEmpty(req.body.data.email)) {
    return res
      .status(500)
      .send({ error: "An e-mail address was not provided." });
  }

  if (Strings.isEmpty(req.body.data.password)) {
    return res.status(500).send({ error: "A password was not provided." });
  }

  // TODO(jim): Do not expose how many times you are salting
  // in OSS, add a random value as an environment variable.
  const salt = await BCrypt.genSalt(13);
  const hash = await BCrypt.hash(req.body.data.password, salt);
  const double = await BCrypt.hash(hash, salt);
  const triple = await BCrypt.hash(double, SECRET);

  const FFS = await PG.ffs.create();
  const pg = FFS.token ? FFS.token : null;

  // API
  const identity = await Libp2pCryptoIdentity.fromRandom();
  const api = identity.toString();

  const user = await Data.createUser({
    email: req.body.data.email,
    password: triple,
    salt,
    username: req.body.data.username,
    data: { tokens: { pg, api } },
  });

  if (!user) {
    return res
      .status(200)
      .json({ decorator: "SERVER_USER_CREATE", error: true });
  }

  if (user.error) {
    return res
      .status(200)
      .json({ decorator: "SERVER_USER_CREATE", error: true });
  }

  return res.status(200).json({
    decorator: "SERVER_USER_CREATE",
    user: { username: user.username },
  });
};
