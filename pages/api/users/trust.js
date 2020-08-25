import * as Environment from "~/node_common/environment";
import * as MW from "~/node_common/middleware";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as Validations from "~/common/validations";

const initCORS = MW.init(MW.CORS);
const initAuth = MW.init(MW.RequireCookieAuthentication);

export default async (req, res) => {
  initCORS(req, res);
  initAuth(req, res);

  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res.status(500).json({ decorator: "SERVER_TRUST", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return res.status(404).json({
      decorator: "SERVER_TRUSTED_RELATIONSHIP_USER_NOT_FOUND",
      error: true,
    });
  }

  if (user.error) {
    return res.status(500).json({
      decorator: "SERVER_TRUSTED_RELATIONSHIP_USER_NOT_FOUND",
      error: true,
    });
  }

  const existingResponse = await Data.getTrustedRelationshipByUserIds({
    ownerUserId: user.id,
    targetUserId: req.body.data.userId,
  });

  if (existingResponse && existingResponse.error) {
    return res.status(500).json({
      decorator: "SERVER_TRUSTED_RELATIONSHIP_CHECK_ERROR",
      error: true,
    });
  }

  // NOTE(jim)
  // Treat trust as an API method you can call again to remove a trusted relationship.
  if (existingResponse) {
    const deleteRelationshipResponse = await Data.deleteTrustedRelationshipById(
      {
        id: existingResponse.id,
      }
    );

    if (!deleteRelationshipResponse) {
      return res.status(404).json({
        decorator: "SERVER_DELETE_TRUSTED_RELATIONSHIP_NOT_FOUND",
        error: true,
      });
    }

    if (deleteRelationshipResponse.error) {
      return res.status(500).json({
        decorator: "SERVER_DELETE_TRUSTED_RELATIONSHIP_ERROR",
        error: true,
      });
    }

    return res.status(200).json({
      decorator: "SERVER_DELETE_TRUSTED_RELATIONSHIP",
      data: deleteRelationshipResponse,
    });
  }

  const trustResponse = await Data.createTrustedRelationship({
    ownerUserId: user.id,
    targetUserId: req.body.data.userId,
  });

  if (!trustResponse) {
    return res.status(404).json({
      decorator: "SERVER_TRUSTED_RELATIONSHIP_NOT_FOUND",
      error: true,
    });
  }

  if (trustResponse.error) {
    return res
      .status(500)
      .json({ decorator: "SERVER_TRUSTED_RELATIONSHIP_ERROR", error: true });
  }

  return res
    .status(200)
    .json({ decorator: "SERVER_TRUSTED_RELATIONSHIP", data: trustResponse });
};
