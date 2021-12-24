const Joi = require('joi')
const mongoose = require('mongoose')

const User = mongoose.model('users', new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    profileImage: {
        type: String
    }
}))

function validateUser(user) {
    const schema = Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(8).required(),
        profileImage: Joi.string()
    })
    return schema.validate(user)
}

exports.User = User
exports.validate = validateUser
