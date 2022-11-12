const query = require('./index')









const q = async(sql) => {
  await query(sql)
}


const path = require('path');


var mysql = require('mysql');
var fs = require('fs');

fs.readFile(path.join(__dirname, 'tables.sql'), (err, data) => {
  if(err) return err
  console.log(data.toString().replace('\n', ""))
  q(data.toString().replace("/\n/g", ""))
})


