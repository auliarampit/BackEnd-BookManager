const conn = require('../config/db')

module.exports = {
    register: (data) => {
        return new Promise((resolve, reject) => {
            conn.query(`INSERT INTO users SET ?`, data, (err, result) => {
                if (!err) {
                    console.log(result);
                    resolve(result)
                } else {
                    console.log(err);
                     reject(err)
                }
            })
        })
    },
    getByEmail: (email) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT iduser, email, fullName, create_at, update_at, salt, password FROM users WHERE email = ?`,email, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })

    }
}