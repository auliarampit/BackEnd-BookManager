const express = require('express')
const Route = express.Router()

const pinjamController = require('../controllers/pinjam')

Route
    
    .get('/:idBook', pinjamController.getPinjam)
    .post('/post', pinjamController.postPinjam)
    .patch('/:idPinjam', pinjamController.patchPinjam)

module.exports = Route