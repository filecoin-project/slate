import * as MW from "~/node_common/middleware";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as Powergate from "~/node_common/powergate";
import * as LibraryManager from "~/node_common/managers/library";

// import { ffsOptions } from "@textile/powergate-client";

const initCORS = MW.init(MW.CORS);
const initAuth = MW.init(MW.RequireCookieAuthentication);

export default async (req, res) => {
  initCORS(req, res);
  initAuth(req, res);

  if (!req.body.ipfs) {
    return res.status(500).send({ decorator: "SERVER_NO_CID", error: true });
  }

  const cid = req.body.ipfs.replace("/ipfs/", "");
  const id = Utilities.getIdFromCookie(req);
  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return res
      .status(404)
      .json({ decorator: "SERVER_STORAGE_DEAL_USER_NOT_FOUND", error: true });
  }

  if (user.error) {
    return res
      .status(500)
      .json({ decorator: "SERVER_STORAGE_DEAL_USER_NOT_FOUND", error: true });
  }

  const data = LibraryManager.getDataByIPFS(user, req.body.ipfs);
  if (!data) {
    return res.status(500).send({ decorator: "SERVER_NO_IPFS", error: true });
  }

  const PG = Powergate.get(user);
  let jobId;
  try {
    throw new Error("Powergate disabled");
    /*
    const Deal = await PG.ffs.pushStorageConfig(
      cid,
      ffsOptions.withOverride(true)
    );
    jobId = Deal && Deal.jobId ? Deal.jobId : null;
    */
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      decorator: "SERVER_FILECOIN_STORAGE_DEAL_CID_ERROR",
      error: true,
    });
  }

  if (!jobId) {
    return res.status(500).send({ decorator: "SERVER_NO_JOB", error: true });
  }

  // NOTE(jim): Update the file to be network ready.
  const updated = LibraryManager.updateDataFilecoin(data, {
    job: jobId,
    storage: 2,
    retrieval: 0,
  });

  // NOTE(jim): Update your library
  const updatedUserData = LibraryManager.updateDataById({
    user,
    id: updated.id,
    data: updated,
  });

  // NOTE(jim): Save changes
  const response = await Data.updateUserById({
    id: user.id,
    data: updatedUserData,
  });

  return res.status(200).send({
    decorator: "SERVER_FILECOIN_STORAGE_DEAL",
    data,
  });
};
