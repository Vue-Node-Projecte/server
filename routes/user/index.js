const express = require('express')
const crypto = require('crypto')
const router = express.Router()
const userController = require('../../controller/userController')

router.post('/login',userController.login)

router.post('/registration',userController.registration)

module.exports= router;