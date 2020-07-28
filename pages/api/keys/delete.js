import * as Environment from "~/node_common/environment";
import * as MW from "~/node_common/middleware";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";

const initCORS = MW.init(MW.CORS);
const initAuth = MW.init(MW.RequireCookieAuthentication);

export default async (req, res) => {
  initCORS(req, res);
  initAuth(req, res);

  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res
      .status(500)
      .json({ decorator: "SERVER_DELETE_API_KEY_AUTH", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return res.status(404).json({
      decorator: "SERVER_DELETE_API_KEY_USER_NOT_FOUND",
      error: true,
    });
  }

  if (user.error) {
    return res.status(500).json({
      decorator: "SERVER_DELETE_API_KEY_USER_NOT_FOUND",
      error: true,
    });
  }

  const key = await Data.getAPIKey({ id: req.body.data.id });

  if (key.owner_id !== user.id) {
    return res.status(403).json({
      decorator: "SERVER_DELETE_API_KEY_NOT_FOUND",
      error: true,
    });
  }

  if (!key) {
    return res.status(404).json({
      decorator: "SERVER_DELETE_API_KEY_NOT_FOUND",
      error: true,
    });
  }

  if (key.error) {
    return res.status(500).json({
      decorator: "SERVER_DELETE_API_KEY_NOT_FOUND",
      error: true,
    });
  }

  const response = await Data.deleteAPIKeyById({ id: key.id });

  if (!response) {
    return res.status(404).json({
      decorator: "SERVER_DELETE_API_KEY_ERROR",
      error: true,
    });
  }

  if (response.error) {
    return res.status(500).json({
      decorator: "SERVER_DELETE_API_KEY_ERROR",
      error: true,
    });
  }

  return res.status(200).json({ decorator: "SERVER_DELETE_API_KEY" });
};
