import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as Strings from "~/common/strings";
import * as Social from "~/node_common/social";
import * as ViewerManager from "~/node_common/managers/viewer";
import * as SearchManager from "~/node_common/managers/search";
import { CompressedPixelFormat } from "three";

const DEFAULT_BUCKET_NAME = "data";

export default async (req, res) => {
  if (!req.body.data || !req.body.data.cids || !req.body.data.cids.length) {
    return res.status(500).send({ decorator: "SERVER_REMOVE_DATA_NO_CID", error: true });
  }

  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res.status(403).send({ decorator: "SERVER_REMOVE_DATA_NOT_ALLOWED", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  const { buckets, bucketKey } = await Utilities.getBucketAPIFromUserToken({
    user,
  });

  if (!buckets) {
    return res.status(500).send({
      decorator: "SERVER_BUCKET_INIT_FAILURE",
      error: true,
    });
  }

  // TODO(jim): Put this call into a file for all Textile related calls.
  let r = null;
  try {
    r = await buckets.list();
  } catch (e) {
    Social.sendTextileSlackMessage({
      file: "/pages/api/data/remove-multiple.js",
      user,
      message: e.message,
      code: e.code,
      functionName: `buckets.list`,
    });
  }

  if (!r) {
    return res.status(500).send({ decorator: "SERVER_REMOVE_MULTIPLE_NO_TEXTILE", error: true });
  }

  // TODO(jim): Put this call into a file for all Textile related calls.
  let items = [];
  try {
    for (let i = 0; i < r.length; i++) {
      if (r[i].name === DEFAULT_BUCKET_NAME) {
        const next = await buckets.listPath(r[i].key, "/");
        const set = next.item.items;
        items = [...set, ...items];
      }
    }
  } catch (e) {
    Social.sendTextileSlackMessage({
      file: "/pages/api/data/remove-multiple.js",
      user,
      message: e.message,
      code: e.code,
      functionName: `buckets.listIpfsPath`,
    });
  }

  if (!items || !items.length) {
    return res.status(500).send({ decorator: "SERVER_NO_ITEMS_FOUND", error: true });
  }

  //NOTE(martina): get the cids of the corresponding coverImages that are to be deleted (if they do not exist elsewhere in library)
  let coverImageCids = [];

  let children = user.data.library[0].children.filter((o) => {
    for (let cid of req.body.data.cids) {
      if (o.cid && o.cid === cid) {
        if (o.coverImage) {
          coverImageCids.push(o.coverImage.cid);
        }
        return false;
      }
    }
    return true;
  });

  let libraryCids = user.data.library[0].children.map((item) => item.cid);
  coverImageCids = coverImageCids.filter((cid) => {
    if (libraryCids.includes(cid)) {
      return false;
    }
    return true;
  });

  let entities = [];
  let ids = req.body.data.ids && req.body.data.ids.length ? req.body.data.ids : [];
  for (let i = 0; i < items.length; i++) {
    if (req.body.data.cids.includes(items[i].cid)) {
      entities.push(items[i]);
      continue;
    }

    if (coverImageCids.includes(items[i].cid)) {
      entities.push(items[i]);
      continue;
    }

    // NOTE(jim): Maybe the CID is missing, but our names/ids are guaranteed to be unique.
    if (ids.includes(items[i].name)) {
      entities.push(items[i]);
      continue;
    }

    // NOTE(jim): Perform path check against cid as a last resort.
    for (let j = 0; j < req.body.data.cids.length; j++) {
      if (items[i].path.includes(req.body.data.cids[j])) {
        entities.push(items[i]);
        continue;
      }
    }

    // NOTE(jim): Perform path check against name as a last resort.
    for (let j = 0; j < ids.length; j++) {
      if (items[i].path.includes(ids[j])) {
        entities.push(items[i]);
        continue;
      }
    }
  }

  if (entities.length) {
    // remove from your bucket
    for (let entity of entities) {
      try {
        // NOTE(jim):
        // We use name instead of path because the second argument is for
        // a subpath, not the full path.
        await buckets.removePath(bucketKey, entity.name);
      } catch (e) {
        Social.sendTextileSlackMessage({
          file: "/pages/api/data/remove.js",
          user: user,
          message: e.message,
          code: e.code,
          functionName: `buckets.removePath`,
        });

        continue;
      }
    }
  }

  let refreshSlates = false;
  // NOTE(martina):
  // Removes the file from all of your slates and any slates it was reposted to from yours
  for (let cid of req.body.data.cids) {
    let slates = await Data.getSlateObjectsByCID({
      url: Strings.getCIDGatewayURL(cid),
      ownerId: id,
    });
    for (let slate of slates) {
      let objects = slate.data.objects.filter((o) => {
        if (o.url.includes(cid)) return false;
        return true;
      });
      let newSlate = await Data.updateSlateById({
        id: slate.id,
        updated_at: new Date(),
        data: {
          ...slate.data,
          objects,
        },
      });
      if (slate.data.ownerId === id) {
        refreshSlates = true;
      }
      SearchManager.updateSlate(newSlate, "EDIT");
    }
  }

  if (refreshSlates) {
    let slates = await Data.getSlatesByUserId({ userId: id });
    ViewerManager.hydratePartialSlates(slates, id);
  }

  // NOTE(jim):
  // Removes the file reference from your library
  const unsafeResponse = await Data.updateUserById({
    id: user.id,
    data: {
      ...user.data,
      library: [
        {
          ...user.data.library[0],
          children,
        },
      ],
    },
  });

  if (unsafeResponse) {
    ViewerManager.hydratePartialViewer(unsafeResponse);
  }

  return res.status(200).send({
    decorator: "SERVER_REMOVE_DATA",
    success: true,
    bucketItems: items,
  });
};
