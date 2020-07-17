if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

import configs from "~/knexfile";
import knex from "knex";

const envConfig = configs["development"];
const Database = knex(envConfig);

export default Database;
