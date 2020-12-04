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
        try {
            const individualWordReport = await reportService.setIndividualWordReport(id, completeDate, wordCount, wordAnswerCnt, wordWrongCnt, wordWrong)
            if (individualWordReport == 1) {
                return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.REPORT_UPDATE_WORD_SUCCESS))
            } else {
                return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.REPORT_UPDATE_WORD_SUCCESS, individualWordReport))
            }
        }catch(err){
            errorReturn(err,res)
        }
    },
    IndividualSentenceReport: async (req, res) => {

    },
    IndividualQuestionReport: async (req, res) => {

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
        return res.status(statusCode.BAD_REQUEST).sent(util.fail(statusCode.BAD_REQUEST,err.message))
    }else{
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,err.message))
    }
}