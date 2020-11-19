const express = require('express')
const router = express.Router()
const courseController = require('../../controller/courseController')
const multer = require('multer')
const upload = require('../../modules/multer')
// const upload = multer({
//     dest:'upload/'
// })

router.post('/make/contents',courseController.makeContents)
router.post('/make/word',courseController.makeWords)
router.post('/make/sentence',courseController.makeSentences)
router.post('/make/sync',courseController.makeSyncs)
router.post('/make/question',upload.array('questionImg'),courseController.makeQuestions)
router.post('/',courseController.findwords)

module.exports=router