const express = require('express')
const query = require('../database/index')
const auth = require('../middleware/auth')

const router = express.Router()



router.post('/workspace', (req, res) => {
    console.log(req.body)
    const user_data = JSON.parse(req.body.user_data)
    const workspace = JSON.parse(req.body.workspace)
    const emails = JSON.parse(req.body.emails)
    console.log(emails)
    emails.forEach(element => {
        console.log()
        if(/\S+@\S+\.\S+/.test(element)) query('insert into notifications(reciever, sender, type, workspace_id_or_user_id) values(?, ?, "workspace_invite", ?)', [user_data.id, element, workspace], (err, result) => {
            if(err){
                console.log(err)
                return err
            }
        })
    });
    

})


router.post('/user' ,(req, res) => {
    console.log(req.body)
    const user_data = JSON.parse(req.body.user_data)
    const email = JSON.parse(req.body.email)
    if(/\S+@\S+\.\S+/.test(email)) query('insert into notifications(reciever, sender, type, workspace_id_or_user_id) values(?, ?, "workspace_invite", ?)', [user_data.id, email], (err, result) => {
        if(err){
            console.log(err)
            return err
        }
    })
})


module.exports = router