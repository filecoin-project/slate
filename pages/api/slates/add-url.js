import * as MW from "~/node_common/middleware";
import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";

const initCORS = MW.init(MW.CORS);
const initAuth = MW.init(MW.RequireCookieAuthentication);

export default async (req, res) => {
  initCORS(req, res);
  initAuth(req, res);

  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res.status(403).json({ decorator: "SERVER_ADD_TO_SLATE_USER_NOT_FOUND", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return res.status(404).json({
      decorator: "SERVER_ADD_TO_SLATE_USER_NOT_FOUND",
      error: true,
    });
  }

  if (user.error) {
    return res.status(500).json({
      decorator: "SERVER_ADD_TO_SLATE_USER_NOT_FOUND",
      error: true,
    });
  }

  const slate = await Data.getSlateById({ id: req.body.slate.id });

  if (!slate) {
    return res.status(404).json({
      decorator: "SERVER_ADD_TO_SLATE_SLATE_NOT_FOUND",
      error: true,
    });
  }

  if (slate.error) {
    return res.status(500).json({
      decorator: "SERVER_ADD_TO_SLATE_SLATE_NOT_FOUND",
      error: true,
    });
  }

  const objects = [
    ...slate.data.objects,
    {
      id: req.body.data.id,
      ownerId: user.id,
      name: req.body.data.name,
      title: req.body.data.title,
      type: req.body.data.type,
      url: `https://hub.textile.io${req.body.data.ipfs}`,
    },
  ];

  let layouts = slate.data.layouts;
  if (layouts) {
    const keys = Object.keys(slate.data.layouts);
    for (let i = 0; i < keys.length; i++) {
      layouts[keys[i]].push({
        x: (objects.length * 2) % 10,
        y: 0,
        w: 2,
        h: 2,
        minW: 2,
        minH: 2,
        i: `${objects.length}`.toString(),
      });
    }
  }

  const update = await Data.updateSlateById({
    id: slate.id,
    updated_at: new Date(),
    data: {
      ...slate.data,
      layouts,
      objects,
    },
  });

  if (!update) {
    return res.status(500).json({
      decorator: "SERVER_ADD_TO_SLATE_ERROR",
      error: true,
    });
  }

  if (update.error) {
    return res.status(500).json({
      decorator: "SERVER_ADD_TO_SLATE_ERROR",
      error: true,
    });
  }

  return res.status(200).json({ decorator: "SERVER_SLATE_ADD_TO_SLATE", slate });
};
