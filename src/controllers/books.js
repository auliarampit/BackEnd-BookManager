const model = require('../models/query')
// const status = require('../helpers/status')

module.exports = {
  getIndex: (req, res) => {
    return res.json('Hello guyss!!')
  },
  getBook: (req, res) => {
    const name = req.query.nameBook || ''
    const category = req.query.category || ''

    model.getBook(name, category)
      .then((resultBook) => {
        // const result = resultBook
        res.json(resultBook)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  postBook: (req, res) => {
    const data = {
      nameBook: req.body.name,
      idCategory: req.body.idCategory,
      writerBook: req.body.writer,
      location: req.body.location,
      created_at: new Date(),
      update_at: new Date()
    }
    model.postBook(data, id)
      .then((resultBook) => {

      })
      .catch((error) => {
        console.log(error)
      })
  },

  patchBook: (req, res) => {
    const idBook = req.params.idBook 
    const data = {
      nameBook: req.body.name,
      idCategory: req.body.idCategory,
      writerBook: req.body.writer,
      location: req.body.location,
      update_at: new Date()
    }
    model.patchBook(idBook, data)
    .then((resultBook) => {

      })
      .catch((error) => {
        console.log(error)
      })
  }
}
