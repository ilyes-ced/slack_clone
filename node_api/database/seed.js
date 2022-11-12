const query = require('./index')

const users = [
    ["ilyes", "ilyes@gmail.com", "11062001", ],
    ["ilyes", "ilyes@gmail.com", "11062001", ],
    ["ilyes", "ilyes@gmail.com", "11062001", ],
    ["ilyes", "ilyes@gmail.com", "11062001", ],
    ["ilyes", "ilyes@gmail.com", "11062001", ],
    ["ilyes", "ilyes@gmail.com", "11062001", ],
    ["ilyes", "ilyes@gmail.com", "11062001", ],
    ["ilyes", "ilyes@gmail.com", "11062001", ],
    ["ilyes", "ilyes@gmail.com", "11062001", ],
    ["ilyes", "ilyes@gmail.com", "11062001", ],
    ["ilyes", "ilyes@gmail.com", "11062001", ],
    ["ilyes", "ilyes@gmail.com", "11062001", ],
    ["ilyes", "ilyes@gmail.com", "11062001", ],
    ["ilyes", "ilyes@gmail.com", "11062001", ],
    ["ilyes", "ilyes@gmail.com", "11062001", ],
    ["ilyes", "ilyes@gmail.com", "11062001", ],
    ["ilyes", "ilyes@gmail.com", "11062001", ],
    ["ilyes", "ilyes@gmail.com", "11062001", ],
    ["ilyes", "ilyes@gmail.com", "11062001", ],
    ["ilyes", "ilyes@gmail.com", "11062001", ],
    ["ilyes", "ilyes@gmail.com", "11062001", ],
    ["ilyes", "ilyes@gmail.com", "11062001", ],
    ["ilyes", "ilyes@gmail.com", "11062001", ],
    ["ilyes", "ilyes@gmail.com", "11062001", ],
    ["ilyes", "ilyes@gmail.com", "11062001", ],
    ["ilyes", "ilyes@gmail.com", "11062001", ],
    ["ilyes", "ilyes@gmail.com", "11062001", ],
    ["ilyes", "ilyes@gmail.com", "11062001", ],
    ["ilyes", "ilyes@gmail.com", "11062001", ],
]





const q = async(sql) => {
    await query(sql)
}


/*
users.forEach(user => {
    q("insert into users(username, email, password) values("+user[0]+","+user[1]+","+user[2]+")")
})
*/
q("insert into users(username, email, password) values(?, ?, ?)", ['ali', 'email de ali', 'passapss'], (err, result) => {
    if(err) return err
    console.log(result)

})
