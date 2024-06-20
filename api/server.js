require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const corsOptions = require('./config/corsOptions')

const Autenticate = require('./middleware/vertify_token')

// Cross Origin Resource Sharing
app.use(cors(corsOptions))
// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }))

// built-in middleware for json
app.use(express.json())

app.use('/image', express.static(__dirname + '/uploads'))

//router login and register
app.use('/login', require('./route/loginRoute'))
app.use('/filter', require('./route/filterRoute'))

app.use(Autenticate)
app.use('/admin', require('./route/productRoute'))



module.exports = {
    path: '/api',
    handler: app
}