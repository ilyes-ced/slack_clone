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


const query = require('./database/index.js')




const ll = async () => {
  try {
    console.log('1')
    /*query(`insert into users(username, email, password) values('198198','trth','ily')`, (err, result) => {
      if (err) return err
      console.log(result)
  })*/

    const rows = await query('select * as count from users');
    console.log(rows)
    console.log('kk')
  }catch(e){
    console.log(e)
  }
}
ll()






/*
const con = require('./database/index.js')
con("select * from customers", function (err, result) {
  if (err) throw err
  console.log(result[0])
})
*/



app.listen(5000);