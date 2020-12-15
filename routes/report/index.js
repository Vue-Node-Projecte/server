const express = require('express')
const router = express.Router()
const reportController = require('../../controller/reportController')
const authUtil = require('../../middlewares/authUtil')

router.post('/wordReport',authUtil.checkStudentToken,reportController.setIndividualWordReport)
router.post('/sentenceReport',authUtil.checkStudentToken,reportController.setIndividualSentenceReport)
router.post('/questionReport',authUtil.checkStudentToken,reportController.setIndividualQuestionReport)
router.post('/homework/:homeworkId/wordHomeWorkReport',authUtil.checkStudentToken,reportController.setHomeworkWordReport)
router.post('/homework/:homeworkId/sentenceHomeworkReport',authUtil.checkStudentToken,reportController.setHomeworkSentenceReport)
router.post('/homework/:homeworkId/questionHomeworkReport',authUtil.checkStudentToken,reportController.setHomeworkQuestionReport)
router.post('/period',authUtil.checkToken,reportController.getPeriodReport)

module.exports=router