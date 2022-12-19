const express = require('express')
const query = require('../database/index')
const auth = require('../middleware/auth')

const router = express.Router()



router.post('/workspace', (req, res) => {
    console.log(req.body)
    query('insert into notifications() values', [req.body.email], (err, result) => {
        if(err){
            console.log(err)
            return err
        }
    })

})


router.post('/create' ,(req, res) => {

})


module.exports = router