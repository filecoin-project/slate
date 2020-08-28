import * as Environment from "~/node_common/environment";
import * as MW from "~/node_common/middleware";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as Serializers from "~/node_common/serializers";
import * as Validations from "~/common/validations";

const initCORS = MW.init(MW.CORS);
const initAuth = MW.init(MW.RequireCookieAuthentication);

export default async (req, res) => {
  initCORS(req, res);
  initAuth(req, res);

  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res
      .status(500)
      .json({ decorator: "SERVER_TRUST_UPDATE", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return res.status(404).json({
      decorator: "SERVER_TRUST_UPDATE_USER_NOT_FOUND",
      error: true,
    });
  }

  if (user.error) {
    return res.status(500).json({
      decorator: "SERVER_TRUST_UPDATE_USER_NOT_FOUND",
      error: true,
    });
  }

  if (!req.body.data || !req.body.data.userId) {
    return res.status(500).json({
      decorator: "SERVER_TRUST_UPDATE_MUST_PROVIDE_SOMEONE_TO_TRUST",
      error: true,
    });
  }

  if (user.id === req.body.data.userId) {
    return res.status(500).json({
      decorator: "SERVER_TRUST_UPDATE_CAN_NOT_TRUST_YOURSELF",
      error: true,
    });
  }

  const targetUser = await Data.getUserById({
    id: req.body.data.userId,
  });

  if (!targetUser) {
    return res.status(404).json({
      decorator: "SERVER_TRUST_UPDATE_TARGET_USER_NOT_FOUND",
      error: true,
    });
  }

  if (targetUser.error) {
    return res.status(500).json({
      decorator: "SERVER_TRUST_UPDATE_TARGET_USER_NOT_FOUND",
      error: true,
    });
  }

  const existingResponse = await Data.getTrustedRelationshipByUserIds({
    ownerUserId: targetUser.id,
    targetUserId: user.id,
  });

  if (!existingResponse) {
    return res.status(404).json({
      decorator: "SERVER_TRUST_UPDATE_CHECK_ERROR",
      error: true,
    });
  }

  if (existingResponse.error) {
    return res.status(500).json({
      decorator: "SERVER_TRUST_UPDATE_CHECK_ERROR",
      error: true,
    });
  }

  const updateResponse = await Data.updateTrustedRelationshipById({
    id: existingResponse.id,
    data: { ...existingResponse.data, verified: true },
  });

  return res.status(200).json({
    decorator: "SERVER_TRUST_UPDATE",
    data: {
      type: "TRUSTED_RELATIONSHIP",
      ...updateResponse,
      owner: Serializers.user(targetUser),
      user: Serializers.user(user),
    },
  });
};
