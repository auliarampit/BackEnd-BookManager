const conn = require('../config/db')

module.exports = {
  getBook: (name, category) => {
    return new Promise((resolve, reject) => {
      const keyword = `%${name}%`
      const keyword2 = `%${category}%`

      conn.query(`SELECT idBook,image, nameBook, writerBook, namaCategory,tglPinjam, tglKembali, location
                FROM book INNER JOIN category USING(idCategory)
                LEFT JOIN pinjam USING(idBook) WHERE nameBook LIKE ? or idCategory LIKE ?`,
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
        [idBook, data], (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(new Error(err))
          }
        })
    })
  }
}
