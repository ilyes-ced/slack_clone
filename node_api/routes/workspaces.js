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
        const workspace = result[0]
        if(result.length > 0){
            query(`select * from channels where workspace = ? and public<>'private' and id in (select id from private_channels_members where member=?)`, [result[0].id, result[0].id, req.query.id], (err, result) => {
                if(err){
                    console.log(err)
                    return err
                }
                res.status(200).send({result: 'success', message: {workspace: workspace, channels: result}})
            })
        }else if(result.length == 0){
            res.status(200).send({result: 'no_workspaces', message: 'redirect to find workspaces'})
        }
    })
})



router.post('/', (req, res) => {
})








module.exports = router