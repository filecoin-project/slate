import * as MW from "~/node_common/middleware";
import * as ViewerManager from "~/node_common/managers/viewer";
import * as Utilities from "~/node_common/utilities";

const initCORS = MW.init(MW.CORS);
const initAuth = MW.init(MW.RequireCookieAuthentication);

export default async (req, res) => {
  initCORS(req, res);
  initAuth(req, res);

  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res
      .status(500)
      .json({ decorator: "SERVER_HYDRATE_FAILURE", error: true });
  }

  const data = await ViewerManager.getById({ id });

  return res
    .status(200)
    .send({ decorator: "SERVER_HYDRATE", success: true, data });
};
