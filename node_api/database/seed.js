const query = require('./index')
const bcrypt = require('bcrypt')


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
    [1, 'my first workspace']
]

const messages = [
    [1, 1, JSON.stringify([{classes: 'bold', content: 'hello dude'}, {classes: 'italic', content: 'im from italy'}])],
]




users.forEach(user => {
    query("insert into users(username, email, password) values(?, ?, ?)", [user[0], user[1], bcrypt.hashSync('11062001', 10)], (err, result) => {
        if(err){
            console.log(err)
            return err
        }
        console.log(result)
    })
})


workspaces.forEach(workspaces => {
    query("insert into workspaces(owner, name) values(?, ?)", [workspaces[0], workspaces[1]], (err, result) => {
        if(err){
            console.log(err)
            return err
        }
        console.log(result)
    })
})




messages.forEach(messages => {
    query("insert into messages(sender, channel, message) values(?, ?, ?)", [messages[0], messages[1], messages[2]], (err, result) => {
        if(err){
            console.log(err)
            return err
        }
        console.log(result)
    })
})