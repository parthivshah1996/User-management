let express = require('express')
let app = express()
const envs = require('./.env/envs.json')
const mongoose = require('mongoose')
const cors = require('cors')
let bodyParser = require('body-parser')
let router = express.Router()
const loginRoutes = require('./routes/public/login')
const registerRoutes = require('./routes/public/register')
const userRoutes = require('./routes/private/user')
app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(cors())
app.use(express.json())
router.use(express.static(__dirname + '/public/'))
app.use('/login', loginRoutes)
app.use('/register', registerRoutes)
app.use('/user', userRoutes)

connectToDatabase()

app.listen(3000, function () {
  console.log('App listening on port 3000!')
})

function connectToDatabase() {
  // mongodb connection data
  const mongodbEnvs = envs.mongodb_envs

  // mongoose connection options
  const options = {
    user: mongodbEnvs.MONGO_USER,
    pass: mongodbEnvs.MONGO_PASSWD,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

  // mongodb connection
  mongoose.connect(
    `mongodb://${mongodbEnvs.MONGO_HOSTNAME}:${mongodbEnvs.MONGO_PORT}/${mongodbEnvs.MONGO_DATABASE}`,
    options
  )
  // check if connection is established
  const db = mongoose.connection
  db.on("error", (error) => console.error(error))
  db.once("open", () => console.log("connected to database"))
}