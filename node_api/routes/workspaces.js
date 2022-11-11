const express = require('express')
const query = require('../database/index')
const auth = require('../middleware/auth')

const router = express.Router()



router.post('/', (req, res) => {
    console.log(req.body)
    res.status(200).send(req.body)
})












module.exports = router