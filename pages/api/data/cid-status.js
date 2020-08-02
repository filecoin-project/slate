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
    return res.status(500).send({ decorator: "SERVER_NO_CIDS_TO_CHECK", error: true });
  }

  if (!req.body.data.length) {
    return res.status(500).send({ decorator: "SERVER_NO_CIDS_TO_CHECK", error: true });
  }

  const id = Utilities.getIdFromCookie(req);
  const user = await Data.getUserById({
    id,
  });

  const PG = Powergate.get(user);

  const success = [];
  const failed = [];
  const reset = [];

  for (let i = 0; i < req.body.data.length; i++) {
    const x = req.body.data[i];

    if (!x.job) {
      failed.push(x);
      continue;
    }

    if (!x.ipfs) {
      failed.push(x);
      continue;
    }

    let job;
    try {
      job = await check(PG, x.job);
    } catch (e) {
      console.log(e);
    }

    if (job.status === 3) {
      console.log({ message: "ERROR", job });
      x.error = job.errCause;
      failed.push(x);
      continue;
    }

    if (job.status === 5) {
      console.log({ message: "SUCCESS", job });
      x.error = null;
      success.push(x);
      continue;
    }

    if (x.error) {
      x.error = null;
      reset.push(x);
    }

    console.log({ message: "NOOP", job });
  }

  let targetUser = { ...user };

  if (failed.length) {
    for (let i = 0; i < failed.length; i++) {
      let data = LibraryManager.getDataByIPFS(targetUser, failed[i].ipfs);
      if (!data) {
        continue;
      }

      data.networks = data.networks.filter((each) => each !== "FILECOIN");
      data.job = null;
      data.storage = 0;
      data.error = failed[i].error;

      targetUser.data = LibraryManager.updateDataById({
        user: targetUser,
        id: data.id,
        data,
      });
    }
  }

  if (success.length) {
    for (let i = 0; i < success.length; i++) {
      let data = LibraryManager.getDataByIPFS(targetUser, success[i].ipfs);
      if (!data) {
        continue;
      }

      data.storage = 1;
      data.error = null;

      targetUser.data = LibraryManager.updateDataById({
        user: targetUser,
        id: data.id,
        data,
      });
    }
  }

  if (reset.length) {
    for (let i = 0; i < reset.length; i++) {
      let data = LibraryManager.getDataByIPFS(targetUser, reset[i].ipfs);
      if (!data) {
        continue;
      }

      data.error = null;

      targetUser.data = LibraryManager.updateDataById({
        user: targetUser,
        id: data.id,
        data,
      });
    }
  }

  let response;
  if (success.length || failed.length || reset.length) {
    response = await Data.updateUserById({
      id: targetUser.id,
      data: targetUser.data,
    });
  }

  return res.status(200).send({
    decorator: "SERVER_CID_CHECK",
    update: success.length || failed.length || reset.length,
    updateResponse: response,
  });
};
