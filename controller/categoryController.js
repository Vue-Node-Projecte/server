const util = require('../modules/util')
const responseMessage = require('../modules/responseMessage')
const statusCode = require('../modules/statusCode')
const categoryService = require('../service/categoryService')

module.exports={
    createCategory:async(req,res)=>{
        const {categoryName} = req.body
        if(!categoryName){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
        }
        try{
            const category = await categoryService.createCategory(categoryName)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.CATEGORY_CREATE_SUCCESS,category))
        }catch(err){
            errorReturn(err,res)
        }
    },
    allCategory:async(req,res)=>{
        try{
            const category = await categoryService.findAllCategory()
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.CATEGORY_FIND_SUCCESS,category))
        }catch(err){
            errorReturn(err,res)
        }
    },
    deleteCategory:async(req,res)=>{
        const {categoryId} = req.params
        try{
            await categoryService.deleteCategory(categoryId)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.CATEGORY_DELETE_SUCCESS))
        }catch(err){
            errorReturn(err,res)
        }
    }
}

const errorReturn= (err,res) =>{
    if (err.name == 'TokenExpiredError') {
        return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.UNAUTHORIZED))
    }else if(err.name=='NoContent'){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message))
    } 
    else {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR))
    }
}