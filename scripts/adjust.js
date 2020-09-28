import configs from "~/knexfile";
import knex from "knex";

const envConfig = configs["development"];

console.log(`SETUP: database`, envConfig);

const db = knex(envConfig);

console.log(`RUNNING:  adjust.js`);

const dropSlatenameUnique = db.schema.table("slates", function(table) {
  table.dropUnique("slatename");
});

Promise.all([dropSlatenameUnique]);

console.log(`FINISHED: adjust.js`);
console.log(`          CTRL +C to return to terminal.`);
