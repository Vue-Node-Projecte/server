const express = require('express')
const router = express.Router()
const categoryController = require('../../controller/categoryController')

router.post('/create',categoryController.createCategory)
router.get('/all',categoryController.allCategory)
router.delete('/:categoryId',categoryController.deleteCategory)

module.exports=router