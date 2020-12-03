import * as Constants from "~/node_common/constants";
import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";
import * as Strings from "~/common/strings";
import * as ViewerManager from "~/node_common/managers/viewer";
import * as SearchManager from "~/node_common/managers/search";
import * as Monitor from "~/node_common/monitor";

export default async (req, res) => {
  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res.status(403).send({ decorator: "SERVER_ADD_TO_SLATE_USER_NOT_FOUND", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return res.status(404).send({
      decorator: "SERVER_ADD_TO_SLATE_USER_NOT_FOUND",
      error: true,
    });
  }

  if (user.error) {
    return res.status(500).send({
      decorator: "SERVER_ADD_TO_SLATE_USER_NOT_FOUND",
      error: true,
    });
  }

  const slate = await Data.getSlateById({ id: req.body.data.slate.id });

  if (!slate) {
    return res.status(404).send({
      decorator: "SERVER_ADD_TO_SLATE_SLATE_NOT_FOUND",
      error: true,
    });
  }

  if (slate.error) {
    return res.status(500).send({
      decorator: "SERVER_ADD_TO_SLATE_SLATE_NOT_FOUND",
      error: true,
    });
  }

  let newObjects = [];
  if (Array.isArray(req.body.data.data)) {
    newObjects = [...req.body.data.data];
  } else {
    newObjects = [req.body.data.data];
  }
  let slateURLs = slate.data.objects.map((file) => file.url);
  let addlObjects;
  if (req.body.data.fromSlate) {
    let newURLs = [];
    addlObjects = newObjects.filter((each) => {
      if (slateURLs.includes(each.url) || newURLs.includes(each.url)) {
        return false;
      }
      newURLs.push(each.url);
      return true;
    });
  } else {
    let newCIDs = [];
    addlObjects = newObjects.filter((each) => {
      if (slateURLs.includes(Strings.getCIDGatewayURL(each.cid)) || newCIDs.includes(each.cid)) {
        return false;
      }
      newCIDs.push(each.cid);
      return true;
    });
  }

  addlObjects = addlObjects.map((each) => {
    let url = each.url || Strings.getCIDGatewayURL(each.cid);
    let cid = each.cid || Strings.urlToCid(each.url);

    // NOTE(jim): Share events if public.
    if (slate.data.public) {
      Monitor.createSlateObject({
        slateId: slate.id,
        data: {
          actorUserId: user.id,
          context: {
            slate: {
              id: slate.id,
              slatename: slate.slatename,
              name: slate.data.name,
            },
            user: {
              id: user.id,
              username: user.username,
              photo: user.data.photo,
            },
            file: {
              blurhash: each.blurhash,
              id: each.id,
              url,
              cid,
              type: each.type,
              name: each.name,
              title: each.title,
            },
          },
        },
      });
    }

    return {
      blurhash: each.blurhash,
      coverImage: each.coverImage,
      cid: cid,
      size: each.size,
      id: each.id,
      ownerId: req.body.data.fromSlate ? each.ownerId : user.id,
      name: each.name,
      title: each.title,
      type: each.type,
      url,
    };
  });

  const objects = [...slate.data.objects, ...addlObjects];

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
      decorator: "SERVER_ADD_TO_SLATE_ERROR",
      error: true,
    });
  }

  if (update.error) {
    return res.status(500).send({
      decorator: "SERVER_ADD_TO_SLATE_ERROR",
      error: true,
    });
  }

  const slates = await Data.getSlatesByUserId({ userId: id });
  if (slates) {
    ViewerManager.hydratePartialSlates(slates, id);
  }

  if (update.data.public) {
    SearchManager.updateSlate(update, "EDIT");
  }

  return res.status(200).send({
    decorator: "SERVER_SLATE_ADD_TO_SLATE",
    added: addlObjects.length,
    skipped: newObjects.length - addlObjects.length,
    slate,
  });
};
