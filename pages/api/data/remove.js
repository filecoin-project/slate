import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as Strings from "~/common/strings";
import * as Social from "~/node_common/social";

const generateLayout = (items) => {
  if (!items) {
    return [];
  }

  if (!items.length) {
    return [];
  }

  return items.map((item, i) => {
    var y = Math.ceil(Math.random() * 4) + 1;

    return {
      x: (i * 2) % 10,
      y: 0,
      w: 2,
      h: 2,
      minW: 2,
      minH: 2,
      // NOTE(jim): Library quirk thats required.
      i: i.toString(),
    };
  });
};

export default async (req, res) => {
  if (Strings.isEmpty(req.body.data.cid)) {
    return res
      .status(500)
      .send({ decorator: "SERVER_REMOVE_DATA_NO_CID", error: true });
  }

  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res
      .status(403)
      .send({ decorator: "SERVER_REMOVE_DATA_NOT_ALLOWED", error: true });
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
      file: "/pages/api/data/remove.js",
      user,
      message: e.message,
      code: e.code,
      functionName: `buckets.list`,
    });
  }

  if (!r) {
    return res
      .status(500)
      .send({ decorator: "SERVER_REMOVE_DATA_NO_TEXTILE", error: true });
  }

  // TODO(jim): Put this call into a file for all Textile related calls.
  let items = null;
  try {
    items = await buckets.listIpfsPath(r[0].path);
  } catch (e) {
    Social.sendTextileSlackMessage({
      file: "/pages/api/data/remove.js",
      user,
      message: e.message,
      code: e.code,
      functionName: `buckets.listIpfsPath`,
    });
  }

  if (!items) {
    return res
      .status(500)
      .send({ decorator: "SERVER_REMOVE_DATA_NO_TEXTILE", error: true });
  }

  let entity;
  for (let i = 0; i < items.items.length; i++) {
    if (items.items[i].cid === req.body.data.cid) {
      entity = items.items[i];
      break;
    }
  }

  if (!entity) {
    return res
      .status(500)
      .send({ decorator: "SERVER_REMOVE_DATA_NO_CID", error: true });
  }

  let bucketRemoval;
  try {
    bucketRemoval = await buckets.removePath(bucketKey, entity.name);
  } catch (e) {
    Social.sendTextileSlackMessage({
      file: "/pages/api/data/remove.js",
      user,
      message: e.message,
      code: e.code,
      functionName: `buckets.removePath`,
    });

    return res
      .status(500)
      .send({ decorator: "SERVER_REMOVE_DATA_NO_LINK", error: true });
  }

  // NOTE(jim):
  // Goes through all of your slates and removes all data references.
  const slates = await Data.getSlatesByUserId({ userId: id });
  for (let i = 0; i < slates.length; i++) {
    const slate = slates[i];

    let removal = false;
    const objects = slate.data.objects.filter((o) => {
      if (o.url.includes(req.body.data.cid)) {
        removal = true;
        return false;
      }

      return true;
    });

    if (removal) {
      const layouts = await Data.updateSlateById({
        id: slate.id,
        updated_at: new Date(),
        data: {
          ...slate.data,
          objects,
          layouts: { lg: generateLayout(objects) },
        },
      });
    }
  }

  // NOTE(jim):
  // Removes the file reference from your library
  const response = await Data.updateUserById({
    id: user.id,
    data: {
      ...user.data,
      library: [
        {
          ...user.data.library[0],
          children: user.data.library[0].children.filter(
            (o) => !o.ipfs.includes(req.body.data.cid)
          ),
        },
      ],
    },
  });

  return res.status(200).send({
    decorator: "SERVER_REMOVE_DATA",
    success: true,
    bucketItems: items.items,
  });
};
