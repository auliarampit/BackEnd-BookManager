const jwt = require('jsonwebtoken')
// const MixHelper = require('../helpers/status')

// const allwedAccess = process.env.REQUEST_HEADER

module.exports = {
    authInfo: (req, res, next) => {
        const headerAuth = req.headers['authorization']
        const headerSecret = req.headers['x-access-token']
        console.log('yvgjjg '+headerSecret +"hhunj   "+headerAuth)

        if (typeof headerSecret === 'undefined') {
             next()
        } else if (headerAuth !== 'x-header') {
            return res.json("ga boleh masuk")
        } else {
            const bearerToken = headerSecret.split(' ')
            const token = bearerToken[1]
            req.token = token
            console.log(typeof token)
            console.log(`Token strored! ${req.token}`)
            next()
        }
    },

    accesstoken: (req, res, next) => {
        const secretKey = 'KueAvam'
        const accessToken = req.token
        const userToken = req.headers['x-control-user']

        jwt.verify(accessToken, secretKey, (err, decode) => {
            console.log(req.token)
            if (err && err.name === 'TokenExpiredError') return  res.json("token habis")

            if (err && err.name === 'JsonWebTokenError') return res.json("token ga guna")

            if (parseInt(userToken) !== parseInt(decode.iduser)) return res.json("token ga jelas")
            console.log(decode)
            next()
        })
    }
}