const express = require('express')
const query = require('../database/index')
const router = express.Router()
const bcrypt = require('bcrypt')

const generate_token = () => {
    return Math.random().toString(36).substring(2)+Math.random().toString(36).substring(2)+Math.random().toString(36).substring(2)+Math.random().toString(36).substring(2)
}
const generate_expiration_date = () => {
    return new Date(new Date().getTime() + 5259600000) //.toISOString().slice(0, 19).replace('T', " ")
}





router.post('/login', (req, res) => {
    if(!(req.body.email && req.body.password)){
        res.status(401).send({result: 'failed', message: 'username and password required'})
        return
    }
    query('select users.id, users.username, users.email, users.password, users.profile_image ,tokens.token, tokens.expires_at  from users left join tokens on tokens.user=users.id where users.email=? ', [req.body.email], (err, result) => {
        if(err){
            console.log(err)
            return
        }
        if(result.length == 0){
            res.status(401).send({result: 'failed', message: 'login creddentials wrong'})
            return
        }
        if(bcrypt.compareSync(req.body.password, result[0].password)){
            delete result[0].password
            if(result[0].token){
                if(result[0].expires_at < new Date().toISOString().slice(0, 19).replace('T', " ")){
                    result[0].token = generate_token()
                    result[0].expires_at = generate_expiration_date()
                    query('update tokens set token=?, expires_at=? where user=? ',  [result[0].token, result[0].id, result[0].expires_at])
                    res.status(200).send({result: 'success', message: result[0]})
                }else{
                    res.status(200).send({result: 'success', message: result[0]})
                    return
                }
            }else{
                result[0].token = generate_token()
                result[0].expires_at = generate_expiration_date()
                query('insert into tokens(user, token, expires_at) values(?, ?, ?)',  [result[0].id, result[0].token, result[0].expires_at])
                res.status(200).send({result: 'success', message: result[0]})
            }
        }else{
            res.status(401).send({result: 'failed', message: 'password wrong'})
        }
        

    })
})







router.post('/register', (req, res) => {
    if(!(req.body.username && req.body.email && req.body.password)){
        res.status(401).send({result: 'failed', message: 'username and email and password required'})
        return
    }
    query('select * from users where email=?', [req.body.email], (err, result) => {
        if(err){
            console.log(err)
        }
        if(result.length == 0){
            query('insert into users(username, email, password) values(?, ?, ?)', [req.body.username, req.body.email, bcrypt.hashSync(req.body.password, 10)], (err, result) => {
                if(err) return err
            })
        }else{
            res.status(401).send({result: 'failed', message: 'email already taken'})
        }
    })

})





router.post('/verify_user', (req, res) => {
    query(`select users.id, users.username, users.email, users.profile_image ,tokens.token, tokens.expires_at 
        from users left join tokens on users.id = tokens.user where users.email=?`, [req.body.email], (err, result) => {
        if(err){
            console.log(err)
            return
        }
        
        if(result.length > 0){
            if(result[0].token == req.body.token){
                if(result[0].expires_at > new Date()){
                    res.status(200).send(JSON.stringify({result: 'success', message: result[0]}))
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





module.exports = router