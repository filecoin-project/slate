import * as MW from "~/node_common/middleware";
import * as Constants from "~/node_common/constants";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as Strings from "~/node_common/utilities";
import * as Powergate from "~/node_common/powergate";
import * as LibraryManager from "~/node_common/managers/library";

const initCORS = MW.init(MW.CORS);
const initAuth = MW.init(MW.RequireCookieAuthentication);

const check = async (PG, jobId) =>
  new Promise((resolve) => {
    const jobsCancel = PG.ffs.watchJobs((j) => {
      resolve(j);
    }, jobId);
  });

export default async (req, res) => {
  initCORS(req, res);
  initAuth(req, res);

  if (!req.body.data) {
    return res
      .status(500)
      .send({ decorator: "SERVER_NO_CIDS_TO_CHECK", error: true });
  }

  const id = Utilities.getIdFromCookie(req);
  const user = await Data.getUserById({
    id,
  });
  const PG = Powergate.get(user);

  const changed = [];
  const failed = [];
  // TODO(jim): clean this up.
  try {
    for (let i = 0; i < req.body.data.length; i++) {
      const x = req.body.data[i];

      if (!x.job) {
        failed.push(x);
        continue;
      }

      // TODO(jim): A hack, I just want the first job object from a stream.
      const job = await check(PG, x.job);

      // TODO(jim): This isn't correct.
      // There is a bug where everything is going to hot storage.
      // Which is fine... But its not real Filecoin storage then.
      if (job.status > 1) {
        console.log("CID SUCCESS (3): ", job.cid);
        changed.push(x);
        continue;
      }

      // NOTE(jim): Still waiting for things to happen.
      if (job.status === 1) {
        console.log("CID WAITING (1): ", job.cid);
        continue;
      }
    }
  } catch (e) {
    console.log(e);
  }

  // NOTE(jim): For failed uploads. Bail!
  if (failed.length) {
    for (let i = 0; i < failed.length; i++) {
      let data = LibraryManager.getDataByIPFS(user, failed[i].ipfs);
      data.networks = data.networks.filter((each) => each !== "FILECOIN");
      data.job = null;
      data.storage = 0;
      user.data = LibraryManager.updateDataById({ user, id: data.id, data });
    }
  }

  // NOTE(jim): Otherwise say its on the network...
  if (changed.length) {
    for (let i = 0; i < changed.length; i++) {
      let data = LibraryManager.getDataByIPFS(user, changed[i].ipfs);
      data.storage = 1;
      user.data = LibraryManager.updateDataById({ user, id: data.id, data });
    }
  }

  // NOTE(jim):
  // In any of our status checks, if the user needs to be updated.
  // Update the user.
  if (changed.length || failed.length) {
    const response = await Data.updateUserById({
      id: user.id,
      data: user.data,
    });
  }

  return res.status(200).send({
    decorator: "SERVER_CID_CHECK",
    update: changed.length || failed.length,
  });
};
