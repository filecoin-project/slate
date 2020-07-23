import * as MW from "~/node_common/middleware";
import * as Constants from "~/node_common/constants";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as Strings from "~/node_common/utilities";
import * as Powergate from "~/node_common/powergate";

const initCORS = MW.init(MW.CORS);
const initAuth = MW.init(MW.RequireCookieAuthentication);

export default async (req, res) => {
  initCORS(req, res);
  initAuth(req, res);

  if (!req.body.ipfs) {
    res.status(500).send({ decorator: "SERVER_NO_CID", error: true });
  }

  const cid = req.body.ipfs.replace("/ipfs/", "");

  const id = Utilities.getIdFromCookie(req);
  const user = await Data.getUserById({
    id,
  });

  const PG = Powergate.get(user);

  let jobId;
  try {
    const Deal = await PG.ffs.pushStorageConfig(cid);
    jobId = Deal && Deal.jobId ? Deal.jobId : null;
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send({ decorator: "SERVER_CONFIRM_STORAGE_DEAL", error: true });
  }

  return res.status(200).send({
    decorator: "SERVER_FILECOIN_STORAGE_DEAL",
    cid,
    jobId,
  });
};
