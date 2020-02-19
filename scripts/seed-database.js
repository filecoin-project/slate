import configs from '~/knexfile';
import knex from 'knex';

const environment =
  process.env.NODE_ENV !== 'local-production' ? 'development' : 'production';
const envConfig = configs[environment];

console.log(`SETUP: database`, envConfig);

const db = knex(envConfig);

console.log(`RUNNING: seed-database.js NODE_ENV=${environment}`);

// --------------------------
// SCRIPTS
// --------------------------

const createUserTable = db.schema.createTable('users', function(table) {
  table
    .uuid('id')
    .primary()
    .unique()
    .notNullable()
    .defaultTo(db.raw('uuid_generate_v4()'));

  table
    .timestamp('created_at')
    .notNullable()
    .defaultTo(db.raw('now()'));

  table
    .timestamp('updated_at')
    .notNullable()
    .defaultTo(db.raw('now()'));

  table
    .string('email')
    .unique()
    .notNullable();

  table.string('password').nullable();
  table.string('salt').nullable();
  table.jsonb('data').nullable();
});

// --------------------------
// RUN
// --------------------------

Promise.all([createUserTable]);

console.log(`FINISHED: seed-database.js NODE_ENV=${environment}`);
