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


















var kk
app.post('/users/verify_user', (req, res) => {
    query(`select users.id, users.email, users.profile_image ,tokens.token, tokens.expires_at 
        from users left join tokens on users.id = tokens.user where users.email=?`, [req.body.email], (err, result) => {
        if(err){
            console.log(err)
            return
        }
        
        if(result.length > 0){
            if(result[0].token){
                if(result[0].expires_at > new Date()){
                    res.status(200).send(JSON.stringify({result: 'success', message: result[0]}))
					kk = result[0]
					console.log(kk)
					sock(kk)
                    return
                }else{
                    res.status(401).send({result: 'failed', message: 'token expired'})
                    return
                }
            }else{
                res.status(401).send({result: 'failed', message: 'token expired'})
                return
            }
        }else{
            res.status(401).send({result: 'failed', message: 'login creddentials wrong'})
            return
		}
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