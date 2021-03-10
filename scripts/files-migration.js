import configs from "~/knexfile";
import knex from "knex";

import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import { user } from "../node_common/serializers";

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

// printUsersTable();
// printSlatesTable();

// MARK: - add/modify tables

const addTables = async () => {
  await db.schema.createTable("files", function (table) {
    table.uuid("id").primary().unique().notNullable().defaultTo(db.raw("uuid_generate_v4()"));
    table.foreign("ownerId").references("users.id"); //.notNullable();
    table.timestamp("date").notNullable().defaultTo(db.raw("now()"));
    table.string("cid").notNullable();
    table.boolean("public").nullable().defaultTo(false);
    table.jsonb("data").nullable();
  });

  await db.schema.createTable("slate_files", function (table) {
    table.uuid("id").primary().unique().notNullable().defaultTo(db.raw("uuid_generate_v4()"));
    table.foreign("fileId").references("files.id"); //.notNullable();
    table.foreign("slateId").references("slates.id"); //.notNullable();
    table.timestamp("date").notNullable().defaultTo(db.raw("now()"));
  });

  await db.schema.createTable("slate_subscriptions", function (table) {
    table.uuid("id").primary().unique().notNullable().defaultTo(db.raw("uuid_generate_v4()"));
    table.foreign("ownerId").references("users.id"); //.notNullable();
    table.foreign("slateId").references("slates.id"); //.notNullable();
    table.timestamp("date").notNullable().defaultTo(db.raw("now()"));
  });

  await db.schema.createTable("user_subscriptions", function (table) {
    table.uuid("id").primary().unique().notNullable().defaultTo(db.raw("uuid_generate_v4()"));
    table.foreign("ownerId").references("users.id"); //.notNullable();
    table.foreign("userId").references("users.id"); //.notNullable();
    table.timestamp("date").notNullable().defaultTo(db.raw("now()"));
  });

  await db.schema.createTable("new_activity", function (table) {
    table.uuid("id").primary().unique().notNullable().defaultTo(db.raw("uuid_generate_v4()"));
    table.foreign("ownerId").references("users.id"); //.notNullable();
    table.foreign("userId").references("users.id");
    table.foreign("slateId").references("slates.id");
    table.foreign("fileId").references("files.id");
    table.string("type");
    table.timestamp("date").notNullable().defaultTo(db.raw("now()"));
  });

  await db.schema.table("slates", function (table) {
    table.foreign("ownerId").references("users.id");
  });
};

// MARK: - populate new tables

const migrateUsersTable = async (testing = false) => {
  const users = await Data.getEveryUser(false);
  let count = 0;
  for (let user of users) {
    if (user.data.library) {
      if (user.data?.library[0]?.children?.length) {
        let library = user.data.library[0].children;
        let files = [];
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
          let newFile = {
            id: file.id,
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
              unityGameConfig: file.unityGameConfig,
              unityGameLoader: file.unityGameLoader,
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
          files.append(newFile);
        }

        if (testing) {
          console.log(files);
          if (count >= 10) {
            return;
          }
        } else {
          await db.insert(files).into("files");
        }
      }
    }
    count += 1;
  }
};

const migrateSlatesTable = async (testing = false) => {
  const slates = await Data.getEverySlate(false);
  let count = 0;
  for (let slate of slates) {
    let objects = [];
    if (slate.data.objects) {
      for (let file of slate.data.objects) {
        if (
          file.name !== file.title ||
          !Strings.isEmpty(file.body) ||
          !Strings.isEmpty(file.source) ||
          !Strings.isEmpty(file.author)
        ) {
          await db
            .from("files")
            .where("id", file.id)
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
          objects.push({ fileId: file.id, slateId: slate.id });
        } else {
          await db.insert({ fileId: file.id, slateId: slate.id }).into("slate_files");
        }
      }
    }
    if (testing) {
      if (count >= 10) {
        return;
      }
      console.log(objects);
      count += 1;
    }
  }
};

const migrateSubscriptionsTable = async (testing = false) => {
  const query = await db.select("*").from("subscriptions");
  const subscriptions = JSON.parse(JSON.stringify(query));
  let slateSubscriptions = [];
  let userSubscriptions = [];
  let count = 0;
  for (let sub of subscriptions) {
    if (sub.target_user_id) {
      userSubscriptions.append({
        id: sub.id,
        date: sub.created_at,
        ownerId: sub.owner_user_id,
        userId: sub.target_user_id,
      });
    } else if (sub.target_slate_id) {
      slateSubscriptions.append({
        id: sub.id,
        date: sub.created_at,
        ownerId: sub.owner_user_id,
        slateId: sub.target_slate_id,
      });
    }

    if (testing) {
      if (count === 10) {
        console.log(slateSubscriptions);
        console.log(userSubscriptions);
        return;
      }
      count += 1;
    }
  }
  if (!testing) {
    await db.insert(slateSubscriptions).into("slate_subscriptions");
    await db.insert(userSubscriptions).into("user_subscriptions");
  }
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
  let newActivity = [];
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
      slateId = event.data.context.slate.id;
    } else if (type === "CREATE_SLATE_OBJECT") {
      slateId = event.data.context.slate.id;
      fileId = event.data.context.file.id;
    } else if (type === "SUBSCRIBE_USER") {
      userId = event.data.context.targetUserId;
    } else if (type === "SUBSCRIBE_SLATE") {
      slateId = event.data.context.slateId;
    }
    newActivity.append({
      id,
      ownerId,
      userId,
      slateId,
      fileId,
      type,
      date,
    });

    if (testing) {
      if (count === 10) {
        console.log(newActivity);
        return;
      }
      count += 1;
    }
  }
  if (!testing) {
    await db.insert(newActivity).into("new_activity");
  }
};

// MARK: - undo changes if there's an issue

const undoChanges = async () => {
  await Promise.all([
    db.schema.dropTable("files"),
    db.schema.dropTable("slate_files"),
    db.schema.dropTable("slate_subscriptions"),
    db.schema.dropTable("user_subscriptions"),
    db.schema.dropTable("new_activity"),
  ]);
};

// MARK: - adding new fields and reformatting

const modifySlatesTable = async () => {
  const slates = await Data.getEverySlate(false);
  for (let slate of slates) {
    const id = slate.id;
    const ownerId = slate.data.ownerId;
    await db.from("slates").where("id", id).update({ ownerId });
  }
};

const modifyUsersTable = async () => {
  const users = await Data.getEveryUser(false);
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
    let response = await Data.updateUserById({ id, data });
  }
};

// MARK: - removing original data source

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

// MARK: - table deletions and adjustments

const dropOldTables = async () => {
  await Promise.all([
    db.schema.dropTable("activity"),
    db.schema.dropTable("trusted"),
    db.schema.dropTable("subscriptions"),
  ]);

  await db.schema.alterTable("slates", function (table) {
    table.foreign("ownerId").references("users.id").notNullable().alter();
  });

  await db.schema.renameTable("new_activity", "activity");
};

// MARK: - post-migration table deletions

const runScript = () => {
  addTables();

  // migrateUsersTable()
  // migrateSlatesTable()
  // migrateSubscriptionsTable()
  // migrateActivityTable()

  // undoChanges()

  // modifySlatesTable()
  // modifyUsersTable()

  // cleanUsersTable()
  // cleanSlatesTable()

  // dropOldTables()
};

runScript();
