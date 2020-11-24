const express = require('express')
const router = express.Router()
const authUtil = require('../../middlewares/authUtil')
const dashboardController = require('../../controller/dashboardController')

router.get('/playlist',authUtil.checkToken,dashboardController.playlist)

module.exports = router