const bcrypt = require('bcrypt')
const { User } = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('./../config/config')

module.exports = async(req, res) => {
    try{
        if (!(req.body.email && req.body.password)) 
            return res.status(400).json({ message: 'Missing email or password' })

        //  Now find the user by their email address
        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).send('Incorrect email or password.')
        }
    
        // Then validate the Credentials
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) {
            return res.status(400).send('Incorrect email or password.')
        }
        const token = jwt.sign({ userId: user.id, email: user.email }, config.jwtConfig.jwtSecret, {
            expiresIn: config.jwtConfig.jwtExpiration,
        })

        res.status(200).send(token)
    }catch(error){
        return res.status(400).send(error)
    }
}