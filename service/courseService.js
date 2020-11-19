const {Courses,Contents,Words,Sentences,Syncs,Questions} = require('../models')

module.exports={
    createContents:async(url,contentsTitle,songInfo)=>{
        const course = await Courses.create()
        const contents = await Contents.create({CourseId:course.dataValues.id,url,songInfo,contentsTitle})
        return contents
    },
    createWords:async(eng,kor,courseId)=>{
        const course = await Courses.findOne({where:{id:courseId}})
        const word = await Words.create({CourseId:course.id,eng:eng,kor:kor})
        return word
    },
    createSentences:async(eng,kor,courseId)=>{
        courseValidation(courseId)
        const sentence = await Sentences.create({CourseId:courseId,eng,kor})
        return sentence
    },
    createSyncs:async(start,end,courseId)=>{
        courseValidation(courseId)
        const sentence = await Sentences.findOne({where:{CourseId:courseId}})
        const sync = await Syncs.create({CourseId:courseId,SentenceId:sentence.id,start,end})
        return sync
    },
    createQuestions:async(questionTitle,questionText,questionImg,questionAnswer,multiChoice,commentary,courseId)=>{
        courseValidation(courseId)
        const question = await Questions.create({questionTitle,questionText,questionImg,questionAnswer,multiChoice,commentary,CourseId:courseId})
        console.log('question:',question)
        return question
    },
    findWords:async(courseId)=>{
        const word = await Sentences.findOne({where:{CourseId:courseId}})
        if(word == null){
            var error = new Error("해당 수업에 대한 값이 없다!")
            error.name="NoContent"
            throw error
        }
        return word
    }
}

const courseValidation = async(courseId) =>{
    const course = await Courses.findOne({where:{id:courseId}})
    if(course == null){
        var customError = new Error("해당 수업이 존재하지 않습니다.")
        customError.name = "NoCourse"
        throw customError
    }
}