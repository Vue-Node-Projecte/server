const express = require('express')
const router = express.Router()
const userController = require('../../controller/userController')
const authUtil = require('../../middlewares/authUtil')

router.post('/login',userController.login)
router.post('/registration',userController.registration)
router.put('/:userId',authUtil.checkToken,userController.updateUser)
router.delete('/:userId',authUtil.checkToken,userController.deleteUser)

module.exports= router;