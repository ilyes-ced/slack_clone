const query = require('./')


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

query("select * from customers", function (err, result) {
    if (err) throw err
    console.log(result)
  })