import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as Social from "~/node_common/social";

import { v4 as uuid } from "uuid";
import { MAX_BUCKET_COUNT } from "~/node_common/constants";

const STAGING_DEAL_BUCKET = "stage-deal";

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

  // NOTE(jim):
  //
  // Getting the appropriate bucket key

  let items = null;
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

  if (!items) {
    return res.status(500).send({
      decorator: "STORAGE_DEAL_MAKING_NO_BUCKET",
      error: true,
    });
  }

  console.log(`[ deal ] will make a deal for ${items.items.length} items`);

  if (items.items.length < 2) {
    return res.status(500).send({
      decorator: "STORAGE_DEAL_MAKING_NO_FILES",
      error: true,
    });
  }

  // NOTE(jim):
  //
  // Make sure that you haven't hit the MAX_BUCKET_COUNT

  let userBuckets = [];
  try {
    userBuckets = await buckets.list();
  } catch (e) {
    Social.sendTextileSlackMessage({
      file: "/pages/api/data/archive.js",
      user: user,
      message: e.message,
      code: e.code,
      functionName: `buckets.list`,
    });

    return res.status(500).send({
      decorator: "BUCKET_SPAWN_VERIFICATION_FAILED_FOR_BUCKET_COUNT",
      error: true,
    });
  }

  console.log(
    `[ encrypted ] user has ${
      userBuckets.length
    } out of ${MAX_BUCKET_COUNT} buckets used.`
  );
  if (userBuckets.length >= MAX_BUCKET_COUNT) {
    return res.status(500).send({
      decorator: "TOO_MANY_BUCKETS",
      error: true,
    });
  }

  // NOTE(jim):
  //
  // Either encrypt the bucket or don't encrypt the bucket.

  let encryptThisDeal = false;
  if (
    bucketName !== STAGING_DEAL_BUCKET &&
    user.data.allow_encrypted_data_storage
  ) {
    encryptThisDeal = true;
  }

  if (req.body.data.forceEncryption) {
    encryptThisDeal = true;
  }

  let key = bucketRoot.key;
  if (user.data.allow_encrypted_data_storage || req.body.data.forceEncryption) {
    const encryptedBucketName = req.body.data.forceEncryption
      ? `encrypted-deal-${uuid()}`
      : `encrypted-data-${uuid()}`;

    console.log(
      `[ encrypted ] making an ${encryptedBucketName} for this storage deal.`
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
  } else {
    const newDealBucketName = `open-deal-${uuid()}`;

    try {
      const newBucket = await buckets.create(
        newDealBucketName,
        false,
        items.cid
      );

      key = newBucket.root.key;
    } catch (e) {
      Social.sendTextileSlackMessage({
        file: "/pages/api/data/archive.js",
        user: user,
        message: e.message,
        code: e.code,
        functionName: `buckets.create (normal, not encrypted)`,
      });

      return res.status(500).send({
        decorator: "BUCKET_CLONING_FAILED",
        error: true,
      });
    }

    console.log(`[ normal ] ${newDealBucketName}`);
    console.log(`[ normal ] ${key}`);
  }

  // NOTE(jim):
  //
  // Finally make the deal

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
      decorator: "STORAGE_DEAL_MAKING_NOT_SANITARY",
      error: true,
      message: e.message,
    });
  }

  return res.status(200).send({
    decorator: "SERVER_DEAL_MAKING_PURE",
    data: { response, error },
  });
};
