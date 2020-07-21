import * as MW from "~/node_common/middleware";
import * as Models from "~/node_common/models";

const initCORS = MW.init(MW.CORS);
const initAuth = MW.init(MW.RequireCookieAuthentication);

export default async (req, res) => {
  initCORS(req, res);
  initAuth(req, res);

  const data = await Models.getViewer({ username: req.body.data.username });

  return res
    .status(200)
    .send({ decorator: "SERVER_HYDRATE", success: true, data });
};
