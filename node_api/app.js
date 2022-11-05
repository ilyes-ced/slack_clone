const express = require('express')
const app = express()




app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});



//const pages_route = require('./routes/pages_router')





//app.use('/',pages_route)
app.get('/', (req, res) => {
    var obj =[
        {name: 'bruh', age : 50},
        {name: 'bruh', age : 50},
        {name: 'bruh', age : 50},
        {name: 'bruh', age : 50},
        {name: 'bruh', age : 50},
        {name: 'bruh', age : 50},
        {name: 'bruh', age : 50},
        {name: 'bruh', age : 50},
        {name: 'bruh', age : 50},
    ]
    res.status(200).send(obj)
})




app.listen(5000);