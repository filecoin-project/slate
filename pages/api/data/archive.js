import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as Social from "~/node_common/social";

import { v4 as uuid } from "uuid";

export default async (req, res) => {
  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res
      .status(403)
      .send({ decorator: "SERVER_REMOVE_DATA_NOT_ALLOWED", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return res.status(404).send({
      decorator: "SERVER_BUCKET_ARCHIVE_DEAL_USER_NOT_FOUND",
      error: true,
    });
  }

  if (user.error) {
    return res.status(500).send({
      decorator: "SERVER_BUCKET_ARCHIVE_DEAL_USER_NOT_FOUND",
      error: true,
    });
  }

  let bucketName;
  if (req.body.data && req.body.data.bucketName) {
    bucketName = req.body.data.bucketName;
  }

  const {
    buckets,
    bucketKey,
    bucketRoot,
  } = await Utilities.getBucketAPIFromUserToken({ user, bucketName });

  if (!buckets) {
    return res.status(500).send({
      decorator: "SERVER_BUCKET_INIT_FAILURE",
      error: true,
    });
  }

  // TODO(sander+jim):
  // See line: 196 on https://github.com/filecoin-project/slate/blob/main/node_common/managers/viewer.js
  // Would be nice to be nice to get `entity.encrypted` on the bucket property.
  let items = null;
  if (bucketName === "encrypted-deal") {
    console.log("[ encrypted ] archiving encrypted bucket");
    try {
      const path = await buckets.listPath(bucketRoot.key, "/");
      items = path.item;
    } catch (e) {
      Social.sendTextileSlackMessage({
        file: "/node_common/managers/viewer.js",
        user,
        message: e.message,
        code: e.code,
        functionName: `buckets.listPath`,
      });
    }
  } else {
    try {
      items = await buckets.listIpfsPath(bucketRoot.path);
    } catch (e) {
      Social.sendTextileSlackMessage({
        file: "/pages/api/data/archive.js",
        user,
        message: e.message,
        code: e.code,
        functionName: `buckets.listIpfsPath`,
      });
    }
  }

  if (!items) {
    return res.status(500).send({
      decorator: "STORAGE_DEAL_MAKING_NO_BUCKET",
      error: true,
    });
  }

  if (items.items.length < 2) {
    return res.status(500).send({
      decorator: "STORAGE_DEAL_MAKING_NO_FILES",
      error: true,
    });
  }

  let key = bucketRoot.key;
  if (
    bucketName !== "encrypted-deal" &&
    user.data.allow_encrypted_data_storage
  ) {
    const encryptedBucketName = `encrypted-data-${uuid()}`;
    console.log(
      `[ encrypted ] making an ${encryptedBucketName} for this archive deal.`
    );
    try {
      const newBucket = await buckets.create(
        encryptedBucketName,
        true,
        items.cid
      );

      key = newBucket.root.key;
    } catch (e) {
      Social.sendTextileSlackMessage({
        file: "/pages/api/data/archive.js",
        user: user,
        message: e.message,
        code: e.code,
        functionName: `buckets.create (encrypted)`,
      });

      return res.status(500).send({
        decorator: "FORCED_ENCRYPTION_FAILED_FOR_DATA",
        error: true,
      });
    }

    console.log(`[ encrypted ] ${encryptedBucketName}`);
    console.log(`[ encrypted ] ${key}`);
  }

  let response = {};
  let error = {};
  try {
    console.log(`[ deal-maker ] deal being made for ${key}`);
    response = await buckets.archive(key);
  } catch (e) {
    error.message = e.message;
    error.code = e.code;
    Social.sendTextileSlackMessage({
      file: "/pages/api/data/archive.js",
      user: user,
      message: e.message,
      code: e.code,
      functionName: `buckets.archive`,
    });

    return res.status(500).send({
      decorator: "STORAGE_DEAL_MAKING_TEXTILE_ERROR",
      error: true,
      message: e.message,
    });
  }

  return res.status(200).send({
    decorator: "SERVER_BUCKET_ARCHIVE_DEAL",
    data: { response, error },
  });
};
