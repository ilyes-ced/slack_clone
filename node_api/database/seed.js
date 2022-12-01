const query = require('./index')

const users = [
    ["ilyes", "ilyes@gmail.com", "password", ],
    ["ali", "ali@gmail.com", "password", ],
    ["ahmed", "ahmed@gmail.com", "password", ],
    ["jamel", "jamel@gmail.com", "password", ],
    ["kamel", "kamel@gmail.com", "password", ],
    ["mohamed", "mohamed@gmail.com", "password", ],
    ["oussama", "oussama@gmail.com", "password", ],
]

const workspaces = [
    ["1", 'my first workspace',]
]

const messages = [
    ["1", "1", "hello this is foirst mesage here",],
]




users.forEach(user => {
    query("insert into users(username, email, password) values(?, ?, ?)", [user[0], user[1], user[2]], (err, result) => {
        if(err) return err
        console.log(result)
    })
})


