const express = require('express')
const Route = express.Router()

const booksController = require('../controllers/books')

Route
  .get('/', booksController.getIndex)
  .get('/nameBook', booksController.getBook)
  .post('/post', booksController.postBook)
  .patch('/idBook', booksController.patchBook)

module.exports = Route
