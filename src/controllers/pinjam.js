const model = require('../models/pinjam')

module.exports = {
  getPinjam: (req, res) => {
    const idBook = req.params.idBook || ''

    model.getPinjam(idBook)
      .then((resultBook) => {
        // const result = resultBook
        res.json(resultBook)
      })
      .catch((error) => {
        console.log(error)
      })
  },

    postPinjam: (req, res) => {
        const data = {
            idBook: req.body.idBook,
            idCard: req.body.idCard,
            tglPinjam: new Date(),
            tglKadarluarsa: req.body.tglKadarluarsa,
        }
        model.postPinjam(data)
          .then((resultBook) => {
            res.json({...data, idBook:resultBook.insertId})
          })
          .catch((error) => {
            console.log(error)
          })
      },

      patchPinjam: (req, res) => {
        const idPinjam = parseInt(req.params.idPinjam) 
        const idBook = parseInt(req.body.idBook)
        const data = {
            tglKembali: new Date(),
        }

        model.patchPinjam(data, idPinjam, idBook)
          .then((resultPinjam) => {
            
            res.json({...data, idPinjam:idBook})
          })
          .catch((error) => {
            console.log(error)
          })
      }
}

function checkDenda(tglKembali,tglKadarluarsa){
  let oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
  let firstDate = tglKembali
  let secondDate = tglKadarluarsa
    // const tglKembali = tglKembali
    // const tglKadarluarsa = tglKadarluarsa
    let diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
    let denda = diffDays * 2000
    if(diffDays > 0 ){
      return denda
    }
}


