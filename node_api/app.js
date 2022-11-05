const express = require('express')
const app = express()




app.use(express.json())





//const pages_route = require('./routes/pages_router')





//app.use('/',pages_route)
app.get('/', (req, res) => {
    var obj = {
        name: 'bruh',
        age : 50
    }
    res.status(200).send(obj)
})




app.listen(5000);