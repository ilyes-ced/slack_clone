const express = require('express')
const query = require('../database/index')
const auth = require('../middleware/auth')

const router = express.Router()


/*
router.get('/' ,auth,  (req, res) => {
    query('select *,(select count(*) from workspaces_members where workspace= ?) as members_count from workspaces where owner = ?', [req.query.id, req.query.id], (err,result) => {
        if(err){
            console.log(err)
            return err
        }
        console.log(result)
        const workspace = result[0]
        if(result.length > 0){
            query(`select *,(select count(*) from channels_members where channel= ?) as members_count from channels where workspace = ?`, [result[0].id, result[0].id], (err, result) => {
                if(err){
                    console.log(err)
                    return err
                }
                res.status(200).send({result: 'success', message: {workspace: workspace, channels: result}})
            })
        }
    })
})



router.post('/', (req, res) => {
})



*/

router.get('/', auth,(req, res) => {
    console.log(req.query)
    //check is member
    query(`select 1`, [req.query.channel_id] , (err,result) => {
        if(err){
            console.log(err)
            return err
        }
        if(result.length > 0){
            query(`select *,(select username from users where id = sender) as sender_username from messages where channel = ? `, [req.query.channel_id], (err, result) => {
                if(err){
                    console.log(err)
                    return err
                }
                console.log(result)
                res.status(200).send({ result: 'success', message: result })
            })
        }
    })
})


module.exports = router