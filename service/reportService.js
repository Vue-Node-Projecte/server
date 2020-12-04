const {HomeworkReports,IndividualReport,Homeworks,Users, Sequelize} = require('../models')
const moment = require('moment')
const Op = Sequelize.Op;
module.exports={
    setIndividualWordReport:async(userId,completeDate,wordCount,wordAnswerCnt,wordWrongCnt,wordWrong)=>{
        
        const report = await IndividualReport.findOne({where:{UserId:userId,completeDate:completeDate}})
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
            const thisIndividualReport = await IndividualReport.update({wordCount:wordCount,wordAnswerCnt:wordAnswerCnt,wordWrongCnt:wordWrongCnt,wordWrong:wordWrong},{where:{UserId:userId,completeDate:completeDate}})
            if(thisIndividualReport == 0){
                var newError = new Error('wordReport 업데이트실패')
                newError.name = "WrongRequestWordReport"
                throw newError
            }
            return thisIndividualReport
        }
    }
}

// const report = await IndividualReport.findAll({where:{completeDate:{[Op.between]:["2020-11-29","2020-12-02"]}}})