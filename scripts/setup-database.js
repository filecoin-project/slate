import configs from '~/knexfile';
import knex from 'knex';

const environment =
  process.env.NODE_ENV !== 'local-production' ? 'development' : 'production';
const envConfig = configs[environment];

console.log(`SETUP: database`, envConfig);

const db = knex(envConfig);

console.log(`RUNNING: setup-database.js NODE_ENV=${environment}`);

Promise.all([db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')]);

console.log(`FINISHED: setup-database.js NODE_ENV=${environment}`);
