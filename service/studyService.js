const {Courses,Contents,Words,Sentences,Syncs,Questions,WordsContainers} = require('../models')

module.exports={
    getCourse:async(courseId)=>{
        const course = await Courses.findOne({where:{id:courseId},attributes:{exclude:["createdAt","updatedAt"]},include:[{model:Contents,attributes:{exclude:["createdAt","updatedAt","CourseId"]}},{model:Words,attributes:["eng","kor","id"]},{model:Sentences,attributes:["eng","kor","id"],include:[{model:Syncs,attributes:["start","end","id"]}]}]})
        return course
    },
    getWord:async(courseId,sequence)=>{
        const wordContainerList = await WordsContainers.findAll()
        const wordListRandom = Math.floor(Math.random()*wordContainerList.length)
        const bogiWordArray = [wordContainerList[wordListRandom].word]

        const word = await Words.findOne({where:{CourseId:courseId},attributes:["id","eng","kor"]})
        bogiWordArray.push(...createBogi(word,sequence))
        
        const [shuffleBogi,answerIndex] = shuffleArr(bogiWordArray)
        console.log('shuffleBogi:',shuffleBogi,'index:',answerIndex)
        word.dataValues.testList = shuffleBogi
        word.dataValues.answerIndex = answerIndex
        // console.log(typeof word)

        // const testInformation ={"testList":shuffleBogi,"answerIndex":answerIndex}
        // word[testInformation].push(testInformation)
        return word
    },
    getSentence:async(courseId)=>{

    },
    getQuestion:async(courseId)=>{

    }
}
const createBogi = (word,sequence)=>{
    const bogiWordArray = new Array()
    var cnt =0
    while(cnt<2){
        var filterWord = filterBogi(word,sequence)
        if(bogiWordArray.includes(filterWord)){
            continue
        }else{
            bogiWordArray.push(filterWord)
            cnt++
        }
    }
    bogiWordArray.push(word.eng[sequence])
    return bogiWordArray
}

const filterBogi = (word,sequence) =>{
    const randomIndex = Math.floor(Math.random()*word.eng.length)
    if(word.eng[sequence] == word.eng[randomIndex]){
        return filterBogi(word,sequence)
    }else{
        return word.eng[randomIndex]
    }
}

const shuffleArr = (bogiWordArray)=>{
    const answerWord = bogiWordArray[3]
    console.log('바뀌기전 arr:',bogiWordArray)
    bogiWordArray.sort(function(){
        return Math.random()-Math.random()
    })
    const answerIndex = bogiWordArray.indexOf(answerWord)
    console.log('바뀐 arr:',bogiWordArray)
    console.log('정답index',answerIndex)
    return [bogiWordArray,answerIndex]
}