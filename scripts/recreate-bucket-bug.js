import * as Environment from "~/node_common/environment";
import * as Utilities from "~/node_common/utilities";
import * as Social from "~/node_common/social";

import configs from "~/knexfile";
import knex from "knex";

import { PrivateKey } from "@textile/hub";
import { exec } from "child_process";

const envConfig = configs["development"];
const db = knex(envConfig);

// NOTE(jim):
// This script will reproduce the bucket bricking bug
// We will trigger it by trying to upload a file thats too big.
console.log(`RUNNING:  recreate-bucket-bug.js`);

const TEXTILE_KEY_INFO = {
  key: Environment.TEXTILE_HUB_KEY,
  secret: Environment.TEXTILE_HUB_SECRET,
};

const run = async () => {
  const identity = await PrivateKey.fromRandom();
  const api = identity.toString();

  const user = {
    username: "SCRIPT_USER",
    data: {
      tokens: {
        api,
      },
    },
  };

  console.log({ api });

  let { buckets, bucketKey } = await Utilities.getBucketAPIFromUserToken({
    user,
    bucketName: "delete-this-bucket",
  });

  // NOTE(jim): Verify this new bucket exists.
  let list = null;
  try {
    list = await buckets.list();
    console.log({ list });
  } catch (e) {
    console.log(e.message);
    Social.sendTextileSlackMessage({
      file: "recreate-bucket-bug.js",
      user,
      message: e.message,
      code: e.code,
      functionName: `buckets.list`,
    });
  }

  // NOTE(jim): Remove the bucket from Textile.
  let bucketRemoval;
  try {
    bucketRemoval = await buckets.remove(list[0].key);
  } catch (e) {
    console.log(e.message);
    Social.sendTextileSlackMessage({
      file: "recreate-bucket-bug.js",
      user,
      message: e.message,
      code: e.code,
      functionName: `buckets.removePath`,
    });
  }

  // NOTE(jim): Verify we cleaned up user data.
  try {
    list = await buckets.list();
    console.log({ emptyList: list });
  } catch (e) {
    console.log(e.message);
    Social.sendTextileSlackMessage({
      file: "recreate-bucket-bug.js",
      user,
      message: e.message,
      code: e.code,
      functionName: `buckets.list`,
    });
  }
};

run();

console.log(`FINISHED: recreate-bucket-bug.js`);
console.log(`          CTRL +C to return to terminal.`);
