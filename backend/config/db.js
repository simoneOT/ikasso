const { Pool } = require('pg')
 
const pool = new Pool({
    user:"postgres",
    host:"localhost",
    database:"ikasso",
    password:"61246323",
    port:5432
})
module.exports = pool