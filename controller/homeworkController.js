const util = require('../modules/util')
const responseMessage = require('../modules/responseMessage')
const statusCode = require('../modules/statusCode')
const {homeworkService} = require('../service')
const moment = require('moment')

module.exports={
    createHomework:async(req,res)=>{
        const {courseId} = req.params
        const {closingTime,grade,classroom} = req.body
        if(!closingTime || !grade || !classroom){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.HOMEWORK_CREATE_SUCCESS))
        }
        try{
            var convertToClosingTime = convertToDate(closingTime)
            console.log('convertToClosingTime : ',convertToClosingTime)
            await homeworkService.createHomework(courseId,convertToClosingTime,grade,classroom)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.HOMEWORK_CREATE_SUCCESS))
        }catch(err){
            errReturn(err,res)
        }
    },
    modifyHomework:async(req,res)=>{
        const {homeworkId} = req.params
        const {closingTime} = req.body
        if(!closingTime){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.HOMEWORK_CREATE_SUCCESS))
        }
        try{
            // var convertToClosingTime = convertToDate(closingTime)
            const homework = await homeworkService.modifyHomework(homeworkId,closingTime)
            var month = homework.getMonth()
            var day = homework.getDate()
            var hours = homework.getHours()
            var filtermoment = moment(homework).format('YYYY-MM-DD HH:mm:ss')
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.HOMEWORK_UPDATE_SUCCESS,{filtermoment,month,day,hours}))
        }catch(err){
            errReturn(err,res)
        }
    },
    readAllHomework:async(req,res)=>{
        try{
            const homework = await homeworkService.readAll()
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.HOMEWORK_READ_SUCCESS,homework))
        }catch(err){
            errReturn(err,res)
        }
    },
    ongoingHomework:async(req,res)=>{
        try{
            const homework = await homeworkService.isDeadline(0)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.HOMEWORK_READ_SUCCESS,homework))
        }catch(err){
            errReturn(err,res)
        }
    },
    closedHomework:async(req,res)=>{
        try{
            const homework = await homeworkService.isDeadline(1)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.HOMEWORK_READ_SUCCESS,homework))
        }catch(err){
            errReturn(err,res)
        }
    },
    deleteHomework:async(req,res)=>{
        const {homeworkId} = req.params
        try{
            await homeworkService.deleteHomework(homeworkId)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.HOMEWORK_DELETE_SUCCESS))
        }catch(err){
            errReturn(err,res)
        }
    }
}

const errReturn=(err,res)=>{
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,err.message))
}

const convertToDate=(closingTime)=>{
    console.log(closingTime)
    var year = Number(closingTime.substring(0,4))
    var month = Number(closingTime.substring(5,7))-1
    var day = Number(closingTime.substring(8,10))
    var hours = Number(closingTime.substring(11,13))+9
    var minutes = Number(closingTime.substring(14,16))
    var seconds = Number(closingTime.substring(17,19))
    console.log(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`)
    console.log('test !!!!!!!!!:',new Date(closingTime))
    var setMoment = moment(new Date(year,month,day,hours,minutes,seconds))//.format('YYYY-MM-DD HH:mm:ss') //여기까진 원하는 date형태로 들어가는데 db에 들어가게되면 day값과 hours시간이 이상하게됨.
    return setMoment
}