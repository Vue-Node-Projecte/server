const express = require('express')
const router = express.Router()
const playlistController = require('../../controller/playlistController')
const authUtil = require('../../middlewares/authUtil')

router.post('/registration',authUtil.checkTeacherToken,playlistController.register)
router.post('/addition/:playlistId',authUtil.checkTeacherToken,playlistController.additional)
router.put('/:id',authUtil.checkStudentToken,playlistController.modify)
router.delete('/:playlistId/:contentsId',authUtil.checkTeacherToken,playlistController.delete)

module.exports=router