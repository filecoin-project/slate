import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";
import * as Strings from "~/common/strings";
import * as ViewerManager from "~/node_common/managers/viewer";
import * as SearchManager from "~/node_common/managers/search";

export default async (req, res) => {
  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res.status(500).send({ decorator: "SERVER_DELETE_SLATE", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return res.status(404).send({
      decorator: "SERVER_DELETE_SLATE_USER_NOT_FOUND",
      error: true,
    });
  }

  if (user.error) {
    return res.status(500).send({
      decorator: "SERVER_DELETE_SLATE_USER_NOT_FOUND",
      error: true,
    });
  }
  const slate = await Data.getSlateById({ id: req.body.data.id });

  if (!slate) {
    return res.status(404).send({ decorator: "SERVER_DELETE_SLATE_SLATE_NOT_FOUND", error: true });
  }

  if (slate.error) {
    return res.status(500).send({ decorator: "SERVER_DELETE_SLATE_SLATE_NOT_FOUND", error: true });
  }

  const deleteResponse = await Data.deleteSlateById({ id: slate.id });

  if (!deleteResponse) {
    return res.status(404).send({ decorator: "SERVER_DELETE_SLATE", error: true });
  }

  if (deleteResponse.error) {
    return res.status(500).send({ decorator: "SERVER_DELETE_SLATE", error: true });
  }

  let slates = await Data.getSlatesByUserId({ userId: id });
  if (slates) {
    ViewerManager.hydratePartialSlates(slates, id);
  }

  if (slate.data.public) {
    SearchManager.updateSlate(slate, "REMOVE");
  }

  return res.status(200).send({ decorator: "SERVER_DELETE_SLATE", error: false });
};
