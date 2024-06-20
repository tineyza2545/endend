const express = require('express')
const router = express.Router()
const { handleLogin } = require('../controller/loginController')

router.post('/user', handleLogin)

module.exports = router
