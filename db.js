if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

import configs from '~/knexfile';
import knex from 'knex';

const environment =
  process.env.NODE_ENV !== 'production' ? 'development' : 'production';
const envConfig = configs[environment];
const db = knex(envConfig);

module.exports = db;
