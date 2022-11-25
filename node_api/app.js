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











//confirm user and join channels as rooms
io.use((socket, next) => {
	const user_data = JSON.parse(socket.handshake.query.user_data)
	query(`select *, users.id from users left join tokens on users.id = tokens.user where
	users.email =? and tokens.token =? and tokens.expires_at >? `, [user_data.email, user_data.token, new Date()], (err, result) => {
		if(err){
			console.log(err)
			return
		}
		query(`select * from channels where workspace in (select workspace from workspaces_members where member =?)`, [user_data.id], (err, result) => {
			if(err){
				console.log(err)
				return
			}
			for(let i = 0; i < result.length; i++){
				socket.join('channel_'+result[i].id)
			}
			next()
		})
	})
})





io.on("connection", (socket) => {
	socket.on('sent_message', (data) => {
		io.in('channel_'+data.channel).emit('room_message', {channel: data.channel,value: data.value})
	})
})

	




const users_route = require('./routes/users')
const workspaces_route = require('./routes/workspaces')
const messages_route = require('./routes/messages')

app.use('/users', users_route)
app.use('/workspace', workspaces_route)
app.use('/message', messages_route)







httpServer.listen(5000)
//app.listen(5000)