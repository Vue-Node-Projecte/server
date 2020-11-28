const express = require('express')
const router = express.Router()
const homeworkController = require('../../controller/homeworkController')
const authUtil = require('../../middlewares/authUtil')

router.get('/',authUtil.checkTeacherToken,homeworkController.readAllHomework)
router.get('/ongoing',authUtil.checkTeacherToken,homeworkController.ongoingHomework)
router.get('/closed',authUtil.checkTeacherToken,homeworkController.closedHomework)
router.post('/:courseId',authUtil.checkTeacherToken,homeworkController.createHomework)
router.put('/:homeworkId',authUtil.checkTeacherToken,homeworkController.modifyHomework)
router.delete('/:homeworkId',authUtil.checkTeacherToken,homeworkController.deleteHomework)

module.exports=router