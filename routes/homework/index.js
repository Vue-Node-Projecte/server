const express = require('express')
const router = express.Router()
const homeworkController = require('../../controller/homeworkController')
const authUtil = require('../../middlewares/authUtil')

router.post('/:courseId',authUtil.checkTeacherToken,homeworkController.createHomework)

module.exports=router