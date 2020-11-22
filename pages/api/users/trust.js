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
    return res.status(500).send({ decorator: "SERVER_TRUST", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return res.status(404).send({
      decorator: "SERVER_TRUSTED_RELATIONSHIP_USER_NOT_FOUND",
      error: true,
    });
  }

  if (user.error) {
    return res.status(500).send({
      decorator: "SERVER_TRUSTED_RELATIONSHIP_USER_NOT_FOUND",
      error: true,
    });
  }

  if (!req.body.data || !req.body.data.userId) {
    return res.status(500).send({
      decorator: "SERVER_TRUSTED_RELATIONSHIP_MUST_PROVIDE_SOMEONE_TO_TRUST",
      error: true,
    });
  }

  if (user.id === req.body.data.userId) {
    return res.status(500).send({
      decorator: "SERVER_TRUSTED_RELATIONSHIP_CAN_NOT_TRUST_YOURSELF",
      error: true,
    });
  }

  const targetUser = await Data.getUserById({
    id: req.body.data.userId,
  });

  if (!targetUser) {
    return res.status(404).send({
      decorator: "SERVER_TRUSTED_RELATIONSHIP_TARGET_USER_NOT_FOUND",
      error: true,
    });
  }

  if (targetUser.error) {
    return res.status(500).send({
      decorator: "SERVER_TRUSTED_RELATIONSHIP_TARGET_USER_NOT_FOUND",
      error: true,
    });
  }

  let existingResponse = await Data.getTrustedRelationshipByUserIds({
    ownerUserId: user.id,
    targetUserId: targetUser.id,
  });

  if (existingResponse && existingResponse.error) {
    return res.status(500).send({
      decorator: "SERVER_TRUSTED_RELATIONSHIP_CHECK_ERROR",
      error: true,
    });
  }

  let invertedResponse = await Data.getTrustedRelationshipByUserIds({
    targetUserId: user.id,
    ownerUserId: targetUser.id,
  });

  if (invertedResponse) {
    return res.status(500).send({
      decorator: "SERVER_TRUSTED_RELATIONSHIP_INVERTED_CHECK_ERROR",
      error: true,
    });
  }

  // NOTE(jim)
  // Treat trust as an API method you can call again to remove a trusted relationship.
  if (existingResponse) {
    const deleteRelationshipResponse = await Data.deleteTrustedRelationshipById({
      id: existingResponse.id,
    });

    if (!deleteRelationshipResponse) {
      return res.status(404).send({
        decorator: "SERVER_DELETE_TRUSTED_RELATIONSHIP_NOT_FOUND",
        error: true,
      });
    }

    if (deleteRelationshipResponse.error) {
      return res.status(500).send({
        decorator: "SERVER_DELETE_TRUSTED_RELATIONSHIP_ERROR",
        error: true,
      });
    }

    ViewerManager.hydratePartialSubscriptions({ trusted: true, pendingTrusted: true }, id);

    return res.status(200).send({
      decorator: "SERVER_DELETE_TRUSTED_RELATIONSHIP",
      data: deleteRelationshipResponse,
    });
  }

  const trustResponse = await Data.createTrustedRelationship({
    ownerUserId: user.id,
    targetUserId: targetUser.id,
  });

  if (!trustResponse) {
    return res.status(404).send({
      decorator: "SERVER_TRUSTED_RELATIONSHIP_NOT_FOUND",
      error: true,
    });
  }

  if (trustResponse.error) {
    return res.status(500).send({ decorator: "SERVER_TRUSTED_RELATIONSHIP_ERROR", error: true });
  }

  // NOTE(jim):
  // <VIEWER>, <USER> WANTS TO BE YOUR PEER.
  Monitor.requestPeer({
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
    decorator: "SERVER_TRUSTED_RELATIONSHIP",
    data: {
      ...trustResponse,
      owner: Serializers.user(user),
      user: Serializers.user(targetUser),
    },
  });
};
