const express = require('express')
const app = express()
require('dotenv').config()


app.use(express.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME
})
const query = (query,) => {

}

console.log('1')
console.log(kk)
console.log('2')


/*
const con = require('./database/index.js')
con("select * from customers", function (err, result) {
  if (err) throw err
  console.log(result[0])
})
*/



app.listen(5000);