import * as Environment from "~/node_common/environment";

module.exports = {
  development: {
    client: "pg",
    connection: {
      ssl: true,
      port: 5432,
      host: Environment.POSTGRES_HOSTNAME,
      database: Environment.POSTGRES_DATABASE,
      user: Environment.POSTGRES_ADMIN_USERNAME,
      password: Environment.POSTGRES_ADMIN_PASSWORD,
    },
  },
  production: {
    client: "pg",
    connection: {
      ssl: true,
      port: 5432,
      host: Environment.POSTGRES_HOSTNAME,
      database: Environment.POSTGRES_DATABASE,
      user: Environment.POSTGRES_ADMIN_USERNAME,
      password: Environment.POSTGRES_ADMIN_PASSWORD,
    },
  },
};
