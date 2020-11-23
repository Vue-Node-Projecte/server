const express = require('express')
const router = express.Router()
const organizationController = require('../../controller/organizationController')

router.get('/search',organizationController.findOrganizationName)

module.exports = router