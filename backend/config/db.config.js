// const { Pool } = require('pg')
 
// const pool = new Pool({
//     user:"postgres",
//     host:"localhost",
//     database:"ikasso",
//     password:"61246323",
//     port:5432
// })
// module.exports = pool
require('dotenv')

module.exports = {
    host: process.env.BD_HOST || "localhost",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "61246323",
    db: process.env.BD_NAME || "ikasso",
    port: process.env.BD_PORT || 5432,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }