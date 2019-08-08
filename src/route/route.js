const express = require('express')
const Route = express.Router()
const multer = require('multer')
const path = require('path')

const booksController = require('../controllers/books')
const Auth = require('../helpers/auth')

const uploadImage = require('../helpers/uploading')

const storage = multer.diskStorage({
  destination: './upload/',
  filename: function(req, file, cb) {
    cb(null, './upload/')
  },
  filename: function(req, file, cb) {
    cb(null, new Date().getDate() + path.extname(file.originalname))
  }
})

const upload = multer({ storage : storage }).single('image')

Route

  .get('/', booksController.getIndex)
  .get('/nameBook', booksController.getBook)
  .get('/nameBook/:idBook',  booksController.getBookById)
  .post('/nameBook', upload, booksController.postBook)
  .patch('/nameBook/:idBook',  booksController.patchBook)
  .delete('/nameBook/:idBook', Auth.authInfo, Auth.accesstoken, booksController.deleteBook)

module.exports = Route
