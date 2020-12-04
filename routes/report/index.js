const express = require('express')
const router = express.Router()
const reportController = require('../../controller/reportController')
const authUtil = require('../../middlewares/authUtil')

router.post('/wordReport',authUtil.checkStudentToken,reportController.IndividualWordReport)
router.post('/sentenceReport',authUtil.checkStudentToken,reportController.IndividualSentenceReport)
router.post('/questionReport',authUtil.checkStudentToken,reportController.IndividualQuestionReport)

module.exports=router