import * as Environment from "~/node_common/environment";
import * as MW from "~/node_common/middleware";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";

import { Buckets } from "@textile/hub";
import { Libp2pCryptoIdentity } from "@textile/threads-core";

import JWT from "jsonwebtoken";

const initCORS = MW.init(MW.CORS);
const initAuth = MW.init(MW.RequireCookieAuthentication);

const TEXTILE_KEY_INFO = {
  key: Environment.TEXTILE_HUB_KEY,
  secret: Environment.TEXTILE_HUB_SECRET,
};

export default async (req, res) => {
  initCORS(req, res);
  initAuth(req, res);

  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res
      .status(500)
      .json({ decorator: "SERVER_USER_DELETE", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return res
      .status(404)
      .json({ decorator: "SERVER_USER_DELETE_USER_NOT_FOUND", error: true });
  }

  if (user.error) {
    return res
      .status(500)
      .json({ decorator: "SERVER_USER_DELETE_USER_NOT_FOUND", error: true });
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
    username: user.username,
  });

  if (!deleted) {
    return res
      .status(200)
      .json({ decorator: "SERVER_USER_DELETE", error: true });
  }

  return res.status(200).json({ decorator: "SERVER_USER_DELETE", deleted });
};
