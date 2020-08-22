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
      .json({ decorator: "SERVER_FIND_USER_CREATE_SLATE", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return res.status(404).json({
      decorator: "SERVER_FIND_USER_CREATE_SLATE_USER_NOT_FOUND",
      error: true,
    });
  }

  if (user.error) {
    return res.status(500).json({
      decorator: "SERVER_FIND_USER_CREATE_SLATE_USER_NOT_FOUND",
      error: true,
    });
  }

  const slatename = Strings.createSlug(req.body.data.name);

  const found = await Data.getSlateByName({ slatename });

  if (found) {
    return res
      .status(500)
      .json({ decorator: "SERVER_EXISTING_SLATE", error: true });
  }

  const slate = await Data.createSlate({
    slatename,
    data: {
      public: true,
      ownerId: id,
      name: req.body.data.name,
      body: "A slate.",
      objects: [],
    },
  });

  if (!slate) {
    return res
      .status(500)
      .json({ decorator: "SERVER_CREATE_SLATE", error: true });
  }

  if (slate.error) {
    return res
      .status(500)
      .json({ decorator: "SERVER_CREATE_SLATE", error: true });
  }

  return res.status(200).json({ decorator: "SERVER_CREATE_SLATE", slate });
};
