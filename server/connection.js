require('dotenv').config();
const { Pool } = require('pg')
const { 
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_USER,
  DB_PASSWORD 
} = process.env


const pool = new Pool({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  database: DB_DATABASE,
  port: DB_PORT
});


pool.connect((err) => {
  if(!err){
    console.log('connected')
  }else {
    console.log(err)
  }
})

module.exports = {
  pool,
} ;