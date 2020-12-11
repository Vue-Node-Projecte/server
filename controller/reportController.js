const util = require('../modules/util')
const responseMessage = require('../modules/responseMessage')
const statusCode = require('../modules/statusCode')
const {
    reportService
} = require('../service')
const moment = require('moment')

module.exports = {
    setIndividualWordReport: async (req, res) => {
        const {
            wordCount,
            wordAnswerCnt,
            wordWrongCnt,
            wordWrong,
            completeDate
        } = req.body
        const {
            id
        } = req.decoded
        if(!wordCount||!wordAnswerCnt||!wordWrongCnt||!completeDate){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
        }
        try {
            await reportService.setIndividualWordReport(id, completeDate, wordCount, wordAnswerCnt, wordWrongCnt, wordWrong)
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.REPORT_UPDATE_WORD_SUCCESS))
        }catch(err){
            errorReturn(err,res)
        }
    },
    setIndividualSentenceReport: async (req, res) => {
        const {sentenceCount,sentenceAnswerCnt,sentenceWrongCnt,sentenceWrong,completeDate} = req.body
        const {id} = req.decoded
        if(!sentenceCount||!sentenceAnswerCnt||!sentenceWrongCnt||!completeDate){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
        }
        try{
            await reportService.setIndividualSentenceReport(id,completeDate,sentenceCount,sentenceAnswerCnt,sentenceWrongCnt,sentenceWrong)
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.REPORT_UPDATE_SENTENCE_SUCCESS))
        }catch(err){
            errorReturn(err,res)
        }
    },
    setIndividualQuestionReport: async (req, res) => {
        const {questionCount,questionAnswerCnt,questionWrongCnt,questionWrong,completeDate}=req.body
        const {id}=req.decoded
        if(!questionCount||!questionAnswerCnt||!questionWrongCnt||!completeDate){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
        }
        try{
            await reportService.setIndividualQuestionReport(id,completeDate,questionCount,questionAnswerCnt,questionWrongCnt,questionWrong)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.REPORT_UPDATE_QUESTION_SUCCESS))
        }catch(err){
            errorReturn(err,res)
        }
    },
    setHomeworkWordReport: async (req, res) => {
        const {homeworkId} = req.params
        const {wordCount,wordAnswerCnt,wordWrongCnt,wordWrong,completeDate}=req.body
        const {id}=req.decoded
        if(!wordCount||!wordAnswerCnt||!wordWrongCnt||!completeDate){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
        }
        try{
            await reportService.setHomeworkWordReport(id,homeworkId,wordCount,wordAnswerCnt,wordWrongCnt,wordWrong,completeDate)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.REPORT_UPDATE_WORD_SUCCESS))
        }catch(err){
            errorReturn(err,res)
        }
    },
    setHomeworkSentenceReport: async (req, res) => {
        const {homeworkId} = req.params
        const {sentenceCount,sentenceAnswerCnt,sentenceWrongCnt,sentenceWrong,completeDate}=req.body
        const {id} = req.decoded
        if(!sentenceCount||!sentenceAnswerCnt||!sentenceWrongCnt||!completeDate){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
        }
        try{
            await reportService.setHomeworkSentenceReport(id,homeworkId,sentenceCount,sentenceAnswerCnt,sentenceWrongCnt,sentenceWrong,completeDate)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.REPORT_UPDATE_SENTENCE_SUCCESS))
        }catch(err){
            errorReturn(err,res)
        }
    },
    setHomeworkQuestionReport: async (req, res) => {
        const {homeworkId} = req.params
        const {questionCount,questionAnswerCnt,questionWrongCnt,questionWrong,completeDate} = req.body
        const {id} = req.decoded
        if(!questionCount||!questionAnswerCnt||!questionWrongCnt||!completeDate){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
        }
        try{
            await reportService.setHomeworkQuestionReport(id,homeworkId,questionCount,questionAnswerCnt,questionWrongCnt,questionWrong,completeDate)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.REPORT_UPDATE_QUESTION_SUCCESS))
        }catch(err){
            errorReturn(err,res)
        }
    }
}

const errorReturn=(err,res)=>{
    if(err.name=="WrongRequestWordReport"){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.REPORT_UPDATE_WORD_FAIL))
    }else if(err.name=="WrongRequestSentenceReport"){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.REPORT_UPDATE_SENTENCE_FAIL))
    }else if(err.name=="WrongRequestQuestionReport"){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.REPORT_UPDATE_QUESTION_FAIL))
    }else if(err.name=="FailToUpdateHomeworkSubmit"){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,err.message))
    }
    else{
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,err.message))
    }
}