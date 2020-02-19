import configs from '~/knexfile';
import knex from 'knex';

const environment =
  process.env.NODE_ENV !== 'local-production' ? 'development' : 'production';
const envConfig = configs[environment];

console.log(`SETUP: database`, envConfig);

const db = knex(envConfig);

console.log(`RUNNING: drop-database.js NODE_ENV=${environment}`);

// --------------------------
// SCRIPTS
// --------------------------

const dropUserTable = db.schema.dropTable('users');

// --------------------------
// RUN
// --------------------------

Promise.all([dropUserTable]);

console.log(`FINISHED: drop-database.js NODE_ENV=${environment}`);
