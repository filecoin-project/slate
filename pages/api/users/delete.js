import * as Environment from "~/node_common/environment";
import * as MW from "~/node_common/middleware";
import * as Data from "~/node_common/data";

import { Buckets } from "@textile/hub";
import { Libp2pCryptoIdentity } from "@textile/threads-core";

const initCORS = MW.init(MW.CORS);
const initAuth = MW.init(MW.RequireCookieAuthentication);

const TEXTILE_KEY_INFO = {
  key: Environment.TEXTILE_HUB_KEY,
  secret: Environment.TEXTILE_HUB_SECRET,
};

export default async (req, res) => {
  initCORS(req, res);
  initAuth(req, res);

  const user = await Data.getUserByUsername({
    username: req.body.data.username,
  });

  if (!user) {
    return res
      .status(200)
      .json({ decorator: "SERVER_USER_DELETE", error: true });
  }

  if (user.error) {
    return res
      .status(200)
      .json({ decorator: "SERVER_USER_DELETE", error: true });
  }

  const i = await Libp2pCryptoIdentity.fromString(user.data.tokens.api);
  const b = await Buckets.withKeyInfo(TEXTILE_KEY_INFO);
  await b.getToken(i);
  await b.open("data");

  try {
    const response = await b.remove("data");
    console.log({ response });
  } catch (e) {
    console.log(e);
  }

  const deleted = await Data.deleteUserByUsername({
    username: req.body.data.username,
  });

  if (!deleted) {
    return res
      .status(200)
      .json({ decorator: "SERVER_USER_DELETE", error: true });
  }

  return res.status(200).json({ decorator: "SERVER_USER_DELETE", deleted });
};
