const crypto = require('crypto')

module.exports = {
    generatSalt : (length) =>  {
        return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length)
    },
    setPassword: (password, salt) => {
        let hash = crypto.createHmac('sha512', salt)
        hash.update(password)
        let value = hash.digest('hex')
        return  {
            salt: salt,
            PasswordHash: value 
        }
    }
}