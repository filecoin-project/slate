import configs from "~/knexfile";
import knex from "knex";

const envConfig = configs["development"];

console.log(`SETUP: database`, envConfig);

const db = knex(envConfig);

console.log(`RUNNING:  seed-database.js`);

// --------------------------
// SCRIPTS
// --------------------------

const createDealsTable = db.schema.createTable("deals", function (table) {
  table.uuid("id").primary().unique().notNullable().defaultTo(db.raw("uuid_generate_v4()"));
  table.string("owner_user_id").nullable();
  table.jsonb("data").nullable();
  table.timestamp("created_at").notNullable().defaultTo(db.raw("now()"));
  table.timestamp("updated_at").notNullable().defaultTo(db.raw("now()"));
});

const createUsersTable = db.schema.createTable("users", function (table) {
  table.uuid("id").primary().unique().notNullable().defaultTo(db.raw("uuid_generate_v4()"));
  table.timestamp("created_at").notNullable().defaultTo(db.raw("now()"));
  table.timestamp("updated_at").notNullable().defaultTo(db.raw("now()"));
  table.string("username").unique().notNullable();
  table.string("password").nullable();
  table.string("salt").nullable();
  table.jsonb("data").nullable();
});

const createSlatesTable = db.schema.createTable("slates", function (table) {
  table.uuid("id").primary().unique().notNullable().defaultTo(db.raw("uuid_generate_v4()"));
  table.uuid("ownerId").references("id").inTable("users");
  table.timestamp("created_at").notNullable().defaultTo(db.raw("now()"));
  table.timestamp("updated_at").notNullable().defaultTo(db.raw("now()"));
  table.timestamp("published_at").nullable();
  table.string("slatename").nullable();
  table.jsonb("data").nullable();
});

const createKeysTable = db.schema.createTable("keys", function (table) {
  table.uuid("id").primary().unique().notNullable().defaultTo(db.raw("uuid_generate_v4()"));
  table.string("key").unique().nullable();
  table.uuid("owner_id").notNullable();
  table.integer("level").defaultTo(0);
  table.timestamp("created_at").notNullable().defaultTo(db.raw("now()"));
});

const createFilesTable = await db.schema.createTable("files", function (table) {
  table.uuid("id").primary().unique().notNullable().defaultTo(db.raw("uuid_generate_v4()"));
  table.uuid("ownerId").references("id").inTable("users");
  table.timestamp("date").notNullable().defaultTo(db.raw("now()"));
  table.string("cid").notNullable();
  table.boolean("public").nullable().defaultTo(false);
  table.jsonb("data").nullable();
});

const createSlateFilesTable = await db.schema.createTable("slate_files", function (table) {
  table.uuid("id").primary().unique().notNullable().defaultTo(db.raw("uuid_generate_v4()"));
  table.uuid("fileId").references("id").inTable("files");
  table.uuid("slateId").references("id").inTable("slates");
  table.timestamp("date").notNullable().defaultTo(db.raw("now()"));
});

const createSubscriptionsTable = await db.schema.createTable(
  "slate_subscriptions",
  function (table) {
    table.uuid("id").primary().unique().notNullable().defaultTo(db.raw("uuid_generate_v4()"));
    table.uuid("ownerId").references("id").inTable("users");
    table.uuid("slateId").references("id").inTable("slates");
    table.uuid("userId").references("id").inTable("users");
    table.jsonb("data").nullable();
    table.timestamp("date").notNullable().defaultTo(db.raw("now()"));
  }
);

const createActivityTable = await db.schema.createTable("activity", function (table) {
  table.uuid("id").primary().unique().notNullable().defaultTo(db.raw("uuid_generate_v4()"));
  table.uuid("ownerId").references("id").inTable("users");
  table.uuid("userId").references("id").inTable("users");
  table.uuid("slateId").references("id").inTable("slates");
  table.uuid("fileId").references("id").inTable("files");
  table.string("type");
  table.timestamp("date").notNullable().defaultTo(db.raw("now()"));
});

const createPendingTable = db.schema.createTable("pending", function (table) {
  table.uuid("id").primary().unique().notNullable().defaultTo(db.raw("uuid_generate_v4()"));
  table.string("owner_user_id").notNullable();
  table.jsonb("data").nullable();
  table.timestamp("created_at").notNullable().defaultTo(db.raw("now()"));
});

const createStatsTable = db.schema.createTable("stats", function (table) {
  table.uuid("id").primary().unique().notNullable().defaultTo(db.raw("uuid_generate_v4()"));
  table.jsonb("data").nullable();
  table.timestamp("created_at").notNullable().defaultTo(db.raw("now()"));
});

const createOrphansTable = db.schema.createTable("orphans", function (table) {
  table.uuid("id").primary().unique().notNullable().defaultTo(db.raw("uuid_generate_v4()"));
  table.jsonb("data").nullable();
  table.timestamp("created_at").notNullable().defaultTo(db.raw("now()"));
});

const createGlobalTable = db.schema.createTable("global", function (table) {
  table.uuid("id").primary().unique().notNullable().defaultTo(db.raw("uuid_generate_v4()"));
  table.jsonb("data").nullable();
  table.timestamp("created_at").notNullable().defaultTo(db.raw("now()"));
});

// --------------------------
// RUN
// --------------------------

Promise.all([
  createDealsTable,
  createUsersTable,
  createSlatesTable,
  createKeysTable,
  createFilesTable,
  createSlateFilesTable,
  createSubscriptionsTable,
  createActivityTable,
  createPendingTable,
  createStatsTable,
  createOrphansTable,
  createGlobalTable,
]);

console.log(`FINISHED: seed-database.js`);
console.log(`          CTRL +C to return to terminal.`);
