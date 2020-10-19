import configs from "~/knexfile";
import knex from "knex";
import fs from "fs-extra";
import "isomorphic-fetch";

import * as Environment from "~/node_common/environment";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as Strings from "~/common/strings";
import * as Logs from "~/node_common/script-logging";
import * as Serializers from "~/node_common/serializers";

import { Buckets, PrivateKey } from "@textile/hub";
import { v4 as uuid } from "uuid";

const envConfig = configs["development"];
const db = knex(envConfig);

// 100 MB minimum
const MINIMUM_BYTES_FOR_STORAGE = 104857600;
const STORAGE_BOT_NAME = "STORAGE WORKER";

// We don't make new buckets if they have more than 10.
const BUCKET_LIMIT = 10;
const PRACTICE_RUN = false;
const SKIP_NEW_BUCKET_CREATION = false;
const STORE_MEANINGFUL_ADDRESS_ONLY_AND_PERFORM_NO_ACTIONS = false;
const WRITE_TO_SLATE_STORAGE_DEAL_INDEX = true;

const TEXTILE_KEY_INFO = {
  key: Environment.TEXTILE_HUB_KEY,
  secret: Environment.TEXTILE_HUB_SECRET,
};

console.log(`RUNNING:  worker-heavy-stones.js`);

const delay = async (waitMs) => {
  return await new Promise((resolve) => setTimeout(resolve, waitMs));
};

const minerMap = {};

const run = async () => {
  Logs.taskTimeless(`Fetching every miner ...`);

  const minerData = await fetch("https://sentinel.slate.host/api/mapped-static-global-miners");
  const jsonData = await minerData.json();

  jsonData.data.forEach((group) => {
    group.minerAddresses.forEach((entity) => {
      minerMap[entity.miner] = entity;
      minerMap[entity.miner.replace("t", "f")] = entity;
    });
  });

  Logs.taskTimeless(`Fetching every user ...`);
  const response = await Data.getEveryUser(false);

  const storageUsers = [];
  const writable = [];
  const slateAddresses = [];
  let bytes = 0;
  let dealUsers = 0;
  let totalUsers = 0;
  let encryptedUsers = 0;

  // NOTE(jim): Only users who agree. Opt in by default.
  for (let i = 0; i < response.length; i++) {
    const user = response[i];

    if (user.data.allow_automatic_data_storage) {
      storageUsers.push(user);
      dealUsers = dealUsers + 1;
    }

    if (user.data.allow_encrypted_data_storage) {
      encryptedUsers = encryptedUsers + 1;
    }

    totalUsers = totalUsers + 1;
  }

  for (let i = 0; i < storageUsers.length; i++) {
    const user = storageUsers[i];
    const printData = {
      username: storageUsers[i].username,
      slateURL: `https://slate.host/${storageUsers[i].username}`,
      isForcingEncryption: user.data.allow_encrypted_data_storage,
    };
    let buckets;

    await delay(500);

    try {
      const token = user.data.tokens.api;
      const identity = await PrivateKey.fromString(token);
      buckets = await Buckets.withKeyInfo(TEXTILE_KEY_INFO);
      await buckets.getToken(identity);
      buckets = await Utilities.setupWithThread({ buckets });
    } catch (e) {
      Logs.error(e.message);
    }

    let userBuckets = [];
    try {
      userBuckets = await buckets.list();
    } catch (e) {
      Logs.error(e.message);
    }

    let userBytes = 0;

    for (let k = 0; k < userBuckets.length; k++) {
      try {
        const path = await buckets.listPath(userBuckets[k].key, "/");
        const data = path.item;

        if (data.name !== "data") {
          continue;
        }

        userBuckets[k].bucketSize = data.size;
        userBytes = userBytes + data.size;
        bytes = bytes + userBytes;
      } catch (e) {
        Logs.error(e.message);
      }
    }

    printData.bytes = userBytes;

    // NOTE(jim): Skip people.
    if (userBytes < MINIMUM_BYTES_FOR_STORAGE) {
      Logs.note(`SKIP: ${user.username}`);
      continue;
    }

    const PowergateSingleton = await Utilities.getPowergateAPIFromUserToken({
      user,
    });
    const { powerInfo, power } = PowergateSingleton;
    let balance = 0;
    let address = null;

    await delay(500);

    try {
      if (powerInfo) {
        powerInfo.balancesList.forEach((a) => {
          balance = a.balance;
          address = a.addr.addr;
        });
      } else {
        Logs.error(`Powergate powerInfo does not exist.`);
      }
    } catch (e) {
      Logs.error(e.message);
    }

    if (address) {
      slateAddresses.push(address);
    }

    // NOTE(jim): Exit early for analytics purposes.
    if (STORE_MEANINGFUL_ADDRESS_ONLY_AND_PERFORM_NO_ACTIONS) {
      Logs.taskTimeless(`Adding address for: ${user.username}`);
      continue;
    }

    let storageDeals = [];
    try {
      const listStorageResult = await power.listStorageDealRecords({
        ascending: false,
        includePending: false,
        includeFinal: true,
      });

      listStorageResult.recordsList.forEach((o) => {
        storageDeals.push({
          dealId: o.dealInfo.dealId,
          rootCid: o.rootCid,
          proposalCid: o.dealInfo.proposalCid,
          pieceCid: o.dealInfo.pieceCid,
          addr: o.addr,
          size: o.dealInfo.size,
          // NOTE(jim): formatted size.
          formattedSize: Strings.bytesToSize(o.dealInfo.size),
          pricePerEpoch: o.dealInfo.pricePerEpoch,
          startEpoch: o.dealInfo.startEpoch,
          // NOTE(jim): just for point of reference on the total cost.
          totalCostFIL: Strings.formatAsFilecoinConversion(
            o.dealInfo.pricePerEpoch * o.dealInfo.duration
          ),
          totalCostAttoFIL: o.dealInfo.pricePerEpoch * o.dealInfo.duration,
          duration: o.dealInfo.duration,
          formattedDuration: Strings.getDaysFromEpoch(o.dealInfo.duration),
          activationEpoch: o.dealInfo.activationEpoch,
          time: o.time,
          pending: o.pending,
          minerId: o.dealInfo.miner,
          miner: { ...minerMap[o.dealInfo.miner], id: o.dealInfo.miner },
          createdAt: Strings.toDateSinceEpoch(o.time),
          userEncryptsDeals: !!user.data.allow_encrypted_data_storage,
          user: {
            id: user.id,
            username: user.username,
            photo: user.data.photo,
            name: user.data.name,
          },
        });
      });
    } catch (e) {
      Logs.error(e.message);
    }

    printData.address = address;
    printData.balanceAttoFil = balance;

    Logs.taskTimeless(`\x1b[36m\x1b[1mhttps://slate.host/${user.username}\x1b[0m`);
    Logs.taskTimeless(`\x1b[36m\x1b[1m${address}\x1b[0m`);
    Logs.taskTimeless(`\x1b[36m\x1b[1m${Strings.bytesToSize(userBytes)} stored each deal.\x1b[0m`);
    Logs.taskTimeless(
      `\x1b[36m\x1b[1m${Strings.formatAsFilecoinConversion(balance)} remaining\x1b[0m`
    );

    // NOTE(jim): Anyone can get a list for storage deals from Slate.
    if (WRITE_TO_SLATE_STORAGE_DEAL_INDEX) {
      const hasDealId = (id) => db.raw(`?? @> ?::jsonb`, ["data", JSON.stringify({ dealId: id })]);

      for (let d = 0; d < storageDeals.length; d++) {
        const dealToSave = storageDeals[d];
        Logs.note(`Saving ${dealToSave.dealId} ...`);

        console.log(dealToSave);
        const existing = await db.select("*").from("deals").where(hasDealId(dealToSave.dealId));
        console.log(existing);

        if (existing && !existing.error && existing.length) {
          Logs.error(`${dealToSave.dealId} is already saved.`);
          continue;
        }

        Logs.note(`Inserting ${dealToSave.dealId} ...`);
        await delay(1000);
        await db.insert({ data: dealToSave, owner_user_id: user.id }).into("deals").returning("*");
        Logs.task(`Inserted ${dealToSave.dealId} !!!`);
      }
    }

    // NOTE(jim): Skip users that are out of funds.
    if (balance === 0) {
      Logs.error(`OUT OF FUNDS: ${user.username}`);
      continue;
    }

    // NOTE(jim): tracks all buckets.
    printData.buckets = [];

    for (let j = 0; j < userBuckets.length; j++) {
      const keyBucket = userBuckets[j];
      let key;
      let encrypt;

      if (keyBucket.name.startsWith("open-")) {
        Logs.note(`bucket found: open-data ${keyBucket.key}`);
        Logs.note(`checking size ...`);

        let bucketSizeBytes = null;
        try {
          const path = await buckets.listPath(keyBucket.key, "/");
          bucketSizeBytes = path.item.size;
        } catch (e) {
          Logs.error(e.message);
          continue;
        }

        if (bucketSizeBytes && bucketSizeBytes < MINIMUM_BYTES_FOR_STORAGE) {
          try {
            Logs.error(`we must kill this bucket ...`);
            await buckets.remove(keyBucket.key);
            Logs.note(`bucket removed ...`);
          } catch (e) {
            Logs.error(e.message);
            continue;
          }
        }

        if (bucketSizeBytes && bucketSizeBytes >= MINIMUM_BYTES_FOR_STORAGE) {
          Logs.task(`bucket is okay !!!`);
          key = keyBucket.key;
        }
      }

      if (keyBucket.name.startsWith("encrypted-data-")) {
        Logs.note(`bucket found: encrypted-data ${keyBucket.key}`);
        Logs.note(`checking size ...`);

        let bucketSizeBytes = null;
        try {
          const path = await buckets.listPath(keyBucket.key, "/");
          bucketSizeBytes = path.item.size;
        } catch (e) {
          Logs.error(e.message);
          continue;
        }

        if (bucketSizeBytes && bucketSizeBytes < MINIMUM_BYTES_FOR_STORAGE) {
          try {
            Logs.error(`we must kill this bucket ...`);
            await buckets.remove(keyBucket.key);
            Logs.note(`bucket removed ...`);
          } catch (e) {
            Logs.error(e.message);
            continue;
          }
        }

        if (bucketSizeBytes && bucketSizeBytes >= MINIMUM_BYTES_FOR_STORAGE) {
          Logs.task(`bucket is okay !!!`);
          key = keyBucket.key;
        }
      }

      // NOTE(jim): Temporarily prevent more buckets from being created for legacy accounts.
      if (
        keyBucket.name === "data" &&
        !SKIP_NEW_BUCKET_CREATION &&
        userBuckets.length < BUCKET_LIMIT
      ) {
        key = null;
        encrypt = !!user.data.allow_encrypted_data_storage;

        // NOTE(jim): Create a new bucket
        const newBucketName = encrypt ? `encrypted-data-${uuid()}` : `open-data-${uuid()}`;

        // NOTE(jim): Get the root key of the bucket
        let bucketSizeBytes = null;
        let items;
        try {
          const path = await buckets.listPath(keyBucket.key, "/");
          items = path.item;
          bucketSizeBytes = path.item.size;
        } catch (e) {
          Logs.error(e.message);
        }

        if (bucketSizeBytes && bucketSizeBytes < MINIMUM_BYTES_FOR_STORAGE) {
          Logs.error(`Root 'data' bucket does not fit size requirements. Skipping.`);
          continue;
        }

        await delay(1000);

        Logs.task(`creating new bucket: ${newBucketName}.`);

        // NOTE(jim): Create a new bucket
        try {
          Logs.note(`attempting ... `);

          if (!PRACTICE_RUN) {
            Logs.note(`name: ${newBucketName} ...`);
            Logs.note(`cid: ${items.cid} ...`);
            let newBucket = await buckets.create(newBucketName, encrypt, items.cid);

            key = newBucket.root.key;

            Logs.task(`created ${newBucketName} successfully with new key ${key}.`);
          } else {
            Logs.note(`practice skipping ...`);
            continue;
          }
        } catch (e) {
          Logs.error(e.message);
        }

        await delay(5000);
      }

      if (key) {
        await delay(500);

        try {
          if (!PRACTICE_RUN) {
            await buckets.archive(key);
            Logs.task(`\x1b[32mNEW DEAL SUCCESSFUL !!!\x1b[0m`);
          } else {
            Logs.note(`archive skipping ...`);
          }

          printData.buckets.push({
            key,
            success: false,
          });
        } catch (e) {
          if (e.message === `the same bucket cid is already archived successfully`) {
            printData.buckets.push({
              key,
              success: true,
            });
          } else {
            printData.buckets.push({
              key,
              success: false,
            });
          }

          Logs.note(e.message);
        }
      }
    }

    writable.push(printData);

    for (let k = 0; k < printData.buckets.length; k++) {
      let targetBucket = printData.buckets[k];

      if (targetBucket.success) {
        try {
          Logs.task(`deleting bucket with key: ${targetBucket.key}`);
          await buckets.remove(targetBucket.key);
          Logs.task(`successfully deleted ${targetBucket.key}`);
        } catch (e) {
          Logs.error(e.message);
        }
      }
    }

    console.log("\n");
  }

  Logs.task(`total storage per run: ${Strings.bytesToSize(bytes)}`);
  Logs.task(`total storage per run (with replication x5): ${Strings.bytesToSize(bytes * 5)}`);
  Logs.task(`creating slate-storage-addresses.json`);

  fs.writeFile(
    "slate-storage-addresses.json",
    JSON.stringify(
      {
        rootAddress:
          "t3xhj6odc2cjj3z6kmxqugjjai2unacme65gnwigse4xx6jcpmfmi6jg6miqintibacluxi4ydlmolfpruznba",
        addresses: slateAddresses,
      },
      null,
      2
    ),
    function (e) {
      if (e) return Logs.error(e.message);
    }
  );

  console.log(`${STORAGE_BOT_NAME} finished. \n\n`);
  console.log(`FINISHED: worker-heavy-stones.js`);
  console.log(`          CTRL +C to return to terminal.`);
};

run();
