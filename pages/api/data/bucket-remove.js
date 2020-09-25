import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as Strings from "~/common/strings";
import * as Social from "~/node_common/social";

export default async (req, res) => {
  if (Strings.isEmpty(req.body.data.cid)) {
    return res
      .status(500)
      .send({ decorator: "SERVER_BUCKET_REMOVE_DATA_NO_CID", error: true });
  }

  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res.status(403).send({
      decorator: "SERVER_BUCKET_REMOVE_DATA_NOT_ALLOWED",
      error: true,
    });
  }

  const user = await Data.getUserById({
    id,
  });

  const { buckets, bucketKey } = await Utilities.getBucketAPIFromUserToken({
    user,
    bucketName: req.body.data.bucketName,
  });

  if (!buckets) {
    return res.status(500).send({
      decorator: "SERVER_BUCKET_BUCKET_INIT_FAILURE",
      error: true,
    });
  }

  // TODO(jim): Put this call into a file for all Textile related calls.
  let r = null;
  try {
    r = await buckets.list();
  } catch (e) {
    Social.sendTextileSlackMessage({
      file: "/pages/api/data/bucket-remove.js",
      user,
      message: e.message,
      code: e.code,
      functionName: `buckets.list`,
    });
  }

  if (!r) {
    return res
      .status(500)
      .send({ decorator: "SERVER_BUCKET_REMOVE_DATA_NO_TEXTILE", error: true });
  }

  const targetBucket = r.find((d) => d.name === req.body.data.bucketName);

  if (!targetBucket) {
    return res
      .status(404)
      .send({ decorator: "SERVER_BUCKET_NOT_FOUND", error: true });
  }

  // TODO(sander+jim):
  // See line: 196 on https://github.com/filecoin-project/slate/blob/main/node_common/managers/viewer.js
  // Would be nice to be nice to get `entity.encrypted` on the bucket property.
  let items = null;
  if (targetBucket.name === "encrypted-deal") {
    console.log("[ encrypted ] removing from encrypted bucket");
    try {
      const path = await buckets.listPath(targetBucket.key, "/");
      items = path.item;
    } catch (e) {
      Social.sendTextileSlackMessage({
        file: "/pages/api/data/bucket-remove.js",
        user,
        message: e.message,
        code: e.code,
        functionName: `buckets.listPath`,
      });
    }
  } else {
    try {
      items = await buckets.listIpfsPath(targetBucket.path);
    } catch (e) {
      Social.sendTextileSlackMessage({
        file: "/pages/api/data/bucket-remove.js",
        user,
        message: e.message,
        code: e.code,
        functionName: `buckets.listIpfsPath`,
      });
    }
  }

  if (!items) {
    return res
      .status(500)
      .send({ decorator: "SERVER_BUCKET_REMOVE_DATA_NO_TEXTILE", error: true });
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
      .send({ decorator: "SERVER_BUCKET_REMOVE_DATA_NO_CID", error: true });
  }

  let bucketRemoval;
  try {
    bucketRemoval = await buckets.removePath(bucketKey, entity.name);
  } catch (e) {
    Social.sendTextileSlackMessage({
      file: "/pages/api/data/bucket-remove.js",
      user,
      message: e.message,
      code: e.code,
      functionName: `buckets.removePath`,
    });

    return res
      .status(500)
      .send({ decorator: "SERVER_BUCKET_REMOVE_DATA_NO_LINK", error: true });
  }

  return res.status(200).send({
    decorator: "SERVER_BUCKET_REMOVE_DATA",
    success: true,
    bucketItems: items.items,
  });
};
