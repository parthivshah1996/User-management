const config = require('./../config/config')
const jwt = require('jsonwebtoken')

const authorize = async(req, res, next) => {
    const token = req.headers["x-access-token"]
    if (!token) {
        return res.status(403).send("Token is required")
    }
    let jwtPayload
    //Try to validate the token and get data
    try {
        jwtPayload = jwt.verify(token, config.jwtConfig.jwtSecret)
        req.user = jwtPayload
    } catch (error) {
        //If token is not valid, respond with 401 (unauthorized)
        return res.status(401).send("Token is not valid")
    }   
    return next()
}

module.exports = authorize