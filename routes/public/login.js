const express = require('express')
let app = express.Router()

// Request Body
// password length minimum 8 characters
// {
//     "email" : "xyz@gmail.com",
//     "password": "qwertyuio"
// }
app.post('/', require('./../../controllers/login'))
module.exports = app