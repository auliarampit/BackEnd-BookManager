require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 5000
const cors = require('cors');
const xssFilter = require('x-xss-protection')
const logger = require('morgan')
const path = require('path')

const nameRoute = require('./src/route/route')
const routePinjam = require('./src/route/pinjam')
const loginRoute =require('./src/route/login')

// var whitelist = ['http://192.168.6.104', 'm']
// const corsOptions = (req, callback) => {
//   console.log(req.header("Origin"))
//   if (whitelist.indexOf(req.header('Origin') !== -1)){
//     console.log('Succes')
//     return callback(null, {
//       origin: true
//     })
//   } else {
//     console.log('Failed')
//     return callback(null, {
//       origin: false
//     })
//   }
// }
app.use(cors())
// Then pass them to cors:
// app.use(cors(corsOptions));
// app.options('*', cors(corsOptions))
app.use(xssFilter())
app.use(logger('dev'))
app.use('/upload', express.static('upload'));


app.listen(port, () => {
  console.log('kita Menggunakan port: ' + port)
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', nameRoute)
app.use('/Pinjam', routePinjam)
app.use('/login', loginRoute)
