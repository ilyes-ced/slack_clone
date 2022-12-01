const express = require('express')
const query = require('../database/index')
const auth = require('../middleware/auth')

const router = express.Router()



router.get('/users_channels', auth,(req, res) => {
    query(`select *,( select username from users where id<>? and (id=reciever or id=sender) ) as name from users_users where sender = ? or reciever = ?`, [req.query.id, req.query.id, req.query.id], (err, result) => {
        if(err){
            console.log(err)
            //res.status(200).send({ result: 'success', message: 'unknown err' })
            return err
        }
        //console.log(result)
        res.status(200).send({ result: 'success', message: result })
    })
})


router.post('/create', auth,(req, res) => {
    console.log(req.body)
    //query(`select *,( select username from users where id<>? and (id=reciever or id=sender) ) as name from users_users where sender = ? or reciever = ?`, [req.query.id, req.query.id, req.query.id], (err, result) => {
    //    if(err){
    //        console.log(err)
    //        return err
    //    }
    //    res.status(200).send({ result: 'success', message: result })
    //})
})


module.exports = router