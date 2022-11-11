var mysql = require('mysql')
const util = require('util');


var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME
})




module.exports = util.promisify(connection.query).bind(connection);
 /*(query, callback) =>{
    connection.connect((err) => {
      console.log('connected')
        if(err) return err
        connection.query(query, callback)
        connection.end()
    })
}*/