const express = require('express')
const router = express.Router()
const contentController = require('../../controller/contentsController')

router.get('/search',contentController.searchByKeyword)
router.get('/moreview/:playlistId',contentController.moreView)
router.get('/search/:categoryId',contentController.searchByCategory)

module.exports = router