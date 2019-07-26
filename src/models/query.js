const conn = require('../config/db')

module.exports = {
  getBook: (name, category) => {
    return new Promise((resolve, reject) => {
      const keyword = `%${name}%`
      const keyword2 = `%${category}%`

      conn.query(`SELECT idBook,image, nameBook,update_at, description, writerBook,idCategory, namaCategory,location, status
                FROM book INNER JOIN category USING(idCategory) WHERE nameBook LIKE ? or idCategory LIKE ?`,
        [keyword, keyword2], (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(new Error(err))
          }
        })
    })
  },

  postBook: (data) => {
    return new Promise((resolve, reject) => {
      conn.query(`INSERT INTO book SET ?`, data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  patchBook: (idBook, data) => {
    return new Promise((resolve, reject) => {
      conn.query(`UPDATE book SET ? WHERE idBook = ?`,
        [data, idBook], (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(new Error(err))
          }
        })
    })
  },
  deleteBook: (idBook) => {
    return new Promise((resolve,reject) => {
      conn.query(`DELETE from book WHERE idBook = ?`,
      idBook, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}
