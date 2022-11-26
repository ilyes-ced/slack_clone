const express = require('express')
const query = require('../database/index')
const auth = require('../middleware/auth')

const router = express.Router()



router.get('/users_channels', auth,(req, res) => {
    //console.log(req.query)
    //check is member
    query(`select 1`, [req.query.channel_id] , (err,result) => {
        if(err){
            console.log(err)
            return err
        }
        if(result.length > 0){
            query(`select * from users_users where sender = ? or reciever = ?`, [req.query.id, req.query.id], (err, result) => {
                if(err){
                    console.log(err)
                    return err
                }
                res.status(200).send({ result: 'success', message: result })
            })
        }
    })
})


module.exports = router