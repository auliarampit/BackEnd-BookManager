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
        // console.log(resultBook)
        // const result = resultBook
        res.json(resultBook)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  getBookById: (req, res) => {
    const idBook = req.params.idBook || ''

    model.getBookById(idBook)
      .then((resultBook) => {
        // console.log(resultBook)
        // const result = resultBook
        res.json(resultBook)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  postBook: (req, res) => {
    console.log(req.body,'dadadadad')
    const data = {
      nameBook: req.body.name,
      idCategory: req.body.idCategory,
      writerBook: req.body.writer,
      image: req.body.image = 'http://localhost:8082/upload/' + req.file.filename,
      location: req.body.location,
      description: req.body.description,
      created_at: new Date(),
      update_at: new Date()
    }
    model.postBook(data)
      .then((resultBook) => {
        res.json({...data, idBook:resultBook.insertId})
      })
      .catch((error) => {
        console.log(error)
      })
  },

  patchBook: (req, res) => {
    const idBook = parseInt(req.params.idBook) 
    const data = {
      nameBook: req.body.name,
      idCategory: req.body.idCategory,
      writerBook: req.body.writer,
      image: req.body.image,
      location: req.body.location,
      description: req.body.description,
      update_at: new Date()
    }
    model.patchBook(idBook, data)
    .then((resultBook) => {

      })
      .catch((error) => {
        console.log(error)
      })
  },

  deleteBook: (req, res) => {
    const idBook = parseInt(req.params.idBook) 
    
    model.deleteBook(idBook)
    .then((resultBook) => {
  
    })
    .catch((error) => {
      console.log(error)
    })
  }
 
}
