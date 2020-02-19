/* prettier-ignore */
module.exports = {
  development: {
    client: 'pg',
    connection: {
      port: 1334,
      host: '127.0.0.1',
      database: 'nptdb',
      user: 'admin',
      password: 'oblivion'
    }
  },
  production: {
    client: 'pg',
    connection: {
      port: 1334,
      host: '127.0.0.1',
      database: 'nptdb',
      user: 'admin',
      password: 'oblivion'
    }
  }
};
