import * as Environment from "~/node_common/environment";
import * as Utilities from "~/node_common/utilities";

import configs from "~/knexfile";
import knex from "knex";
import FS from "fs";

import { PrivateKey } from "@textile/hub";
import { execSync } from "child_process";

const envConfig = configs["development"];
const db = knex(envConfig);

// NOTE(jim):
// This script will reproduce the bucket bricking bug
// We will trigger it by trying to upload a file thats too big.
console.log(`RUNNING:  recreate-bucket-bug.js`);

const HIGH_WATER_MARK = 1024 * 1024 * 3;

const TEXTILE_KEY_INFO = {
  key: Environment.TEXTILE_HUB_KEY,
  secret: Environment.TEXTILE_HUB_SECRET,
};

const reportError = (message) => {
  console.log(
    `\x1b[1m[ \x1b[31mTEXTILE ERROR\x1b[0m\x1b[1m ]\x1b[0m ${message}`
  );
};

const reportTask = (message) => {
  console.log(`\x1b[1m[ \x1b[32mSCRIPT\x1b[0m\x1b[1m ]\x1b[0m ${message}`);
};

const run = async () => {
  reportTask(`creating key`);

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

  reportTask(
    `initializing bucket with .env variables from your Slate environment`
  );

  console.log({ api });

  let { buckets, bucketKey } = await Utilities.getBucketAPIFromUserToken({
    user,
    bucketName: "delete-this-bucket",
  });

  // NOTE(jim): Verify this new bucket exists.
  //
  // ----------------------------------------------------------------

  reportTask(`attempting to print bucket`);

  let list = null;
  try {
    list = await buckets.list();
    console.log({ list });
  } catch (e) {
    reportError(e.message);
  }

  // NOTE(jim): Create 200MB File
  //            Create 500MB File
  //            Create 1GB File
  //            Create 2GB File
  //            Create 4GB File
  // ----------------------------------------------------------------

  reportTask(`creating test files, hardcoded in script file`);

  const files = [];
  try {
    await execSync(
      "dd if=/dev/random of=200MB_BUCKET_TEST.txt bs=1 count=0 seek=200m"
    );
    files.push("200MB_BUCKET_TEST.txt");

    await execSync(
      "dd if=/dev/random of=500MB_BUCKET_TEST.txt bs=1 count=0 seek=500m"
    );
    files.push("500MB_BUCKET_TEST.txt");

    await execSync(
      "dd if=/dev/random of=1GB_BUCKET_TEST.txt bs=1 count=0 seek=1g"
    );
    files.push("1GB_BUCKET_TEST.txt");

    await execSync(
      "dd if=/dev/random of=2GB_BUCKET_TEST.txt bs=1 count=0 seek=2g"
    );
    files.push("2GB_BUCKET_TEST.txt");

    // NOTE(jim): For Textile
    //            Uncommenting this block will trigger a bug we should
    //            Resolve first.
    // ----------------------------------------------------------------

    /*
    await execSync(
      "dd if=/dev/random of=4GB_BUCKET_TEST.txt bs=1 count=0 seek=4g"
    );
    files.push("4GB_BUCKET_TEST.txt");
    */
  } catch (e) {
    reportError(e.message);
  }

  console.log({ files });

  // NOTE(jim): Try to upload each file the first time.
  // ----------------------------------------------------------------
  let items;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    const readStream = FS.createReadStream(`${file}`, {
      highWaterMark: HIGH_WATER_MARK,
    });

    reportTask(`attempting ${file} push to bucket`);

    try {
      await buckets.pushPath(bucketKey, file, readStream);
    } catch (e) {
      reportError(e.message);
    }

    reportTask(`successfully added ${file}`);

    items = null;
    try {
      reportTask(`attempting listPath for ${list[0].key}`);
      const response = await buckets.listPath(list[0].key, "/");
      items = response.item.items;
    } catch (e) {
      reportError(e.message);
    }

    reportTask(`there are ${items.length} items, including .textileseed`);
  }

  // NOTE(jim): Remove each file
  //            We remove each file so that we can upload more files again.
  // ----------------------------------------------------------------
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    reportTask(`attempting to remove ${item.name}.`);
    try {
      await buckets.removePath(bucketKey, item.name);
      reportTask(`${item.name} has been removed.`);
    } catch (e) {
      reportError(e.message);
    }
  }

  // NOTE(jim): here we check to make sure that each bucket item
  //            has been removed appropriately.
  // ----------------------------------------------------------------
  try {
    reportTask(`attempting listPath for ${list[0].key} after deletions`);
    const response = await buckets.listPath(list[0].key, "/");
    items = response.item.items;
  } catch (e) {
    reportError(e.message);
  }

  reportTask(`there are ${items.length} items.`);

  // NOTE(jim): Try to upload each file again.
  //            This helps us check whether or not the bucket can handle
  //            uploads after files have been removed.
  // ----------------------------------------------------------------
  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    const readStream = FS.createReadStream(`${file}`, {
      highWaterMark: HIGH_WATER_MARK,
    });

    reportTask(
      `\x1b[1m[ second upload phase ]\x1b[0m attempting ${file} push to bucket`
    );

    try {
      await buckets.pushPath(bucketKey, file, readStream);
    } catch (e) {
      reportError(e.message);
    }

    reportTask(
      `\x1b[1m[ second upload phase ]\x1b[0m successfully added ${file}`
    );

    items = null;
    try {
      reportTask(
        `\x1b[1m[ second upload phase ]\x1b[0m attempting listPath for ${
          list[0].key
        }`
      );
      const response = await buckets.listPath(list[0].key, "/");
      items = response.item.items;
    } catch (e) {
      reportError(e.message);
    }

    reportTask(
      `\x1b[1m[ second upload phase ]\x1b[0m there are ${
        items.length
      } items, including .textileseed`
    );
  }

  // NOTE(jim): Remove the bucket from Textile.
  // ----------------------------------------------------------------
  let bucketRemoval;
  try {
    bucketRemoval = await buckets.remove(list[0].key);
  } catch (e) {
    reportError(e.message);
  }

  // NOTE(jim): Verify we cleaned up user data.
  // ----------------------------------------------------------------
  list = "CHANGE_ME";
  try {
    list = await buckets.list();
    console.log({ emptyList: list });
  } catch (e) {
    reportError(e.message);
  }

  reportTask(`SUCCESS.`);
};

run();

console.log(`FINISHED: recreate-bucket-bug.js`);
console.log(`          CTRL +C to return to terminal.`);
