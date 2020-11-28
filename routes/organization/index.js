const express = require('express')
const router = express.Router()
const organizationController = require('../../controller/organizationController')
const authUtil = require('../../middlewares/authUtil')

router.get('/search',organizationController.findOrganizationName)
router.get('/registration',authUtil.checkTeacherToken,organizationController.registerOrganization)
router.put('/:organizationId',authUtil.checkTeacherToken,organizationController.modifyOrganization)
router.delete('/:organizationId',authUtil.checkTeacherToken,organizationController.deleteOrganization)
router.get('/',authUtil.checkToken,organizationController.readAllOrganization)

module.exports = router