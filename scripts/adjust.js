import configs from "~/knexfile";
import knex from "knex";

const envConfig = configs["development"];

console.log(`SETUP: database`, envConfig);

const db = knex(envConfig);

console.log(`RUNNING:  adjust.js`);

const createOrphansTable = db.schema.createTable("orphans", function(table) {
  table
    .uuid("id")
    .primary()
    .unique()
    .notNullable()
    .defaultTo(db.raw("uuid_generate_v4()"));
  table.jsonb("data").nullable();
  table
    .timestamp("created_at")
    .notNullable()
    .defaultTo(db.raw("now()"));
});

const createStatsTable = db.schema.createTable("stats", function(table) {
  table
    .uuid("id")
    .primary()
    .unique()
    .notNullable()
    .defaultTo(db.raw("uuid_generate_v4()"));
  table.jsonb("data").nullable();
  table
    .timestamp("created_at")
    .notNullable()
    .defaultTo(db.raw("now()"));
});

Promise.all([createOrphansTable, createStatsTable]);

console.log(`FINISHED: adjust.js`);
console.log(`          CTRL +C to return to terminal.`);
