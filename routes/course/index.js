const express = require('express')
const router = express.Router()
const courseController = require('../../controller/courseController')

router.post('/make/contents',courseController.makeContents)
router.post('/make/word',courseController.makeWords)
router.post('/make/sentence',courseController.makeSentences)
router.post('/make/sync',courseController.makeSyncs)
router.post('/make/question',courseController.makeQuestions)

module.exports=router