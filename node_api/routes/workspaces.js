const express = require('express')
const query = require('../database/index')
const auth = require('../middleware/auth')

const router = express.Router()



router.get('/' ,auth,  (req, res) => {
    query(`select *,(select count(*) from workspaces_members where workspace = id) as members_count from workspaces
    where id in (select workspace from workspaces_members where member=?)`, [req.query.id], (err,result) => {
        if(err){
            console.log(err)
            return err
        }
        
        const workspaces= result
        const active_workspace= workspaces.find(ele => ele.id == req.query.active_workspace)
        if(result.length > 0){
            console.log(req.query.id)
            query(`select * from channels where workspace = ? and ((public<>'private') or (public='private' and id in (select channel from private_channels_members where member=?)))`, [active_workspace.id, req.query.id], (err, result) => {
                if(err){
                    console.log(err)
                    return err
                }
                res.status(200).send({result: 'success', message: {workspace: active_workspace, channels: result, all_workspaces: workspaces}})
            })
        }else if(result.length == 0){
            res.status(200).send({result: 'no_workspaces', message: 'redirect to find workspaces'})
        }
    })
})



router.post('/my_workspaces', (req, res) => {
    console.log(req.body)
    query(`select *,(select count(*) from workspaces_members where workspace = id) as members_count from workspaces
    where id in (select workspace from workspaces_members where member=?)`, [req.body.id], (err,result) => {
        if(err){
            console.log(err)
            return err
        }
        console.log(result)
        res.status(200).send({result: 'success', message: {workspaces: result}})
    })
})








module.exports = router