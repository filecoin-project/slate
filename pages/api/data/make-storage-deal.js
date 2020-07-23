import * as MW from "~/node_common/middleware";
import * as Constants from "~/node_common/constants";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";

import FORM from "formidable";
import FS from "fs-extra";

const initCORS = MW.init(MW.CORS);
const initAuth = MW.init(MW.RequireCookieAuthentication);

export default async (req, res) => {
  initCORS(req, res);
  initAuth(req, res);

  return res.status(200).send({
    decorator: "SERVER_FILECOIN_STORAGE_DEAL",
  });
};
