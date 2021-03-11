import configs from "~/knexfile";
import knex from "knex";
import { v4 as uuid } from "uuid";

import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";

const envConfig = configs["development"];

const db = knex(envConfig);

console.log(`RUNNING:  files-migration.js`);

// MARK: - check what parameters are in each table

const printUsersTable = async () => {
  const users = await Data.getEveryUser(false);
  let dataParams = {};
  let fileParams = {};
  let coverParams = {};
  for (let user of users) {
    for (let param of Object.keys(user.data)) {
      if (!dataParams[param]) {
        dataParams[param] = true;
      }
    }
    if (user.data?.library[0]?.children?.length) {
      let library = user.data.library[0].children;
      for (let file of library) {
        for (let param of Object.keys(file)) {
          if (!fileParams[param]) {
            fileParams[param] = true;
          }
        }
        if (file.coverImage) {
          for (let param of Object.keys(file.coverImage)) {
            if (!coverParams[param]) {
              coverParams[param] = true;
            }
          }
        }
      }
    }
  }
  console.log(Object.keys(dataParams));
  console.log(Object.keys(fileParams));
  console.log(Object.keys(coverParams));
};

const printSlatesTable = async () => {
  const slates = await Data.getEverySlate(false);
  let dataParams = {};
  let fileParams = {};
  let coverParams = {};
  for (let slate of slates) {
    for (let param of Object.keys(slate.data)) {
      if (!dataParams[param]) {
        dataParams[param] = true;
      }
    }
    if (slate.data.objects?.length) {
      let objects = slate.data.objects;
      for (let file of objects) {
        for (let param of Object.keys(file)) {
          if (!fileParams[param]) {
            fileParams[param] = true;
          }
        }
        if (file.coverImage) {
          for (let param of Object.keys(file.coverImage)) {
            if (!coverParams[param]) {
              coverParams[param] = true;
            }
          }
        }
      }
    }
  }
  console.log(Object.keys(dataParams));
  console.log(Object.keys(fileParams));
  console.log(Object.keys(coverParams));
};

// MARK: - add/modify tables

const addTables = async () => {
  await db.schema.createTable("files", function (table) {
    table.uuid("id").primary().unique().notNullable().defaultTo(db.raw("uuid_generate_v4()"));
    table.uuid("ownerId").references("id").inTable("users");
    table.timestamp("date").notNullable().defaultTo(db.raw("now()"));
    table.string("cid").notNullable();
    table.boolean("public").nullable().defaultTo(false);
    table.jsonb("data").nullable();
  });

  await db.schema.createTable("slate_files", function (table) {
    table.uuid("id").primary().unique().notNullable().defaultTo(db.raw("uuid_generate_v4()"));
    table.uuid("fileId").references("id").inTable("files");
    table.uuid("slateId").references("id").inTable("slates");
    table.timestamp("date").notNullable().defaultTo(db.raw("now()"));
  });

  await db.schema.createTable("new_activity", function (table) {
    table.uuid("id").primary().unique().notNullable().defaultTo(db.raw("uuid_generate_v4()"));
    table.uuid("ownerId").references("id").inTable("users");
    table.uuid("userId").references("id").inTable("users");
    table.uuid("slateId").references("id").inTable("slates");
    table.uuid("fileId").references("id").inTable("files");
    table.string("type");
    table.timestamp("date").notNullable().defaultTo(db.raw("now()"));
  });

  await db.schema.table("slates", function (table) {
    table.dropColumn("published_at");
    table.uuid("ownerId").references("id").inTable("users");
  });

  await db.schema.table("subscriptions", function (table) {
    table.renameColumn("created_at", "date");
    table.renameColumn("owner_user_id", "ownerId");
    table.renameColumn("target_slate_id", "slateId");
    table.renameColumn("target_user_id", "userId");
  });

  await db.schema.table("subscriptions", function (table) {
    table.uuid("ownerId").references("id").inTable("users").alter();
    table.uuid("slateId").references("id").inTable("slates").alter();
    table.uuid("userId").references("id").inTable("users").alter();
  });

  console.log("finished adding tables");
};

// MARK: - populate new tables

//strip out the "data-" in the id so it can be a uuid
//if there's a file with that id already existing, this is probably a save copy instance. So give this one a new id
//when matching slate fiels to files, if you can't find it by id, match it by cid and ownerId. should only be one match.

const migrateUsersTable = async (testing = false) => {
  const users = await Data.getEveryUser(false);
  let count = 0;
  for (let user of users) {
    if (user.data.library) {
      if (user.data?.library[0]?.children?.length) {
        let library = user.data.library[0].children;
        for (let file of library) {
          let cid;
          if (file.cid) {
            cid = file.cid;
          } else if (file.ipfs.includes("/ipfs/")) {
            cid = Strings.getCIDFromIPFS(file.ipfs);
          } else {
            cid = file.ipfs;
          }
          if (!cid) {
            console.log("file does not have cid or ipfs");
            console.log(file);
            return;
          }
          let id = file.id.replace("data-", "");
          let duplicates = await db.select("*").from("files").where({ cid: cid, ownerId: user.id });
          if (duplicates.length) {
            console.log(`skipped duplicate cid ${cid} in user ${user.id} ${user.username} files`);
            continue;
          }
          let conflicts = await db.select("*").from("files").where("id", id);
          if (conflicts.length) {
            console.log("found conflicting id from saved copy");
            id = uuid();
          }
          let newFile = {
            id,
            ownerId: user.id,
            cid,
            public: file.public,
            date: file.date,
            data: {
              name: file.name,
              file: file.file,
              blurhash: file.blurhash,
              size: file.size,
              type: file.type,
              unity:
                file.unityGameConfig || file.unityGameLoader
                  ? {
                      config: file.unityGameConfig,
                      loader: file.unityGameLoader,
                    }
                  : null,
            },
          };
          if (file.coverImage) {
            let coverImage = file.coverImage;
            let newCoverImage = {
              id: coverImage.id,
              cid: coverImage.cid,
              date: coverImage.date,
              data: {
                name: coverImage.name,
                file: coverImage.file,
                blurhash: coverImage.blurhash,
                size: coverImage.size,
                type: coverImage.type,
              },
            };
            newFile.data.coverImage = newCoverImage;
          }
          await db.insert(newFile).into("files");
        }
        if (testing) {
          //   console.log(files);
          //   if (count >= 10) {
          //     return;
          //   }
        }
      }
    }
    count += 1;
  }
  console.log("finished migrating users table");
};

const migrateSlatesTable = async (testing = false) => {
  const slates = await Data.getEverySlate(false);
  let count = 0;
  for (let slate of slates) {
    let objects = [];
    if (slate.data.objects) {
      for (let file of slate.data.objects) {
        let fileId = file.id.replace("data-", "");
        let cid = Strings.urlToCid(file.url);
        //NOTE(martina): skip duplicates of the same cid in a slate
        let duplicates = await db
          .select("id")
          .from("slate_files")
          .where({ fileId: fileId, slateId: slate.id });
        if (duplicates.length) {
          continue;
        }
        let matches = await db
          .select("id")
          .from("files")
          .where({ id: fileId, cid: cid, ownerId: file.ownerId });
        if (matches.length !== 1) {
          //NOTE(martina): means that the id was changed b/c there was a saved copy somewhere, so we need to get that new id
          matches = await db.select("*").from("files").where({ cid: cid, ownerId: file.ownerId });
          if (matches.length === 1) {
            //NOTE(martina): repairing the file id in the event it was changed in migrateUsersTable because it was a save copy and needed a unique id or b/c was a duplicate file and consolidated
            console.log(
              `repaired id for save copy for cid ${cid} in user ${file.ownerId} files in slate ${slate.id} ${slate.slatename}`
            );
            fileId = matches.pop().id;
          } else {
            console.log(
              `something went wrong repairing save copy id. there were ${matches.length} matching files with cid ${cid} and ownerId ${file.ownerId}`
            );
            console.log(matches);
            continue;
          }
        }
        if (
          !testing &&
          slate.data.ownerId === file.ownerId &&
          (file.name !== file.title ||
            !Strings.isEmpty(file.body) ||
            !Strings.isEmpty(file.source) ||
            !Strings.isEmpty(file.author))
        ) {
          await db
            .from("files")
            .where("id", fileId)
            .update({
              data: {
                name: file.title,
                body: file.body,
                source: file.source,
                author: file.author,
              },
            });
        }
        if (testing) {
          objects.push({ fileId: fileId, slateId: slate.id });
        } else {
          await db.insert({ fileId: fileId, slateId: slate.id }).into("slate_files");
        }
      }
    }
    // if (testing) {
    //   if (count >= 10) {
    //     return;
    //   }
    //   console.log(objects);
    //   count += 1;
    // }
  }
  console.log("finished migrating slates table");
};

/*
    "CREATE_SLATE" - owner, slate
    "CREATE_SLATE_OBJECT" - owner, slate, file
    "CREATE_USER" - owner
    "USER_DEAL" - owner
    "SUBSCRIBE_USER" - owner, user
    "SUBSCRIBE_SLATE" - owner, slate
*/
const migrateActivityTable = async (testing = false) => {
  let acceptedTypes = [
    "CREATE_SLATE",
    "CREATE_SLATE_OBJECT",
    "CREATE_USER",
    "USER_DEAL",
    "SUBSCRIBE_USER",
    "SUBSCRIBE_SLATE",
  ];
  const query = await db.select("*").from("activity");
  const activity = JSON.parse(JSON.stringify(query));
  let count = 0;
  for (let event of activity) {
    let type = event.data.type;
    if (!acceptedTypes.includes(type)) {
      continue;
    }
    const { date, id } = event;
    let ownerId = event.data.actorUserId;
    let userId, slateId, fileId;
    if (type === "CREATE_SLATE") {
      slateId = event.data.context?.slate?.id;
      if (!slateId) {
        // console.log(event.data);
        continue;
      }
    } else if (type === "CREATE_SLATE_OBJECT") {
      slateId = event.data.context?.slate?.id;
      fileId = event.data.context?.file?.id;
      if (!slateId || !fileId) {
        // console.log(event.data);
        continue;
      }
      fileId = fileId.replace("data-", "");
    } else if (type === "SUBSCRIBE_USER") {
      userId = event.data.context?.targetUserId;
      if (!userId) {
        // console.log(event.data);
        continue;
      }
    } else if (type === "SUBSCRIBE_SLATE") {
      slateId = event.data.context?.slateId;
      if (!slateId) {
        // console.log(event.data);
        continue;
      }
    }
    if (!testing) {
      try {
        await db
          .insert({
            id,
            ownerId,
            userId,
            slateId,
            fileId,
            type,
            date,
          })
          .into("new_activity");
      } catch (e) {
        console.log(e);
      }
    }

    if (testing) {
      if (count === 10) {
        return;
      }
      count += 1;
    }
  }
  console.log("finished migrating activity table");
};

// MARK: - adding new fields and reformatting

const modifySlatesTable = async (testing = false) => {
  const slates = await Data.getEverySlate(false);
  for (let slate of slates) {
    const id = slate.id;
    const ownerId = slate.data.ownerId;
    if (!ownerId) {
      console.log(slate);
      continue;
    }
    if (!testing) {
      await db.from("slates").where("id", id).update({ ownerId });
    }
  }
  console.log("finished modify slates table");
};

const modifyUsersTable = async (testing = false) => {
  const users = await Data.getEveryUser(false);
  let count = 0;
  for (let user of users) {
    const id = user.id;
    let data = {
      photo: user.data.photo,
      body: user.data.body,
      name: user.data.name,
      tokens: user.data.tokens,
      settings: {
        allow_automatic_data_storage: user.data.allow_automatic_data_storage,
        allow_encrypted_data_storage: user.data.allow_encrypted_data_storage,
        allow_filecoin_directory_listing: user.data.allow_filecoin_directory_listing,
        settings_deals_auto_approve: user.data.settings_deals_auto_approve,
      },
      onboarding: user.data.onboarding,
      status: user.data.status,
      library: user.data.library,
    };
    if (testing) {
      if (count === 10) {
        return;
      }
      console.log(data);
    } else {
      await Data.updateUserById({ id, data });
    }
  }
  console.log("finished modify users table");
};

// MARK: - deleting original data source

const cleanUsersTable = async () => {
  const users = await Data.getEveryUser(false);
  for (let user of users) {
    const id = user.id;
    let data = user.data;
    delete user.data.library;
    let response = await Data.updateUserById({ id, data });
  }
};

const cleanSlatesTable = async () => {
  const slates = await Data.getEverySlate(false);
  for (let slate of slates) {
    const id = slate.id;
    let data = slate.data;
    delete data.ownerId;
    await db.from("slates").where("id", id).update({ data });
  }
};

const dropOldTables = async () => {
  await Promise.all([db.schema.dropTable("activity"), db.schema.dropTable("trusted")]);

  await db.schema.renameTable("new_activity", "activity");
};

// MARK: - post-migration table deletions

const runScript = async () => {
  //NOTE(martina): if make a mistake
  //   let numDeleted = await db("files").del();
  //   console.log(numDeleted);

  //NOTE(martina): before starting, make sure you have all the parameters accounted for
  //   await printUsersTable()
  //   await printSlatesTable()

  //NOTE(martina): add tables
  //   await addTables();

  //NOTE(martina): put data into new tables
  let testing = false;
  //   await migrateUsersTable(testing);
  //   await migrateSlatesTable(testing);
  //   await migrateActivityTable(testing);

  //NOTE(martina): fill in new fields and reformat
  //   await modifySlatesTable(testing);
  //   await modifyUsersTable(testing);

  //NOTE(martina): once certain you don't need the data anymore, delete the original data
  // await cleanUsersTable()
  // await cleanSlatesTable()
  // await dropOldTables()
};

runScript();
