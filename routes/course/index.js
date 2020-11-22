const express = require('express')
const router = express.Router()
const courseController = require('../../controller/courseController')
const multer = require('multer')
const upload = require('../../modules/multer')
const authUtil = require('../../middlewares/authUtil')
// const upload = multer({
//     dest:'upload/'
// })

router.post('/make/contents',authUtil.checkTeacherToken,courseController.makeContents)
router.post('/make/word',authUtil.checkTeacherToken,courseController.makeWords)
router.post('/make/sentence',authUtil.checkTeacherToken,courseController.makeSentences)
router.post('/make/sync',authUtil.checkTeacherToken,courseController.makeSyncs)
router.post('/make/question',authUtil.checkTeacherToken,upload.array('questionImg'),courseController.makeQuestions)
router.post('/',authUtil.checkTeacherToken,courseController.findwords)

module.exports=router