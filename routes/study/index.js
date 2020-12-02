const express = require('express')
const router = express.Router()
const studyController = require('../../controller/studyController')
const authUtil = require('../../middlewares/authUtil')

router.get('/:courseId',studyController.showStudyMain)

module.exports=router