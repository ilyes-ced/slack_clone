const express = require('express')
const query = require('../database/index')
const auth = require('../middleware/auth')
const router = express.Router()



router.post('/login', (req, res) => {
    console.log('request start')
    query('select * from users inner join tokens on tokens.user=users.id and users.email=? ', [req.body.email], (err, result) => {
        if(err){
            console.log(err)
            return
        }
        console.log(result)
        if(result.length == 0){
            console.log('no users')
        }
    })
})






router.post('/register', (req, res) => {
    console.log(req.body)
})










module.exports = router