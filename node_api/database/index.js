var mysql = require('mysql')


var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME
})



module.exports = (query, callback) =>{
    connection.connect((err) => {
        if(err) return err
        connection.query(query, callback)
        console.log('jj')
        connection.end()
    })
}