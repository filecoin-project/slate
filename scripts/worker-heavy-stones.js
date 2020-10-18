import fs from "fs-extra";

import * as Environment from "~/node_common/environment";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as Strings from "~/common/strings";
import * as Logs from "~/node_common/script-logging";

import { Buckets, PrivateKey } from "@textile/hub";
import { v4 as uuid } from "uuid";

// 50 MB minimum
const MINIMUM_BYTES_FOR_STORAGE = 52428800;
const STORAGE_BOT_NAME = "STORAGE WORKER";
const PRACTICE_RUN = false;
const SKIP_NEW_BUCKET_CREATION = true;
const STORE_MEANINGFUL_ADDRESS_ONLY_AND_PERFORM_NO_ACTIONS = false;

const TEXTILE_KEY_INFO = {
  key: Environment.TEXTILE_HUB_KEY,
  secret: Environment.TEXTILE_HUB_SECRET,
};

console.log(`RUNNING:  worker-heavy-stones.js`);

const delay = async (waitMs) => {
  return await new Promise((resolve) => setTimeout(resolve, waitMs));
};

const run = async () => {
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

    await delay(5000);

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

    await delay(5000);

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
          miner: o.dealInfo.miner,
          size: o.dealInfo.size,
          // NOTE(jim): formatted size.
          formattedSize: Strings.bytesToSize(o.dealInfo.size),
          pricePerEpoch: o.dealInfo.pricePerEpoch,
          startEpoch: o.dealInfo.startEpoch,
          // NOTE(jim): just for point of reference on the total cost.
          totalSpeculatedCost: Strings.formatAsFilecoinConversion(
            o.dealInfo.pricePerEpoch * o.dealInfo.duration
          ),
          duration: o.dealInfo.duration,
          activationEpoch: o.dealInfo.activationEpoch,
          time: o.time,
          pending: o.pending,
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

    console.log(storageDeals);

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
        key = keyBucket.key;
      }

      if (keyBucket.name.startsWith("encrypted-data-")) {
        Logs.note(`bucket found: encrypted-data ${keyBucket.key}`);
        key = keyBucket.key;
      }

      if (keyBucket.name === "data" && !SKIP_NEW_BUCKET_CREATION) {
        key = null;
        encrypt = !!user.data.allow_encrypted_data_storage;

        // NOTE(jim): Create a new bucket
        const newBucketName = encrypt ? `encrypted-data-${uuid()}` : `open-data-${uuid()}`;

        // NOTE(jim): Get the root key of the bucket
        let items;
        try {
          const path = await buckets.listPath(keyBucket.key, "/");
          items = path.item;
        } catch (e) {
          Logs.error(e.message);
        }

        Logs.task(`creating new bucket: ${newBucketName}.`);

        // NOTE(jim): Create a new bucket
        try {
          Logs.note(`attempting ...`);

          if (!PRACTICE_RUN) {
            let newBucket = await buckets.create(newBucketName, encrypt, items.cid);

            key = newBucket.root.key;

            Logs.task(`created ${newBucketName} successfully.`);
          } else {
            Logs.note(`practice skipping ...`);
          }
        } catch (e) {
          Logs.error(e.message);
        }
      }

      if (key) {
        await delay(5000);

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
