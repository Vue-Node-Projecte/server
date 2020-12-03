const {Courses,Contents,Words,Sentences,Syncs,Questions,Categories} = require('../models')
const categoryService = require('./categoryService')
module.exports={
    createContents:async(url,contentsTitle,songInfo,category)=>{
        const categories = await categoryService.findCategoryById(category)
        const course = await Courses.create()
        const contents = await Contents.create({CourseId:course.dataValues.id,url,songInfo,contentsTitle})
        await contents.addCategories(categories)
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
    },
    findOneContentsByPk:async(contentsId)=>{
        const contents = await Contents.findOne({where:{id:contentsId}})
        console.log('courseService:',contents.dataValues)
        if(!contents){
            var error = new Error("해당 컨텐츠가 없습니다.")
            error.name = "NoContent"
            throw error
        }
        return contents 
    },
    setCategoryList:async(categoryList,contentsId)=>{
        const associatedCategory = await Contents.findOne({where:{id:contentsId},attributes:[],include:[{model:Categories,attributes:{exclude:['createdAt','updatedAt'],through:{attributes:[]}}}]})
        const thisContents = await Contents.findByPk(contentsId)
        associatedCategory.Categories.map(async(v,i)=>{
            var isInclude =  categoryList.includes(v.id)
            if(!isInclude){
                await thisContents.removeCategories(await Categories.findByPk(v.id))
            }
        })
        categoryList.map(async(v)=>{
            await thisContents.addCategories(await Categories.findByPk(v))
        })
    },
    setVisible:async(contentsId,visible)=>{
        const contents = await Contents.update({visible},{where:{id:contentsId}})
        if(contents == 0){
            var newError = new Error('컨텐츠 노출여부 변경 실패')
            newError.name="ContentsVisibleFail"
        }
    },
    updateContents:async(contentsId,contentsTitle,url,songInfo)=>{
        const contents = await Contents.update({contentsTitle,url,songInfo},{where:{id:contentsId}})
        if(contents == 0){
            var newError = new Error('컨텐츠 업데이트 실패-존재하지 않는 컨텐츠값')
            newError.name = "NoRow"
            throw newError
        }
        var courseId = (await Contents.findOne({where:{id:contentsId},include:[{model:Courses}]})).CourseId
        const word = await Words.findOne({where:{CourseId:courseId},attributes:{exclude:['createdAt','updatedAt']}})

        return word
    },
    updateWord:async(wordId,eng,kor)=>{
        const word = await Words.update({eng,kor},{where:{id:wordId}})
        console.log('update:',word)
        if(word == 0){
            var newError = new Error("단어 업데이트 실패-존재하지 않는 단어값")
            newError = "NoRow"
            throw newError
        }
        var courseId = (await Words.findOne({where:{id:wordId},include:[{model:Courses}]})).CourseId
        const sentence = await Sentences.findOne({where:{CourseId:courseId},attributes:{exclude:['createdAt','updatedAt']}})
        return sentence
    },
    updateSentence:async(sentenceId,eng,kor)=>{
        const sentence = await Sentences.update({eng,kor},{where:{id:sentenceId}})
        if(sentence == 0){
            var newError = new Error("문장 업데이트 실패-존재하지 않는 문장값")
            newError = "NoRow"
            throw newError
        }
        var courseId = (await Sentences.findOne({where:{id:sentenceId},include:[{model:Courses}]})).CourseId
        const sync = await Syncs.findOne({where:{CourseId:courseId},attributes:{exclude:['createdAt','updatedAt']},include:[{model:Sentences,attributes:['eng','kor']}]})
        return sync
    },
    updateSync:async(syncId,start,end)=>{
        const sync = await Syncs.update({start,end},{where:{id:syncId}})
        if(sync == 0){
            var newError = new Error("싱크 업데이트 실패-존재하지 않는 싱크값")
            newError = "NoRow"
            throw newError
        }
        var courseId = (await Syncs.findByPk(syncId)).CourseId
        const question = await Questions.findAll({where:{CourseId:courseId}})
        return question
    },
    updateQuestion:async(questionId,questionTitle,questionImg,questionText,questionAnswer,multiChoice,commentary)=>{
        console.log(`${questionTitle}의 텍스트 ${questionText}, 이미지 ${questionImg}`)
        const question = await Questions.update({questionTitle,questionText,questionImg,questionAnswer,multiChoice,commentary},{where:{id:questionId}})
        if(question == 0){
            var newError = new Error("문제 업데이트 실패-존재하지 않는 문제값")
            newError = "NoRow"
            throw newError
        }
    },
    deleteCourse:async(courseId)=>{
        await Courses.destroy({where:{id:courseId}})
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