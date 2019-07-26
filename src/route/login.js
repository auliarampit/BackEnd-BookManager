const express = require('express')
const Route = express.Router()

const loginController = require('../controllers/login')


Route
    .post('/post', loginController.register)
    .post('/login', loginController.login)

module.exports = Route