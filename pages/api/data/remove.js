import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as Strings from "~/common/strings";
import * as Social from "~/node_common/social";

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
  let items = null;
  try {
    items = await buckets.listIpfsPath(r[0].path);
  } catch (e) {
    Social.sendTextileSlackMessage({
      file: "/pages/api/data/remove-multiple.js",
      user,
      message: e.message,
      code: e.code,
      functionName: `buckets.listIpfsPath`,
    });
  }

  if (!items) {
    return res.status(500).send({ decorator: "SERVER_REMOVE_MULTIPLE_NO_TEXTILE", error: true });
  }

  let entities = [];
  for (let i = 0; i < items.items.length; i++) {
    if (req.body.data.cids.includes(items.items[i].cid)) {
      entities.push(items.items[i]);
      if (entities.length === items.items.length) break;
    }
  }

  if (!entities.length) {
    return res.status(500).send({ decorator: "SERVER_REMOVE_DATA_NO_CID", error: true });
  }

  let bucketRemoval;
  // remove from your bucket
  for (let entity of entities) {
    try {
      // NOTE(jim):
      // We use name instead of path because the second argument is for
      // a subpath, not the full path.
      bucketRemoval = await buckets.removePath(bucketKey, entity.name);
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

  // NOTE(jim):
  // Goes through all of your slates and removes all data references.
  const slates = await Data.getSlatesByUserId({ userId: id });
  for (let i = 0; i < slates.length; i++) {
    let slate = slates[i];

    let removal = false;
    let objects = slate.data.objects.filter((o) => {
      for (let cid of req.body.data.cids) {
        if (o.url.includes(cid)) {
          removal = true;
          return false;
        }
      }
      return true;
    });

    if (removal) {
      let layouts = await Data.updateSlateById({
        id: slate.id,
        updated_at: new Date(),
        data: {
          ...slate.data,
          objects,
        },
      });
    }
  }

  // NOTE(martina):
  // Removes the reposted file from other people's slates
  // for (let cid of req.body.data.cids) {
  //   Data.deleteRepostsByCid({ cid, ownerId: id });
  // }

  // NOTE(jim):
  // Removes the file reference from your library
  const response = await Data.updateUserById({
    id: user.id,
    data: {
      ...user.data,
      library: [
        {
          ...user.data.library[0],
          children: user.data.library[0].children.filter((o) => {
            for (let cid of req.body.data.cids) {
              if (o.ipfs.includes(cid)) {
                return false;
              }
            }
            return true;
          }),
        },
      ],
    },
  });

  return res.status(200).send({
    decorator: "SERVER_REMOVE_DATA",
    success: true,
    bucketItems: items.itemsList,
  });
};
