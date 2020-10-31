import * as Environment from "~/node_common/environment";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as Validations from "~/common/validations";
import * as ViewerManager from "~/node_common/managers/viewer";

export default async (req, res) => {
  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res.status(500).send({ decorator: "SERVER_TRUST_DELETE", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return res.status(404).send({
      decorator: "SERVER_TRUST_DELETE_USER_NOT_FOUND",
      error: true,
    });
  }

  if (user.error) {
    return res.status(500).send({
      decorator: "SERVER_TRUST_DELETE_USER_NOT_FOUND",
      error: true,
    });
  }

  if (!req.body.data) {
    return res.status(500).send({
      decorator: "SERVER_TRUST_DELETE_MUST_PROVIDE_ID",
      error: true,
    });
  }

  const response = await Data.deleteTrustedRelationshipById({
    id: req.body.data.id,
  });

  ViewerManager.hydratePartialSubscriptions({ trusted: true, pendingTrusted: true }, id);

  return res.status(200).send({ decorator: "SERVER_TRUST_UPDATE", data: response });
};
