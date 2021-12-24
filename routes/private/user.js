const express = require('express')
let app = express.Router()
let multer = require('multer')
let path = require('path')

const auth = require('./../../middleware/authorization')

let Storage = multer.diskStorage({
    destination: './../sim_project/public/uploads/',
    filename: (req, file, cb)=>{
        cb(null,file.fieldname+ '_' + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({
    storage: Storage
}).single('file')

// Pass header in api for authorization
// x-access-token = "samplevalue"

app.get('/get/:id', auth, require('./../../controllers/user/getUser'))
app.put('/update/:id', auth, upload, require('./../../controllers/user/updateUser'))

module.exports = app