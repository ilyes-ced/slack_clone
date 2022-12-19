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

const send_channel_message = (socket, data) => {
	console.log(data.channel)
	query(`insert into messages(sender, channel, message) values(?, ?, ?)`, [socket.user_data.id, data.channel, data.value], (err, result) => {
		if(err){
			console.log(err)
			return
		}	
		query('select * from messages where id=?', [result.insertId], (err, result) => {
			if(err){
				console.log(err)
				return
			}
			io.in('channel_'+result[0].channel).emit('room_message', {data: result[0]})
		})
		//io.in('channel_'+data.channel).emit('room_message', {channel: data.channel,value: data.value})
	})
}














const send_private_message = (socket, data) => {
	query(`insert into private_messages(sender, conversation, message) values(?, ?, ?)`, [socket.user_data.id, data.channel, data.value], (err, result) => {
		if(err){
			console.log(err)
			return
		}	
		query('select * from private_messages where id=?', [result.insertId], (err, result) => {
			if(err){
				console.log(err)
				return
			}
			io.in('chat_'+result[0].conversation).emit('chat_message', {data: result[0]})
		})
		//io.in('channel_'+data.channel).emit('room_message', {channel: data.channel,value: data.value})
	})
}




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
	socket.user_data = JSON.parse(socket.handshake.query.user_data)
	query(`select *, users.id from users left join tokens on users.id = tokens.user where
	users.email =? and tokens.token =? and tokens.expires_at >? `, [socket.user_data.email, socket.user_data.token, new Date()], (err, result) => {
		if(err){
			console.log(err)
			return
		}
		/*
		select * from channels where workspace in (select workspace from workspaces_members where member =?)
		and ((public<>'private') or (public='private' and id in (select channel from private_channels_members where member=?)))
		*/
		query(`select * from channels where workspace in (select workspace from workspaces_members where member =?)
		and ((public<>'private') or (public='private' and id in (select channel from private_channels_members where member=?)))`,[socket.user_data.id, socket.user_data.id, socket.user_data.id], (err, result) => {
			if(err){
				console.log(err)
				return
			}
			for(let i = 0; i < result.length; i++){
				socket.join('channel_'+result[i].id)
			}
		})
		query(`select * from users_users where sender=? or reciever=?`, [socket.user_data.id, socket.user_data.id], (err, result) => {
			if(err){
				console.log(err)
				return
			}
			for(let i = 0; i < result.length; i++){
				socket.join('chat_'+result[i].id)
			}
			next()
		})
	})
})





io.on("connection", (socket) => {
	//console.log(socket.rooms)
	socket.on('sent_message', (data) => {
		console.log(data)
		if(data.channel_type == 'channel'){
			send_channel_message(socket, data)
		}else if(data.channel_type == 'chat'){
			send_private_message(socket, data)
		}
	})

})

	




const users_route = require('./routes/users')
const workspaces_route = require('./routes/workspaces')
const messages_route = require('./routes/messages')
const channels_route = require('./routes/channels')
const invitaions_route = require('./routes/invitaions')

app.use('/users', users_route)
app.use('/workspace', workspaces_route)
app.use('/message', messages_route)
app.use('/channel', channels_route)
app.use('/inivitaion', invitaions_route)




httpServer.listen(5000)