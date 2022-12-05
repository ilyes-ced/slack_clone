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
        res.status(200).send({ result: 'success', message: result })
    })
})


router.post('/create' ,(req, res) => {
    const user_data = JSON.parse(req.body.user_data)
    query(`select * from workspaces where id=? and owner=?`, [req.body.workspace_id, user_data.id], (err, result) => {
        if(err){
            console.log(err)
            return err
        }
        
        if(result.length != 0){
            if(req.body.public_private){
                query(`insert into channels(name, description, workspace, public) values(?, ?, ?, ?)`, [req.body.new_channel, req.body.new_channel_desc, req.body.workspace_id, 'private'], (err, result) => {
                    if(err){
                        console.log(err)
                        return err
                    }
                    query(`insert into private_channels_members(channel, member) values(?, ?)`, [result.insertId, user_data.id], (err, result) => {
                        if(err){
                            console.log(err)
                            return err
                        }
                        console.log(result)
                        res.status(200).send({ result: 'success', message: {id: result.insertId,name: req.body.new_channel, description: req.body.new_channel_desc, public: 'private', workspace_od: req.body.workspace_id} })
                        console.log('//////////////////////////////////////////////')
                    })
                })
            }else{
                query(`insert into channels(name, description, workspace) values(?, ?, ?)`, [req.body.new_channel, req.body.new_channel_desc, req.body.workspace_id], (err, result) => {
                    if(err){
                        console.log(err)
                        return err
                    }
                    console.log(result)
                    res.status(200).send({ result: 'success', message: {id: result.insertId,name: req.body.new_channel, description: req.body.new_channel_desc, public: 'public', workspace_od: req.body.workspace_id} })

                })
            }
        }
    })
})


module.exports = router