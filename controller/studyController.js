const util = require('../modules/util')
const responseMessage = require('../modules/responseMessage')
const statusCode = require('../modules/statusCode')
const {studyService} = require('../service')

module.exports={
    showStudyMain:async(req,res)=>{
        const {courseId} = req.params
        try{
            const study = await studyService.getCourse(courseId)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.STUDY_READ_COURSE_SUCCESS,study))
        }catch(err){
            errorReturn(err,res)
        }
    },
    studyWord:async(req,res)=>{
        const {courseId,sequence} = req.params
        try{
            const wordTest = await studyService.getWord(courseId,sequence)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.STUDY_WORD_SUCCESS,wordTest))
        }catch(err){
            errorReturn(err,res)
        }
    },
    studySentence:async(req,res)=>{
        const {courseId} = req.params
        try{
            const sentenceTest = await studyService.getSentence(courseId)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.STUDY_SENTENCE_SUCCESS,sentenceTest))
        }catch(err){
            errorReturn(err,res)
        }
    },
    studyQuestion:async(req,res)=>{
        const {courseId} = req.params
        try{
            const questionTest = await studyService.getQuestion(courseId)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.STUDY_QUESTION_SUCCESS,questionTest))
        }catch(err){
            errorReturn(err,res)
        }
    }
}

const errorReturn=async(err,res)=>{
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,err.message))
}