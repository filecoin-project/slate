import * as MW from "~/node_common/middleware";

import DB from "~/node_common/database";

const initCORS = MW.init(MW.CORS);

export default (req, res) => {
  initCORS(req, res);

  return res
    .status(200)
    .json({ decorator: "SERVER_HEALTH_CHECK", data: req.body.data });
};
