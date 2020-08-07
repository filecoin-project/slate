import * as MW from "~/node_common/middleware";
import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";
import * as Strings from "~/common/strings";

const initCORS = MW.init(MW.CORS);
const initAuth = MW.init(MW.RequireCookieAuthentication);

export default async (req, res) => {
  initCORS(req, res);
  initAuth(req, res);

  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res
      .status(500)
      .json({ decorator: "SERVER_FIND_USER_UPDATE_SLATE", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return res.status(404).json({
      decorator: "SERVER_FIND_USER_UPDATE_SLATE_USER_NOT_FOUND",
      error: true,
    });
  }

  if (user.error) {
    return res.status(500).json({
      decorator: "SERVER_FIND_USER_UPDATE_SLATE_USER_NOT_FOUND",
      error: true,
    });
  }

  const response = await Data.getSlateById({ id: req.body.data.id });

  if (!response) {
    return res
      .status(404)
      .json({ decorator: "SERVER_UPDATE_SLATE_NOT_FOUND", error: true });
  }

  if (response.error) {
    return res
      .status(500)
      .json({ decorator: "SERVER_UPDATE_SLATE_NOT_FOUND", error: true });
  }

  const slate = await Data.updateSlateById({
    id: response.id,
    slatename: Strings.createSlug(req.body.data.slatename),
    updated_at: new Date(),
    data: {
      ...response.data,
      objects: req.body.data.data.objects,
      public: req.body.data.data.public,
    },
  });

  if (!slate) {
    return res
      .status(404)
      .json({ decorator: "SERVER_UPDATE_SLATE", error: true });
  }

  if (slate.error) {
    return res
      .status(500)
      .json({ decorator: "SERVER_UPDATE_SLATE", error: true });
  }

  return res.status(200).json({ decorator: "SERVER_UPDATE_SLATE", slate });
};
