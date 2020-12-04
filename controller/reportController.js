const util = require('../modules/util')
const responseMessage = require('../modules/responseMessage')
const statusCode = require('../modules/statusCode')
const {
    reportService
} = require('../service')
const moment = require('moment')

module.exports = {
    IndividualWordReport: async (req, res) => {
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
    IndividualSentenceReport: async (req, res) => {
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
    IndividualQuestionReport: async (req, res) => {
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
    HomeworkWordReport: async (req, res) => {

    },
    HomeworkSentenceReport: async (req, res) => {

    },
    HomeworkQuestionReport: async (req, res) => {

    }
}

const errorReturn=(err,res)=>{
    if(err.name=="WrongRequestWordReport"){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.REPORT_UPDATE_WORD_FAIL))
    }else if(err.name=="WrongRequestSentenceReport"){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.REPORT_UPDATE_SENTENCE_FAIL))
    }else if(err.name=="WrongRequestQuestionReport"){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.REPORT_UPDATE_QUESTION_FAIL))
    }
    else{
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,err.message))
    }
}