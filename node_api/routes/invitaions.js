const express = require('express')
const query = require('../database/index')
const auth = require('../middleware/auth')

const router = express.Router()



router.post('/workspace', (req, res) => {
    console.log(req.body)
})


router.post('/create' ,(req, res) => {

})


module.exports = router