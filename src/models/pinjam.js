const conn = require('../config/db')

module.exports = {
  getPinjam: (idBook) => {
    return new Promise((resolve, reject) => {

      conn.query(`SELECT * FROM pinjam WHERE idBook = ? AND tglKembali is null`,
        idBook, (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(new Error(err))
          }
        })
    })
  },

  HistoryPinjam: (idCard) => {
    return new Promise((resolve, reject) => {

      conn.query(`SELECT * FROM pinjam INNER JOIN book ON book.idBook = pinjam.idBook WHERE idCard = ? `,
        idCard, (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(new Error(err))
          }
        })
    })
  },

    postPinjam: (data) => {
        return new Promise((resolve, reject) => {
          conn.query(`INSERT INTO pinjam SET ?`, data, (err, result) => {
              conn.query('UPDATE book SET status = ? WHERE idBook = ?', [1, data.idBook], (error, resultt) => {
                if (!err) {
                    resolve(resultt)
                  } else {
                    reject(new Error(error))
                  }
              })
            if (!err) {
              resolve(result)
            } else {
              reject(new Error(err))
            }
          })
        })
      },

      patchPinjam: (data, idPinjam, idBook) => {
        console.log(idBook);
        
        return new Promise((resolve, reject) => {
          conn.query(`UPDATE pinjam SET ? WHERE idBook = ? AND tglKembali is null`, [data, idBook], (err, result) => {
              conn.query('UPDATE book SET status = ? WHERE idBook = ?', [0, idBook], (error, resultt) => {
                if (!err) {
                    resolve(resultt)
                  } else {
                    reject(new Error(error))
                  }
              })
            if (!err) {
              resolve(result)
            } else {
              reject(new Error(err))
            }
          })
        })
      },
    }