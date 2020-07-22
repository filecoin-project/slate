import * as MW from "~/node_common/middleware";

import DB from "~/node_common/database";
import PG from "~/node_common/powergate";

const initCORS = MW.init(MW.CORS);
const initAuth = MW.init(MW.RequireCookieAuthentication);

export default async (req, res) => {
  initCORS(req, res);
  initAuth(req, res);

  // TODO(jim): POWERGATE_ISSUE
  // Should work when our hosted Powergate works.
  if (req.body.type === "SET_DEFAULT_STORAGE_CONFIG") {
    let data;
    try {
      data = await PG.ffs.setDefaultStorageConfig(req.body.config);
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .send({ decorator: "SERVER_USER_UPDATE_SETTINGS_CONFIG", error: true });
    }
  }

  return res.status(200).json({ decorator: "SERVER_USER_UPDATE" });
};
