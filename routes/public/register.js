const express = require('express')
let app = express.Router()
let path = require('path')
let multer = require('multer')

let Storage = multer.diskStorage({
    destination: './../sim_project/public/uploads/',
    filename: (req, file, cb)=>{
        cb(null,file.fieldname+ '_' + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({
    storage: Storage
}).single('file')

// Request Body
// password length minimum 8 characters
// {
//     "firstname": "parthiv",
//     "lastname": "shah",
//     "email" : "xyz@gmail.com",
//     "password": "qwertyuio"
// }

app.post('/', upload, require('./../../controllers/register'))
module.exports = app