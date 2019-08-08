const express = require('express')
const Route = express.Router()

const loginController = require('../controllers/login')


Route
    .post('/post', loginController.register)
    .post('/login', loginController.getByEmail)
    .get('/email', loginController.getByEmail)

module.exports = Route