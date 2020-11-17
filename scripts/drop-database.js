import configs from "~/knexfile";
import knex from "knex";

const envConfig = configs["development"];

console.log(`SETUP: database`, envConfig);

const db = knex(envConfig);

console.log(`RUNNING:  drop-database.js`);

Promise.all([
  db.schema.dropTable("users"),
  db.schema.dropTable("slates"),
  db.schema.dropTable("keys"),
  db.schema.dropTable("stats"),
  db.schema.dropTable("orphans")
]);

console.log(`FINISHED: drop-database.js`);
console.log(`          CTRL +C to return to terminal.`);
