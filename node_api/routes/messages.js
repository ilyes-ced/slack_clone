const express = require('express')
const query = require('../database/index')
const auth = require('../middleware/auth')

const router = express.Router()



router.get('/channel', auth,(req, res) => {
    //maybe make it check if he is a memeber in the workspace of these channels but that is already done when fetching the workspaces
    query(`select * from (select *,(select username from users where id = sender) as sender_username from messages where channel = ? order by id desc limit 20) as sub order by id asc`, [req.query.channel_id], (err, result) => {
        if(err){
            console.log(err)
            return err
        }
        res.status(200).send({ result: 'success', message: result })
    })
})




router.get('/chat', auth,(req, res) => {
    query(`select * from (select *,(select username from users where id = sender) as sender_username from private_messages where conversation = ? order by id desc limit 20) as sub order by id asc`, [req.query.channel_id], (err, result) => {
        if(err){
            console.log(err)
            return err
        }
        res.status(200).send({ result: 'success', message: result })
    })
})

router.get('/get_more', auth,(req, res) => {
    console.log(req.query)
    query(`select * from (select *,(select username from users where id = sender) as sender_username from messages where channel = ? order by id desc limit 20 offset ?) as sub order by id asc`, [req.query.channel_id, req.query.messages_stage * 20], (err, result) => {
        if(err){
            console.log(err)
            return err
        }
        console.log('///////////////////////////////////////')
        console.log(result)
        res.status(200).send({ result: 'success', message: result })
    })
})


module.exports = router