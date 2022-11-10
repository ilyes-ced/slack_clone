const query = require('./index')
//const db = require('./tables.sql')



query("drop table messages;")
query("drop table workspaces_colors;")
query("drop table users_users;")
query("drop table channels_members;")
query("drop table channels;")
query("drop table workspaces;")
query("drop table notifications;")
query("drop table verifications;")
query("drop table users;")
/*
query(db, () => {
    console.log('table created')
})
*/