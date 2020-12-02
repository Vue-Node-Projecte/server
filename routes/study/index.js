const express = require('express')
const router = express.Router()
const studyController = require('../../controller/studyController')
const authUtil = require('../../middlewares/authUtil')

router.get('/:courseId',studyController.showStudyMain)
router.get('/word/:courseId/:sequence',studyController.studyWord)
router.get('/sentence/:courseId',studyController.studySentence)
router.get('/question/:courseId',studyController.studyQuestion)

module.exports=router