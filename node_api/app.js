const express = require('express')
const app = express()
require('dotenv').config()

app.use(express.json())
app.use((req, res, next) => {
    /* process.env.REACT_APP_URL */
    res.header("Access-Control-Allow-Origin", "http://localhost:3000")
    res.header("Access-Control-Allow-Credentials", "true")
    res.header("Access-Control-Allow-Headers", "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    next()
})


const query = require('./database/index')






const { createServer } = require("http")
const { Server } = require("socket.io")

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin:"http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
})




io.on("connection", (socket) => {
  console.log('connected')
  socket.join('test_room')
  console.log(socket.rooms)
  


  socket.on('sent_message', (data) => {
    console.log((data))
    io.in('test_room').emit('datdatdatdat')
    socket.to('test_room').emit('datdatdatdat')
  })
  //
})


  




const users_route = require('./routes/users')
const workspaces_route = require('./routes/workspaces')
const messages_route = require('./routes/messages')

app.use('/users', users_route)
app.use('/workspace', workspaces_route)
app.use('/message', messages_route)







httpServer.listen(5000)
//app.listen(5000)