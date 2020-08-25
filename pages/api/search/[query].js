import * as MW from "~/node_common/middleware";

const initCORS = MW.init(MW.CORS);
const initAuth = MW.init(MW.RequireCookieAuthentication);

export default async (req, res) => {
  initCORS(req, res);
  initAuth(req, res);

  return res.status(200).send({
    decorator: "SERVER_SEARCH_QUERY",
    data: { query: req.query.query },
  });
};
