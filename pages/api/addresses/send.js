import * as MW from "~/node_common/middleware";
import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";

import PG from "~/node_common/powergate";

const initCORS = MW.init(MW.CORS);
const initAuth = MW.init(MW.RequireCookieAuthentication);

export default async (req, res) => {
  initCORS(req, res);
  initAuth(req, res);

  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res
      .status(500)
      .json({ decorator: "SERVER_SEND_FILECOIN", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return res
      .status(200)
      .json({ decorator: "SERVER_SEND_FILECOIN", error: true });
  }

  if (user.error) {
    return res
      .status(200)
      .json({ decorator: "SERVER_SEND_FILECOIN", error: true });
  }

  let data;
  try {
    PG.setToken(user.data.tokens.pg);
    data = await PG.ffs.sendFil(
      req.body.data.source,
      req.body.data.target,
      req.body.data.amount
    );
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send({ decorator: "SERVER_SEND_FILECOIN", error: true });
  }

  return res.status(200).json({ decorator: "SERVER_SEND_FILECOIN" });
};
