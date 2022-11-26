const express = require('express')
const query = require('../database/index')
const auth = require('../middleware/auth')

const router = express.Router()



router.get('/channel', auth,(req, res) => {
    //console.log(req.query)
    //check is member
    query(`select 1`, [req.query.channel_id] , (err,result) => {
        if(err){
            console.log(err)
            return err
        }
        if(result.length > 0){
            query(`select * from (select *,(select username from users where id = sender) as sender_username from messages where channel = ? order by id desc limit 20) as sub order by id asc`, [req.query.channel_id], (err, result) => {
                if(err){
                    console.log(err)
                    return err
                }
                res.status(200).send({ result: 'success', message: result })
            })
        }
    })
})




router.get('/chat', auth,(req, res) => {
    //console.log(req.query)
    //check is member
    query(`select 1`, [req.query.channel_id] , (err,result) => {
        if(err){
            console.log(err)
            return err
        }
        if(result.length > 0){
            query(`select * from (select *,(select username from users where id = sender) as sender_username from private_messages where conversation = ? order by id desc limit 20) as sub order by id asc`, [req.query.channel_id], (err, result) => {
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