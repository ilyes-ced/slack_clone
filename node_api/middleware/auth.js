const query = require('../database/index')





module.exports = (req, res, next) => {
    console.log(req.query)
    req.query = JSON.parse(req.query.data)
    query(`select users.id, users.email, users.profile_image ,tokens.token, tokens.expires_at  
    from users left join tokens on tokens.user=users.id where users.id=? and tokens.token=?`, [req.query.id, req.query.token], (err, result) => {
        if(err){
            console.log(err)
            return
        }
        if(result.length == 0){
            //console.log('not authed ')
            res.status(401).send({result: 'failed', message: 'not authenticated'})
            return
        }
        if(req.query.expires_at > new Date()){
            res.status(401).send({result: 'failed', message: 'not authenticated'})
            return
        }
    })
    next()
}