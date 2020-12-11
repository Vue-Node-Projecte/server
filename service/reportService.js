const {HomeworkReports,IndividualReport,Homeworks,Users, Sequelize,StudentAssignments} = require('../models')
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
        }
    },
    setHomeworkWordReport:async(userId,homeworkId,wordCount,wordAnswerCnt,wordWrongCnt,wordWrong,completeDate)=>{
        const studentAssignment = await StudentAssignments.findOne({where:{UserId:userId,HomeworkId:homeworkId}})
        const homeworkReport = await HomeworkReports.findOne({where:{StudentAssignmentId:(studentAssignment).id}})
        if(homeworkReport == null){
            const newHomeworkReport = await HomeworkReports.create({wordCount,wordAnswerCnt,wordWrongCnt,wordWrong,completeDate})
            await studentAssignment.addHomeworkReport(newHomeworkReport)
        }else{
            homeworkReport.wordWrong.map((v)=>{
                if(!wordWrong.includes(v)){
                    wordWrong.push(v)
                }
            })
            const thisWordReport = await HomeworkReports.update({wordCount,wordAnswerCnt,wordWrongCnt,wordWrong,completeDate},{where:{id:homeworkReport.id}})
            if(thisWordReport == 0){
                var newError = new Error('wordReport 업데이트실패')
                newError.name = "WrongRequestWordReport"
                throw newError
            }
        }
    },
    setHomeworkSentenceReport:async(userId,homeworkId,sentenceCount,sentenceAnswerCnt,sentenceWrongCnt,sentenceWrong,completeDate)=>{
        const studentAssignment = await StudentAssignments.findOne({where:{UserId:userId,HomeworkId:homeworkId}})
        const homeworkReport = await HomeworkReports.findOne({where:{StudentAssignmentId:studentAssignment.id}})
        if(homeworkReport == null){
            const newHomeworkReport = await HomeworkReports.create({sentenceCount,sentenceAnswerCnt,sentenceWrongCnt,sentenceWrong,completeDate})
            await studentAssignment.addHomeworkReport(newHomeworkReport)
        }else{
            homeworkReport.sentenceWrong.map((v)=>{
                if(!sentenceWrong.includes(v)){
                    sentenceWrong.push(v)
                }
            })
            const thisSentenceReport =  await HomeworkReports.update({sentenceCount,sentenceAnswerCnt,sentenceWrongCnt,sentenceWrong},{where:{id:homeworkReport.id}})
            if(thisSentenceReport == 0){
                var newError = new Error("sentenceReport 업데이트 실패")
                newError.name = "WrongRequestSentenceReport"
                throw newError
            }
        }
    },
    setHomeworkQuestionReport:async(userId,homeworkId,questionCount,questionAnswerCnt,questionWrongCnt,questionWrong,completeDate)=>{
        const studentAssignment = await StudentAssignments.findOne({where:{UserId:userId,HomeworkId:homeworkId}})
        const homeworkReport = await HomeworkReports.findOne({where:{StudentAssignmentId:studentAssignment.id}})
        if(homeworkReport == null){
            const newHomeworkReport = await HomeworkReports.create({questionCount,questionAnswerCnt,questionWrongCnt,questionWrong,completeDate})
            await studentAssignment.addHomeworkReport(newHomeworkReport)
        }else{
            homeworkReport.questionWrong.map((v)=>{
                if(!questionWrong.includes(v)){
                    questionWrong.push(v)
                }
            })
            const thisQuestionReport = await HomeworkReports.update({questionCount,questionAnswerCnt,questionWrongCnt,questionWrong,completeDate},{where:{id:homeworkReport.id}})
            if(thisQuestionReport == 0){
                var newError = new Error("questionReport 업데이트 실패")
                newError.name = "WrongRequestQuestionReport"
                throw newError
            }
        }

        const thisHomework = await Homeworks.findOne({where:{id:studentAssignment.HomeworkId}})
        const updateHomework = await Homeworks.update({submit:(thisHomework.submit)+1},{where:{id:thisHomework.id}})
        if(updateHomework == 0){
            var newError = new Error('homework submit업데이트 실패')
            newError.name = "FailToUpdateHomeworkSubmit"
            throw newError
        }
    }
}
const convertDate=async(completeDate)=>{
    return await moment(completeDate).toDate()
}
// const report = await IndividualReport.findAll({where:{completeDate:{[Op.between]:["2020-11-29","2020-12-02"]}}})