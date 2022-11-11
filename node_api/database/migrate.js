const query = require('./index')



require('dotenv').config()

/*

const q = async() => {
    console.log(await query('select 1+1'))
}

q()
*/


const path = require('path');


var mysql = require('mysql');
var fs = require('fs');
var readline = require('readline');
var myCon = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});
var rl = readline.createInterface({
  input: fs.createReadStream(path.join(__dirname, 'tables.sql')),
  terminal: false
 });
rl.on('line', function(chunk){
    myCon.query(chunk.toString('ascii'), function(err, sets, fields){
     if(err) console.log(err);
    });
});
rl.on('close', function(){
  console.log("finished");
  myCon.end();
});