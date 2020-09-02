import * as Environment from "~/node_common/environment";
import * as MW from "~/node_common/middleware";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as Serializers from "~/node_common/serializers";

import { Buckets, PrivateKey } from "@textile/hub";

import JWT from "jsonwebtoken";

const initCORS = MW.init(MW.CORS);

const TEXTILE_KEY_INFO = {
  key: Environment.TEXTILE_HUB_KEY,
  secret: Environment.TEXTILE_HUB_SECRET,
};

export default async (req, res) => {
  initCORS(req, res);

  const user = await Data.getUserByUsername({
    username: req.body.data.username,
  });

  if (!user) {
    return res.status(200).json({ decorator: "USER_NOT_FOUND" });
  }

  if (user.error) {
    return res.status(500).json({ decorator: "USER_NOT_FOUND", error: true });
  }

  return res
    .status(200)
    .json({ decorator: "USER_FOUND", data: Serializers.user(user) });
};
