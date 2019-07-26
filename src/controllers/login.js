const model = require('../models/login')
const MiscHelper = require('../helpers/status')

const jwt = require('jsonwebtoken')

module.exports = {
    register: (req, res) => {
        const salt = MiscHelper.generatSalt(18)
        const passwordHash = MiscHelper.setPassword(req.body.password, salt)
        console.log(passwordHash.PasswordHash)
        const data = {
            email: req.body.email,
            fullName: req.body.fullName,
            password: passwordHash.PasswordHash,
            salt: passwordHash.salt,
            token: 'yuhu',
            status: 1,
            create_at: new Date(),
            update_at: new Date()
        }
        model.register(data) 
        .then((resultRegister) => {
            console.log(resultRegister)
            res.json(resultRegister)
        })
        .catch((error) => {
            console.log(error)
        })
    },

    login : (req, res) => {
        const email = req.body.email
        const password = req.body.password
        console.log(req.body)
        model.getByEmail(email)
        .then((result) => {
            const dataUser = result[0]
            const usePassword = MiscHelper.setPassword(password, dataUser.salt).PasswordHash

            if (usePassword == dataUser.password) {
                dataUser.token = jwt.sign({
                    iduser: dataUser.iduser
                }, process.env.SECRET_KEY, { expiresIn: '1h' })

                delete dataUser.salt
                delete dataUser.password
                console.log(dataUser)
                return res.json(dataUser)
            } else {
                return res.json("Password Salah")
            }
            
        })
        .catch((error) => {
            console.log(error)
        })
    }
}