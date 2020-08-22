import * as MW from "~/node_common/middleware";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as Strings from "~/common/strings";

const initCORS = MW.init(MW.CORS);
const initAuth = MW.init(MW.RequireCookieAuthentication);

export default async (req, res) => {
  initCORS(req, res);
  initAuth(req, res);

  if (Strings.isEmpty(req.body.data.cid)) {
    return res.status(500).json({ decorator: "SERVER_REMOVE_DATA_NO_CID", error: true });
  }

  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res.status(403).json({ decorator: "SERVER_REMOVE_DATA_NOT_ALLOWED", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  const { buckets, bucketKey, bucketName } = await Utilities.getBucketAPIFromUserToken(user.data.tokens.api);

  const r = await buckets.list();
  const items = await buckets.listIpfsPath(r[0].path);

  let entity;
  for (let i = 0; i < items.itemsList.length; i++) {
    if (items.itemsList[i].cid === req.body.data.cid) {
      entity = items.itemsList[i];
      break;
    }
  }

  if (!entity) {
    return res.status(500).json({ decorator: "SERVER_REMOVE_DATA_NO_CID", error: true });
  }

  // remove from your bucket
  let bucketRemoval;
  try {
    // NOTE(jim):
    // We use name instead of path because the second argument is for
    // a subpath, not the full path.
    bucketRemoval = await buckets.removePath(bucketKey, entity.name);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ decorator: "SERVER_REMOVE_DATA_NO_LINK", error: true });
  }

  // NOTE(jim):
  // Goes through all of your slates and removes all data references.
  const slates = await Data.getSlatesByUserId({ userId: id });
  for (let i = 0; i < slates.length; i++) {
    const slate = slates[i];

    await Data.updateSlateById({
      id: slate.id,
      updated_at: new Date(),
      data: {
        ...slate.data,
        objects: slate.data.objects.filter((o) => !o.url.includes(req.body.data.cid)),
      },
    });
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
          children: user.data.library[0].children.filter((o) => !o.ipfs.includes(req.body.data.cid)),
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
