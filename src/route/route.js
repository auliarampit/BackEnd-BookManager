const express = require('express')
const Route = express.Router()

const booksController = require('../controllers/books')
const Auth = require('../helpers/auth')

Route

  .get('/', booksController.getIndex)
  .get('/nameBook', booksController.getBook)
  .post('/nameBook', booksController.postBook)
  .patch('/nameBook/:idBook', booksController.patchBook)
  .delete('/nameBook/:idBook', Auth.authInfo, Auth.accesstoken, booksController.deleteBook)

module.exports = Route
