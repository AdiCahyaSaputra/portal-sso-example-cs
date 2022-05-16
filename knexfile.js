module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      port: 3306,
      user: 'pkl',
      password: 'Pkl2077$#',
      database: 'pklDB'
    }
  }
}
