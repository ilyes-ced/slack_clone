const express = require('express')
const app = express()
require('dotenv').config()

app.use(express.json())
app.use((req, res, next) => {
    /* process.env.REACT_APP_URL */
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});


const query = require('./database/index')






const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
  console.log('connected')
});


  




const users_route = require('./routes/users')
const workspaces_route = require('./routes/workspaces')

app.use('/users', users_route)
app.use('/workspaces', workspaces_route)







httpServer.listen(5000);
//app.listen(5000);