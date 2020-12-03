const express = require('express')
const router = express.Router()
const studyController = require('../../controller/studyController')
const authUtil = require('../../middlewares/authUtil')

router.get('/:courseId',authUtil.checkToken,studyController.showStudyMain)
router.get('/word/:courseId/:sequence',authUtil.checkToken,studyController.studyWord)
router.get('/sentence/:courseId/:sequence',authUtil.checkToken,studyController.studySentence)
router.get('/question/:courseId/:sequence',authUtil.checkToken,studyController.studyQuestion)

module.exports=router