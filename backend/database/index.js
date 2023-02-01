var mysql = require('mysql')
const util = require('util')
require('dotenv').config()

var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME
})


const default_callback = (err, result) => {
  if(err) {
    console.log(err)
    return err
  }
  //console.log(result)
  return result
}

module.exports = async (sql, params, callback = default_callback) => {
  await util.promisify(connection.query).bind(connection)(sql, params, callback)
}

 