const {HomeworkReports,IndividualReport,Homeworks,Users, Sequelize} = require('../models')
const moment = require('moment')
const Op = Sequelize.Op;
module.exports={
    setIndividualWordReport:async(userId,completeDate,wordCount,wordAnswerCnt,wordWrongCnt,wordWrong)=>{
        const convertDate = moment(completeDate).toDate()
        const report = await IndividualReport.findOne({where:{UserId:userId,completeDate:convertDate}})
        if(report == null || report.length==0){
            const newIndividualReport = await IndividualReport.create({completeDate:completeDate,wordCount,wordAnswerCnt,wordWrongCnt,wordWrong})
            await (await Users.findByPk(userId)).addIndividualReport(newIndividualReport)
            return newIndividualReport
        }else{
            wordCount += report.wordCount
            wordAnswerCnt += report.wordAnswerCnt
            wordWrongCnt += report.wordWrongCnt
            report.wordWrong.map((v)=>{
                if(!wordWrong.includes(v)){
                    wordWrong.push(v)
                }
            })
            const thisIndividualReport = await IndividualReport.update({wordCount,wordAnswerCnt,wordWrongCnt,wordWrong},{where:{UserId:userId,completeDate:completeDate}})
            if(thisIndividualReport == 0){
                var newError = new Error('wordReport 업데이트실패')
                newError.name = "WrongRequestWordReport"
                throw newError
            }
            return thisIndividualReport
        }
    },
    setIndividualSentenceReport:async(userId,completeDate,sentenceCount,sentenceAnswerCnt,sentenceWrongCnt,sentenceWrong)=>{
        const convertDate = moment(completeDate).toDate()
        console.log(convertDate)
        const report = await IndividualReport.findOne({where:{UserId:userId,completeDate:convertDate}})
        if(report == null){
            const newIndividualReport = await IndividualReport.create({sentenceCount,sentenceAnswerCnt,sentenceWrongCnt,sentenceWrong,completeDate})
            await(await Users.findByPk(userId)).addIndividualReport(newIndividualReport)
            return newIndividualReport
        }else{
            sentenceCount += report.sentenceCount
            console.log(report.sentenceCount)
            sentenceAnswerCnt += report.sentenceAnswerCnt
            sentenceWrongCnt += report.sentenceWrongCnt
            report.sentenceWrong.map((v)=>{
                if(!sentenceWrong.includes(v)){
                    sentenceWrong.push(v)
                }
            })
            const thisIndividualReport = await IndividualReport.update({sentenceCount,sentenceAnswerCnt,sentenceWrongCnt,sentenceWrong},{where:{UserId:userId,completeDate:completeDate}})
            if(thisIndividualReport == 0){
                var newError = new Error('sentenceReport 업데이트실패')
                newError.name = "WrongRequestSentenceReport"
                throw newError
            }
            return thisIndividualReport
        }
    },
    setIndividualQuestionReport:async(userId,completeDate,questionCount,questionAnswerCnt,questionWrongCnt,questionWrong)=>{
        const convertDate = moment(completeDate).toDate()
        const report = await IndividualReport.findOne({where:{UserId:userId,completeDate:convertDate}})
        if(report==null){
            const newIndividualReport = await IndividualReport.create({questionCount,questionAnswerCnt,questionWrongCnt,questionWrong,completeDate})
            await(await Users.findByPk(userId)).addIndividualReport(newIndividualReport)
            return newIndividualReport
        }else{
            questionCount += report.questionCount
            questionAnswerCnt += report.questionAnswerCnt
            questionWrongCnt += report.questionWrongCnt
            report.questionWrong.map((v)=>{
                if(!questionWrong.includes(v)){
                    questionWrong.push(v)
                }
            })
            const thisIndividualReport = await IndividualReport.update({questionCount,questionAnswerCnt,questionWrongCnt,questionWrong},{where:{UserId:userId,completeDate:completeDate}})
            if(thisIndividualReport == 0){
                var newError = new Error('sentenceReport 업데이트실패')
                newError.name = "WrongRequestQuestionReport"
                throw newError
            }
            return thisIndividualReport
        }
    }
}
const convertDate=async(completeDate)=>{
    return await moment(completeDate).toDate()
}
// const report = await IndividualReport.findAll({where:{completeDate:{[Op.between]:["2020-11-29","2020-12-02"]}}})