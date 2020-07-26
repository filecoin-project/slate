import configs from "~/knexfile";
import knex from "knex";

const envConfig = configs["development"];

console.log(`SETUP: database`, envConfig);

const db = knex(envConfig);

console.log(`RUNNING: seed-database.js`);

/*
const u = db.schema.table("slates", function(table) {
  table
    .integer("slatename")
    .unique()
    .nullable();
});
*/

Promise.all([]);

console.log(`FINISHED: seed-database.js`);
console.log(`          CTRL +C to return to terminal.`);
