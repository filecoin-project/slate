import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";
import * as Strings from "~/common/strings";
import * as ViewerManager from "~/node_common/managers/viewer";
import * as SearchManager from "~/node_common/managers/search";

export default async (req, res) => {
  const id = Utilities.getIdFromCookie(req);
  let layoutOnly = req.body.data.layoutOnly && req.body.data.data.layouts;

  let user;

  if (!layoutOnly) {
    if (!id) {
      return res.status(500).send({ decorator: "SERVER_FIND_USER_UPDATE_SLATE", error: true });
    }

    user = await Data.getUserById({
      id,
    });

    if (!user) {
      return res.status(404).send({
        decorator: "SERVER_FIND_USER_UPDATE_SLATE_USER_NOT_FOUND",
        error: true,
      });
    }

    if (user.error) {
      return res.status(500).send({
        decorator: "SERVER_FIND_USER_UPDATE_SLATE_USER_NOT_FOUND",
        error: true,
      });
    }
  }

  const response = await Data.getSlateById({ id: req.body.data.id });

  if (!response) {
    return res.status(404).send({ decorator: "SERVER_UPDATE_SLATE_NOT_FOUND", error: true });
  }

  if (response.error) {
    return res.status(500).send({ decorator: "SERVER_UPDATE_SLATE_NOT_FOUND", error: true });
  }

  if (!req.body.data) {
    return res.status(500).send({
      decorator: "SERVER_UPDATE_SLATE_MUST_PROVIDE_DATA",
      error: true,
    });
  }

  if (!layoutOnly && req.body.data.data.name) {
    const existingSlate = await Data.getSlateByName({
      slatename: req.body.data.data.name,
      ownerId: user.id,
    });
    if (existingSlate && existingSlate.id !== req.body.data.id) {
      return res.status(500).send({
        decorator: "SERVER_UPDATE_SLATE_NAME_TAKEN",
        error: true,
      });
    }
  }

  let isOwner = id && response.data.ownerId === id;

  let slate;
  if (!isOwner && req.body.data.data.layouts) {
    slate = await Data.updateSlateById({
      id: response.id,
      slatename: response.slatename,
      updated_at: response.updated_at,
      data: {
        ...response.data,
        layouts: req.body.data.data.layouts,
      },
    });
  } else if (isOwner) {
    slate = await Data.updateSlateById({
      id: response.id,
      slatename: req.body.data.data.name
        ? Strings.createSlug(req.body.data.data.name)
        : response.slatename,
      updated_at: layoutOnly || req.body.data.autoSave ? response.updated_at : new Date(),
      data: {
        ...response.data,
        ...req.body.data.data,
      },
    });
  }

  if (!slate) {
    return res.status(404).send({ decorator: "SERVER_UPDATE_SLATE", error: true });
  }

  if (slate.error) {
    return res.status(500).send({ decorator: "SERVER_UPDATE_SLATE", error: true });
  }

  if (!layoutOnly && isOwner) {
    let slates = await Data.getSlatesByUserId({ userId: id });
    if (slates) {
      ViewerManager.hydratePartialSlates(slates, id);
    }
  }

  if (!layoutOnly && !req.body.data.autoSave) {
    if (response.data.public !== slate.data.public) {
      if (slate.data.public) {
        SearchManager.updateSlate(slate, "ADD");
      } else {
        SearchManager.updateSlate(slate, "REMOVE");
      }
    } else if (slate.data.public) {
      SearchManager.updateSlate(slate, "EDIT");
    }
  }

  return res.status(200).send({ decorator: "SERVER_UPDATE_SLATE", slate });
};
