const express = require('express')
const router = express.Router()
const translateController = require('../../controller/translateController')

router.get('/',translateController.translate)

module.exports = router