import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as Serializers from "~/node_common/serializers";
import * as Support from "~/node_common/support";

export default async (req, res) => {
  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res.status(500).send({ decorator: "SERVER_SUPPORT", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return res.status(404).send({ decorator: "SERVER_SUPPORT_USER_NOT_FOUND", error: true });
  }

  if (user.error) {
    return res.status(500).send({ decorator: "SERVER_SUPPORT_USER_NOT_FOUND", error: true });
  }

  if (!req.body.data) {
    return res.status(500).send({
      decorator: "SERVER_SUPPORT_NO_DATA_PROVIDED",
      error: true,
    });
  }

  if (!req.body.data.email) {
    return res.status(500).send({
      decorator: "SERVER_SUPPORT_MUST_PROVIDE_EMAIL",
      error: true,
    });
  }

  if (!req.body.data.message) {
    return res.status(500).send({
      decorator: "SERVER_SUPPORT_MUST_PROVIDE_MESSAGE",
      error: true,
    });
  }

  if (!req.body.data.username) {
    return res.status(500).send({
      decorator: "SERVER_SUPPORT_NO_DATA_PROVIDED",
      error: true,
    });
  }

  let status = await Support.sendSlackMessage(req.body.data);
  if (status) {
    return res.status(200).send({
      decorator: "SERVER_SUPPORT",
      data: true,
    });
  } else {
    return res.status(500).send({
      decorator: "SERVER_SUPPORT",
      error: true,
    });
  }
};
