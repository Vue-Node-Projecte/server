const express = require('express')
const router = express.Router()
const reportController = require('../../controller/reportController')
const authUtil = require('../../middlewares/authUtil')

router.post('/wordReport',authUtil.checkStudentToken,reportController.setIndividualWordReport)
router.post('/sentenceReport',authUtil.checkStudentToken,reportController.setIndividualSentenceReport)
router.post('/questionReport',authUtil.checkStudentToken,reportController.setIndividualQuestionReport)
router.post('/wordHomeWorkReport',authUtil.checkStudentToken,reportController.setHomeworkWordReport)
router.post('/sentenceHomeworkReport',authUtil.checkStudentToken,reportController.setHomeworkSentenceReport)
router.post('/questionHomeworkReport',authUtil.checkStudentToken,reportController.setHomeworkQuestionReport)

module.exports=router