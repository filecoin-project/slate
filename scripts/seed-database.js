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

const createSubscriptionTable = db.schema.createTable("subscriptions", function (table) {
  table.uuid("id").primary().unique().notNullable().defaultTo(db.raw("uuid_generate_v4()"));
  table.string("owner_user_id").nullable();
  table.string("target_slate_id").nullable();
  table.string("target_user_id").nullable();
  table.jsonb("data").nullable();
  table.timestamp("created_at").notNullable().defaultTo(db.raw("now()"));
});

const createTrustedTable = db.schema.createTable("trusted", function (table) {
  table.uuid("id").primary().unique().notNullable().defaultTo(db.raw("uuid_generate_v4()"));
  table.string("owner_user_id").nullable();
  table.string("target_user_id").nullable();
  table.jsonb("data").nullable();
  table.timestamp("created_at").notNullable().defaultTo(db.raw("now()"));
});

const createActivityTable = db.schema.createTable("activity", function (table) {
  table.uuid("id").primary().unique().notNullable().defaultTo(db.raw("uuid_generate_v4()"));
  table.string("owner_slate_id").nullable();
  table.string("owner_user_id").nullable();
  table.jsonb("data").nullable();
  table.timestamp("created_at").notNullable().defaultTo(db.raw("now()"));
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
  createSubscriptionTable,
  createActivityTable,
  createTrustedTable,
  createPendingTable,
  createStatsTable,
  createOrphansTable,
  createGlobalTable,
]);

console.log(`FINISHED: seed-database.js`);
console.log(`          CTRL +C to return to terminal.`);
