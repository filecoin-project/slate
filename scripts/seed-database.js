import configs from "~/knexfile";
import knex from "knex";

const envConfig = configs["development"];

console.log(`SETUP: database`, envConfig);

const db = knex(envConfig);

console.log(`RUNNING: seed-database.js`);

// --------------------------
// SCRIPTS
// --------------------------

const createUsersTable = db.schema.createTable("users", function(table) {
  table
    .uuid("id")
    .primary()
    .unique()
    .notNullable()
    .defaultTo(db.raw("uuid_generate_v4()"));

  table
    .timestamp("created_at")
    .notNullable()
    .defaultTo(db.raw("now()"));

  table
    .timestamp("updated_at")
    .notNullable()
    .defaultTo(db.raw("now()"));

  table
    .string("username")
    .unique()
    .notNullable();

  table.string("password").nullable();
  table.string("salt").nullable();
  table.jsonb("data").nullable();
});

const createSlatesTable = db.schema.createTable("slates", function(table) {
  table
    .uuid("id")
    .primary()
    .unique()
    .notNullable()
    .defaultTo(db.raw("uuid_generate_v4()"));

  table
    .timestamp("created_at")
    .notNullable()
    .defaultTo(db.raw("now()"));

  table
    .timestamp("updated_at")
    .notNullable()
    .defaultTo(db.raw("now()"));

  table.timestamp("published_at").nullable();

  table
    .string("slatename")
    .unique()
    .nullable();

  table.jsonb("data").nullable();
});

// --------------------------
// RUN
// --------------------------

Promise.all([createUsersTable, createSlatesTable]);

console.log(`FINISHED: seed-database.js`);
console.log(`          CTRL +C to return to terminal.`);
