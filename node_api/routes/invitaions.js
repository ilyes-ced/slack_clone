const express = require('express')
const query = require('../database/index')
const auth = require('../middleware/auth')

const router = express.Router()



router.get('/users_channels', auth,(req, res) => {

})


router.post('/create' ,(req, res) => {

})


module.exports = router