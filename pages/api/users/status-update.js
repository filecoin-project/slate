import * as Environment from "~/node_common/environment";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as Serializers from "~/node_common/serializers";
import * as Validations from "~/common/validations";
import * as ViewerManager from "~/node_common/managers/viewer";

export default async (req, res) => {
  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res.status(500).send({ decorator: "SERVER_STATUS_UPDATE", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return res.status(404).send({
      decorator: "SERVER_STATUS_UPDATE_USER_NOT_FOUND",
      error: true,
    });
  }

  if (user.error) {
    return res.status(500).send({
      decorator: "SERVER_STATUS_UPDATE_USER_NOT_FOUND",
      error: true,
    });
  }

  let updateResponse;
  if (req.body.data && req.body.data.onboarding && req.body.data.onboarding.length) {
    let onboarding = user.data.onboarding;
    if (!onboarding) {
      onboarding = {};
    }
    for (let item of req.body.data.onboarding) {
      onboarding[item] = true;
    }

    updateResponse = await Data.updateUserById({
      id: user.id,
      data: { ...user.data, onboarding },
    });

    if (!updateResponse || updateResponse.error) {
      return res.status(404).send({
        decorator: "SERVER_STATUS_UPDATE_USER_NOT_FOUND",
        error: true,
      });
    }
  } else if (req.body.data && req.body.data.status) {
    let status = user.data.status;
    if (!status) {
      status = {};
    }
    for (let [key, value] of Object.entries(req.body.data.status)) {
      status[key] = value;
    }

    updateResponse = await Data.updateUserById({
      id: user.id,
      data: { ...user.data, status },
    });

    if (!updateResponse || updateResponse.error) {
      return res.status(404).send({
        decorator: "SERVER_STATUS_UPDATE_USER_NOT_FOUND",
        error: true,
      });
    }

    ViewerManager.hydratePartialStatus(status, user.id);
  } else {
    return res.status(500).send({
      decorator: "SERVER_STATUS_UPDATE_MUST_PROVIDE_UPDATE",
      error: true,
    });
  }

  return res.status(200).send({
    decorator: "SERVER_STATUS_UPDATE",
    data: updateResponse,
  });
};
