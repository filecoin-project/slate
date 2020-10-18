import configs from "~/knexfile";
import knex from "knex";

const envConfig = configs["development"];

console.log(`SETUP: database`, envConfig);

const db = knex(envConfig);

console.log(`RUNNING:  adjust.js`);

const createDealsTable = db.schema.createTable("deals", function (table) {
  table.uuid("id").primary().unique().notNullable().defaultTo(db.raw("uuid_generate_v4()"));
  table.string("owner_user_id").nullable();
  table.jsonb("data").nullable();
  table.timestamp("created_at").notNullable().defaultTo(db.raw("now()"));
  table.timestamp("updated_at").notNullable().defaultTo(db.raw("now()"));
});

Promise.all([createDealsTable]);

console.log(`FINISHED: adjust.js`);
console.log(`          CTRL +C to return to terminal.`);
