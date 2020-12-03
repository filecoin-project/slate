import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";
import * as Strings from "~/common/strings";

export default async (req, res) => {
  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res.status(500).send({ decorator: "SERVER_GET_ACTIVITY", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return res.status(404).send({
      decorator: "SERVER_GET_ACTIVITY_USER_NOT_FOUND",
      error: true,
    });
  }

  if (user.error) {
    return res.status(500).send({
      decorator: "SERVER_GET_ACTIVITY_USER_NOT_FOUND",
      error: true,
    });
  }

  let response = await Data.getActivityForUserId({ userId: user.id });

  if (!response) {
    return res.status(404).send({ decorator: "SERVER_GET_ACTIVITY_NOT_FOUND", error: true });
  }

  if (response.error) {
    return res.status(500).send({ decorator: "SERVER_GET_ACTIVITY_NOT_FOUND", error: true });
  }

  return res.status(200).send({ decorator: "SERVER_GET_SLATE", activity: response });
};
