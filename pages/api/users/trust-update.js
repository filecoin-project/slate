import * as Environment from "~/node_common/environment";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as Serializers from "~/node_common/serializers";
import * as Validations from "~/common/validations";
import * as ViewerManager from "~/node_common/managers/viewer";
import * as Monitor from "~/node_common/monitor";

export default async (req, res) => {
  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res.status(500).send({ decorator: "SERVER_TRUST_UPDATE", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return res.status(404).send({
      decorator: "SERVER_TRUST_UPDATE_USER_NOT_FOUND",
      error: true,
    });
  }

  if (user.error) {
    return res.status(500).send({
      decorator: "SERVER_TRUST_UPDATE_USER_NOT_FOUND",
      error: true,
    });
  }

  if (!req.body.data || !req.body.data.userId) {
    return res.status(500).send({
      decorator: "SERVER_TRUST_UPDATE_MUST_PROVIDE_SOMEONE_TO_TRUST",
      error: true,
    });
  }

  if (user.id === req.body.data.userId) {
    return res.status(500).send({
      decorator: "SERVER_TRUST_UPDATE_CAN_NOT_TRUST_YOURSELF",
      error: true,
    });
  }

  const targetUser = await Data.getUserById({
    id: req.body.data.userId,
  });

  if (!targetUser) {
    return res.status(404).send({
      decorator: "SERVER_TRUST_UPDATE_TARGET_USER_NOT_FOUND",
      error: true,
    });
  }

  if (targetUser.error) {
    return res.status(500).send({
      decorator: "SERVER_TRUST_UPDATE_TARGET_USER_NOT_FOUND",
      error: true,
    });
  }

  const existingResponse = await Data.getTrustedRelationshipByUserIds({
    ownerUserId: targetUser.id,
    targetUserId: user.id,
  });

  if (!existingResponse) {
    return res.status(404).send({
      decorator: "SERVER_TRUST_UPDATE_CHECK_ERROR",
      error: true,
    });
  }

  if (existingResponse.error) {
    return res.status(500).send({
      decorator: "SERVER_TRUST_UPDATE_CHECK_ERROR",
      error: true,
    });
  }

  const updateResponse = await Data.updateTrustedRelationshipById({
    id: existingResponse.id,
    data: { ...existingResponse.data, verified: true },
  });

  // NOTE(jim):
  // <VIEWER>, <USER> ACCEPTED YOUR REQUEST.
  Monitor.verifyPeer({
    userId: targetUser.id,
    data: {
      actorUserId: user.id,
      context: {
        username: user.username,
        targetUsername: targetUser.username,
        targetUserId: targetUser.id,
      },
    },
  });

  ViewerManager.hydratePartialSubscriptions({ trusted: true, pendingTrusted: true }, id);

  return res.status(200).send({
    decorator: "SERVER_TRUST_UPDATE",
    data: {
      type: "TRUSTED_RELATIONSHIP",
      ...updateResponse,
      owner: Serializers.user(targetUser),
      user: Serializers.user(user),
    },
  });
};
