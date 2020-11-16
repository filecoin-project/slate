import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as Social from "~/node_common/social";
import * as Monitor from "~/node_common/monitor";
import * as Strings from "~/common/strings";

import { v4 as uuid } from "uuid";
import { MAX_BUCKET_COUNT, MIN_ARCHIVE_SIZE_BYTES } from "~/node_common/constants";

const STAGING_DEAL_BUCKET = "stage-deal";

export default async (req, res) => {
  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res.status(403).send({ decorator: "SERVER_REMOVE_DATA_NOT_ALLOWED", error: true });
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

  let bucketName = null;
  if (req.body.data && req.body.data.bucketName) {
    bucketName = req.body.data.bucketName;
  }

  const { buckets, bucketKey, bucketRoot } = await Utilities.getBucketAPIFromUserToken({
    user,
    bucketName,
  });

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
  let bucketSizeBytes = 0;
  try {
    const path = await buckets.listPath(bucketRoot.key, "/");
    items = path.item;
    bucketSizeBytes = path.item.size;
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

  console.log(`[ deal ] deal size: ${Strings.bytesToSize(bucketSizeBytes)}`);
  if (bucketSizeBytes < MIN_ARCHIVE_SIZE_BYTES) {
    return res.status(500).send({
      decorator: "STORAGE_BUCKET_TOO_SMALL",
      message: `Your deal size of ${Strings.bytesToSize(
        bucketSizeBytes
      )} is too small. You must provide at least 100MB.`,
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
    `[ encrypted ] user has ${userBuckets.length} out of ${MAX_BUCKET_COUNT} buckets used.`
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
  if (bucketName !== STAGING_DEAL_BUCKET && user.data.allow_encrypted_data_storage) {
    encryptThisDeal = true;
  }

  if (req.body.data.forceEncryption) {
    encryptThisDeal = true;
  }

  let key = bucketRoot.key;
  let encryptedBucketName = null;
  if (user.data.allow_encrypted_data_storage || req.body.data.forceEncryption) {
    encryptedBucketName = req.body.data.forceEncryption
      ? `encrypted-deal-${uuid()}`
      : `encrypted-data-${uuid()}`;

    console.log(`[ encrypted ] making an ${encryptedBucketName} for this storage deal.`);

    try {
      const newBucket = await buckets.create(encryptedBucketName, true, items.cid);

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
      const newBucket = await buckets.create(newDealBucketName, false, items.cid);

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
    if (req.body.data && req.body.data.settings) {
      console.log(req.body.data.settings);
      response = await buckets.archive(key, req.body.data.settings);
    } else {
      response = await buckets.archive(key);
    }

    Monitor.deal({
      userId: user.id,
      data: {
        actorUserId: user.id,
        context: {
          username: user.username,
          bucketName: encryptedBucketName ? encryptedBucketName : bucketName,
          isEncrypted: encryptThisDeal,
        },
      },
    });

    console.log(response);
  } catch (e) {
    error.message = e.message;
    error.code = e.code;
    console.log(e.message);

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
