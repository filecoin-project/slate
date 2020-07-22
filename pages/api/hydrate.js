import * as MW from "~/node_common/middleware";
import * as Models from "~/node_common/models";
import * as Utilities from "~/node_common/utilities";

const initCORS = MW.init(MW.CORS);
const initAuth = MW.init(MW.RequireCookieAuthentication);

export default async (req, res) => {
  initCORS(req, res);
  initAuth(req, res);

  const username = Utilities.getUserFromCookie(req);
  if (!username) {
    return res
      .status(500)
      .json({ decorator: "SERVER_USER_DELETE", error: true });
  }

  const data = await Models.getViewer({ username });

  return res
    .status(200)
    .send({ decorator: "SERVER_HYDRATE", success: true, data });
};
