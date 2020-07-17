module.exports = {
  development: {
    client: "pg",
    connection: {
      ssl: true,
      port: 5432,
      host: process.env.POSTGRES_HOSTNAME,
      database: process.env.POSTGRES_DATABASE,
      user: process.env.POSTGRES_ADMIN_USERNAME,
      password: process.env.POSTGRES_ADMIN_PASSWORD,
    },
  },
};
