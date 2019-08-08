const model = require('../models/login')
const MiscHelper = require('../helpers/status')

const jwt = require('jsonwebtoken')

module.exports = {
    register: (req, res) => {
        
        const salt = MiscHelper.generatSalt(18)
        const passwordHash = MiscHelper.setPassword(req.body.password, salt)
        console.log(passwordHash.PasswordHash)
        const data = {
            idCard: req.body.idCard,
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
            login(data.email, req.body.password, res)
        })
        .catch((error) => {
            console.log(error)
        })
    },

    getByEmail: (req, res) => {
        const email = req.body.email || req.query.email || ""
        const password = req.body.password || req.query.password || ""
        login(email,password,res)
    }
}

    function login(email, password, res) {
        model.getByEmail(email)
        .then((result) => {
            if(result.length > 0) {
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
        } else {
            return res.json('Email Tidak Terdaftar')
        }
            
        })
        .catch((error) => {
            console.log(error)
        })
}