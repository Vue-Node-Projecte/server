const util = require('../modules/util')
const responseMessage = require('../modules/responseMessage')
const statusCode = require('../modules/statusCode')
const {homeworkService} = require('../service')

module.exports={
    createHomework:async(req,res)=>{
        const {courseId} = req.params
        const {closingTime,grade,classroom} = req.body
        if(!closingTime || !grade || !classroom){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.HOMEWORK_CREATE_SUCCESS))
        }
        try{
            const convertToClosingTime = await convertToDate(closingTime)
            const homework = await homeworkService.createHomework(courseId,convertToClosingTime,grade,classroom)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.HOMEWORK_CREATE_SUCCESS,homework))
        }catch(err){
            errReturn(err,res)
        }
    }
}

const errReturn=(err,res)=>{
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,err.message))
}

const convertToDate=async(closingTime)=>{
    console.log(closingTime)
    var year = closingTime.substring(0,4)
    var month = String(Number(closingTime.substring(5,7))-1)
    var date = closingTime.substring(8,10)
    var hours = closingTime.substring(11,13)
    var minutes = closingTime.substring(14,16)
    var seconds = closingTime.substring(17,19)
    return new Date(year,month,date,hours,minutes,seconds)
}