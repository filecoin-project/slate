import configs from "~/knexfile";
import knex from "knex";

const envConfig = configs["development"];

console.log(`SETUP: database`, envConfig);

const db = knex(envConfig);

console.log(`RUNNING: drop-database.js`);

Promise.all([db.schema.dropTable("users"), db.schema.dropTable("slates")]);

console.log(`FINISHED: drop-database.js`);
console.log(`          CTRL +C to return to terminal.`);
