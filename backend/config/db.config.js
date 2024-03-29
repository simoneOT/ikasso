const { Pool } = require('pg')
 

require('dotenv')

const dbconfig =
{
  host: process.env.BD_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "61246323",
  database: process.env.BD_NAME || "ikasso",
  port: process.env.BD_PORT || 5432,
  // dialect: "postgres",
  // pool: {
  //   max: 5,
  //   min: 0,
  //   acquire: 30000,
  //   idle: 10000
  // }
}

module.exports = new Pool(dbconfig)