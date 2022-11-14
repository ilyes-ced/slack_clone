const express = require('express')
const query = require('../database/index')
const auth = require('../middleware/auth')
const router = express.Router()
const bcrypt = require('bcrypt')

const generate_token = () => {
    return Math.random().toString(36).substring(2)+Math.random().toString(36).substring(2)+Math.random().toString(36).substring(2)+Math.random().toString(36).substring(2)
}
const generate_expiration_date = () => {
    return new Date(new Date().getTime() + 5259600000) //.toISOString().slice(0, 19).replace('T', " ")
}





router.post('/login', (req, res) => {
    console.log('request start')
    if(!(req.body.email && req.body.password)){
        res.status(401).send({result: 'failed', message: 'username and password required'})
        return
    }
    query('select *, users.id from users left join tokens on tokens.user=users.id where users.email=? ', [req.body.email], (err, result) => {
        if(err){
            console.log(err)
            return
        }
        console.log(result)

        if(result.length == 0){
            res.status(401).send({result: 'failed', message: 'login creddentials wrong'})
            return
        }
        
        if(bcrypt.compareSync(req.body.password, result[0].password)){
            if(result[0].token){
                if(result[0].expires_at < new Date().toISOString().slice(0, 19).replace('T', " ")){
                    query('update tokens set token=?, expires_at=? where user=? ',  [generate_token(), result[0].id, generate_expiration_date()])
                    result[0].token = generate_token()
                    result[0].expires_at = generate_expiration_date()
                    res.status(200).send({result: 'success', message: result[0]})
                }else{
                    res.status(200).send({result: 'success', message: result[0]})
                    return
                }
            }else{
                query('insert into tokens(user, token, expires_at) values(?, ?, ?)',  [result[0].id, generate_token(), generate_expiration_date()])
                result[0].token = generate_token()
                result[0].expires_at = generate_expiration_date()
                res.status(200).send({result: 'success', message: result[0]})
            }
        }else{
            res.status(401).send({result: 'failed', message: 'password wrong'})
        }
        

    })
})



router.post('/verify_user', (req, res) => {
    console.log(req.body)
    query(`select users.id, users.email, users.profile_image, users.created_at,tokens.token, tokens.expires_at 
        from users left join tokens on users.id = tokens.user where users.email=?`, [req.body.email], (err, result) => {
        if(err){
            console.log(err)
            return
        }
        
        if(result.length > 0){
            if(result[0].token){
                console.log(result[0].expires_at)
                console.log(new Date())

                if(result[0].expires_at > new Date()){
                    console.log('true')
                }else{
                    console.log('false')
                }
                if(result[0].expires_at > new Date()){
                    console.log('token not expired')
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




router.post('/register', (req, res) => {
    if(!(req.body.username && req.body.email && req.body.password)){
        res.status(401).send({result: 'failed', message: 'username and email and password required'})
        return
    }
    console.log(req.body)
    query('insert into users(username, email, password) values(?, ?, ?)', [req.body.username, req.body.email, bcrypt.hashSync(req.body.password, 10)], (err, result) => {
        if(err) return err
        console.log(result)
    })
})










module.exports = router