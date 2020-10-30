import * as Constants from "~/node_common/constants";
import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";
import * as Strings from "~/common/strings";
import * as ViewerManager from "~/node_common/managers/viewer";

export default async (req, res) => {
  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res
      .status(403)
      .send({ decorator: "SERVER_REMOVE_FROM_SLATE_USER_NOT_FOUND", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return res.status(404).send({
      decorator: "SERVER_REMOVE_FROM_SLATE_USER_NOT_FOUND",
      error: true,
    });
  }

  if (user.error) {
    return res.status(500).send({
      decorator: "SERVER_REMOVE_FROM_SLATE_USER_NOT_FOUND",
      error: true,
    });
  }

  if (!req.body.data.ids || !req.body.data.ids.length) {
    return res.status(500).send({
      decorator: "SERVER_REMOVE_FROM_SLATE_NO_ID_PROVIDED",
      error: true,
    });
  }

  const slate = await Data.getSlateById({ id: req.body.data.slateId });

  if (!slate) {
    return res.status(404).send({
      decorator: "SERVER_REMOVE_FROM_SLATE_SLATE_NOT_FOUND",
      error: true,
    });
  }

  if (slate.error) {
    return res.status(500).send({
      decorator: "SERVER_REMOVE_FROM_SLATE_SLATE_NOT_FOUND",
      error: true,
    });
  }

  const objects = slate.data.objects.filter((each) => {
    return !req.body.data.ids.includes(each.id);
  });

  const update = await Data.updateSlateById({
    id: slate.id,
    updated_at: new Date(),
    data: {
      ...slate.data,
      objects,
    },
  });

  if (!update) {
    return res.status(500).send({
      decorator: "SERVER_REMOVE_FROM_SLATE_ERROR",
      error: true,
    });
  }

  if (update.error) {
    return res.status(500).send({
      decorator: "SERVER_REMOVE_FROM_SLATE_ERROR",
      error: true,
    });
  }

  let slates = await Data.getSlatesByUserId({ userId: id });
  if (slates) {
    ViewerManager.hydratePartialSlates(slates, id);
  }

  return res.status(200).send({
    decorator: "SERVER_SLATE_REMOVE_FROM_SLATE",
    slate,
  });
};
