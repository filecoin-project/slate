import * as MW from "~/node_common/middleware";
import * as Data from "~/node_common/data";
import * as Strings from "~/common/strings";
import * as Environment from "~/node_common/environment";
import * as Utilities from "~/node_common/utilities";

import PG from "~/node_common/powergate";
import JWT from "jsonwebtoken";
import BCrypt from "bcrypt";

import { Libp2pCryptoIdentity } from "@textile/threads-core";

const initCORS = MW.init(MW.CORS);

export default async (req, res) => {
  initCORS(req, res);

  const existing = await Data.getUserByUsername({
    username: req.body.data.username,
  });

  if (existing) {
    return res
      .status(403)
      .json({ decorator: "SERVER_EXISTING_USER_ALREADY", error: true });
  }

  if (Strings.isEmpty(req.body.data.username)) {
    return res.status(500).send({ error: "A username was not provided." });
  }

  if (Strings.isEmpty(req.body.data.password)) {
    return res.status(500).send({ error: "A password was not provided." });
  }

  // TODO(jim): Do not expose how many times you are salting
  // in OSS, add a random value as an environment variable.
  const salt = await BCrypt.genSalt(13);
  const hash = await BCrypt.hash(req.body.data.password, salt);
  const double = await BCrypt.hash(hash, salt);
  const triple = await BCrypt.hash(double, Environment.LOCAL_PASSWORD_SECRET);

  const FFS = await PG.ffs.create();
  const pg = FFS.token ? FFS.token : null;

  // API
  const identity = await Libp2pCryptoIdentity.fromRandom();
  const api = identity.toString();

  // TODO(jim):
  // Don't do this once you refactor.
  const {
    buckets,
    bucketKey,
    bucketName,
  } = await Utilities.getBucketAPIFromUserToken(api);

  const user = await Data.createUser({
    password: triple,
    salt,
    username: req.body.data.username,
    data: {
      photo: null,
      settings_deals_auto_approve: false,
      tokens: { pg, api },
      // TODO(jim):
      // Get rid of this after the refactor.
      library: [
        {
          ...Utilities.createFolder({ id: bucketName, name: "Data" }),
          children: [
            await Utilities.addFileFromFilePath({
              buckets,
              bucketKey,
              filePath: "./public/static/social.jpg",
            }),
            await Utilities.addFileFromFilePath({
              buckets,
              bucketKey,
              filePath: "./public/static/cube_000.jpg",
            }),
            await Utilities.addFileFromFilePath({
              buckets,
              bucketKey,
              filePath: "./public/static/cube_f7f7f7.jpg",
            }),
          ],
        },
      ],
    },
  });

  if (!user) {
    return res
      .status(500)
      .json({ decorator: "SERVER_USER_CREATE", error: true });
  }

  if (user.error) {
    return res
      .status(500)
      .json({ decorator: "SERVER_USER_CREATE", error: true });
  }

  return res.status(200).json({
    decorator: "SERVER_USER_CREATE",
    user: { username: user.username },
  });
};
