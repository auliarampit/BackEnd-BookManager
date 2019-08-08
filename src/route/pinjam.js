const express = require('express')
const Route = express.Router()

const pinjamController = require('../controllers/pinjam')

Route
    
    .get('/:idBook', pinjamController.getPinjam)
    .get('/', pinjamController.HistoryPinjam)
    .post('/post', pinjamController.postPinjam)
    .patch('/:idBook', pinjamController.patchPinjam)

module.exports = Route