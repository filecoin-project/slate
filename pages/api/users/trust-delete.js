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
    return res
      .status(500)
      .json({ decorator: "SERVER_TRUST_DELETE", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return res.status(404).json({
      decorator: "SERVER_TRUST_DELETE_USER_NOT_FOUND",
      error: true,
    });
  }

  if (user.error) {
    return res.status(500).json({
      decorator: "SERVER_TRUST_DELETE_USER_NOT_FOUND",
      error: true,
    });
  }

  if (!req.body.data) {
    return res.status(500).json({
      decorator: "SERVER_TRUST_DELETE_MUST_PROVIDE_ID",
      error: true,
    });
  }

  const response = await Data.deleteTrustedRelationshipById({
    id: req.body.data.id,
  });

  return res
    .status(200)
    .json({ decorator: "SERVER_TRUST_UPDATE", data: response });
};
