require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.SERVER_PORT || 5000
const cors = require('cors');

const nameRoute = require('./src/route/route')

var whitelist = ['http://192.168.6.110', 'm']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== 100) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// Then pass them to cors:
app.use(cors(corsOptions));


app.listen(port, () => {
  console.log('kita Menggunakan port: ' + port)
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', nameRoute)
