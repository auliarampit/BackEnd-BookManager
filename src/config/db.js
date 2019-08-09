
const mysql = require('mysql')
const conn = mysql.createConnection({
  host: 'remotemysql.com',
  user: 'myGXw1ee8k',
  password: 'gvZONdTv1x',
  database: 'myGXw1ee8k'
})

conn.connect((err) => {
  if (err) console.log(new Error(err))
})

module.exports = conn
