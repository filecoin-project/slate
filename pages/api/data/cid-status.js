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

  const success = [];
  const failed = [];
  try {
    for (let i = 0; i < req.body.data.length; i++) {
      const x = req.body.data[i];

      if (!x.job) {
        console.log("-- NO JOB (3)");
        failed.push(x);
        continue;
      }

      if (!x.ipfs) {
        console.log("-- NO IPFS (3)");
        failed.push(x);
      }

      // TODO(jim): A hack, I just want the first job object from a stream.
      const job = await check(PG, x.job);
      console.log({ job });

      // TODO(jim): This isn't correct.
      // There is a bug where everything is going to hot storage.
      // Which is fine... But its not real Filecoin storage then.
      if (job.status === 3) {
        console.log("CID ERROR (3): ", job.cid);
        x.error = job.errCause;
        failed.push(x);
        continue;
      }

      if (job.status === 5) {
        console.log("CID SUCCESS (5): ", job.cid);
        success.push(x);
        continue;
      }

      console.log("CID: ", job.cid);
    }
  } catch (e) {
    console.log(e);
  }

  let userDataFields = { ...user.data };
  if (failed.length) {
    for (let i = 0; i < failed.length; i++) {
      let data = LibraryManager.getDataByIPFS(
        { ...user, data: userDataFields },
        failed[i].ipfs
      );

      data.networks = data.networks.filter((each) => each !== "FILECOIN");
      data.job = null;
      data.storage = 0;
      data.error = failed[i].error;

      userDataFields = LibraryManager.updateDataById({
        user: { ...user, data: userDataFields },
        id: data.id,
        data,
      });
    }
  }

  if (success.length) {
    for (let i = 0; i < success.length; i++) {
      let data = LibraryManager.getDataByIPFS(
        { ...user, data: userDataFields },
        success[i].ipfs
      );

      data.storage = 1;
      data.error = null;

      userDataFields = LibraryManager.updateDataById({
        user: { ...user, data: userDataFields },
        id: data.id,
        data,
      });
    }
  }

  let response;
  if (success.length || failed.length) {
    console.log("update");
    response = await Data.updateUserById({
      id: user.id,
      data: userDataFields,
    });
    console.log(response);
  }

  return res.status(200).send({
    decorator: "SERVER_CID_CHECK",
    update: success.length || failed.length,
    updateResponse: response,
  });
};
