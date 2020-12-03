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
        if(sequence >= word.eng.length){
            word.dataValues.sequence = -1
            return word
        }
        bogiWordArray.push(...createBogi(word,sequence))
        
        const [shuffleBogi,answerIndex] = shuffleArr(bogiWordArray)
        word.dataValues.testList = shuffleBogi
        word.dataValues.answerIndex = answerIndex
        word.dataValues.sequence = Number(sequence)
        
        return word
    },
    getSentence:async(courseId,sequence)=>{
        const sentence = await Sentences.findOne({where:{CourseId:courseId},attributes:['id','eng','kor']})
        if(sequence>= sentence.eng.length){
            sentence.dataValues.sequence=Number(-1)
            return sentence
        }
        const testLevel = Math.floor(Math.random()*3+1)

        if(testLevel == 1){
            console.log('level 1')
            const [sentenceTest,testAnswer] = rowLevelSentence(sentence,sequence)
            sentence.dataValues.sentenceTest = sentenceTest
            sentence.dataValues.testAnswer = testAnswer
            sentence.dataValues.sequence = Number(sequence)
            sentence.dataValues.level = testLevel
            return sentence
        }else if(testLevel == 2){
            console.log('level 2')
            const[sentenceTest,testAnswer]=middleLevelSentence(sentence,sequence)
            sentence.dataValues.sentenceTest = sentenceTest
            sentence.dataValues.testAnswer = testAnswer
            sentence.dataValues.sequence = Number(sequence)
            sentence.dataValues.level = testLevel
            return sentence
        }
        else{
            console.log('level 3')
            const[sentenceTest,testAnswer]=highLevelSentence(sentence,sequence)
            sentence.dataValues.sentenceTest = sentenceTest
            sentence.dataValues.testAnswer = testAnswer
            sentence.dataValues.sequence = Number(sequence)
            sentence.dataValues.level = testLevel
            return sentence
        }
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

const rowLevelSentence = (sentence,sequence) =>{    //영어를 한국어로 번역
    console.log('sentence:',sentence)
    const sentenceTest = sentence.eng[sequence]
    const testAnswer = sentence.kor[sequence]
    console.log(`sentenceTest:${sentenceTest}, testAnswer:${testAnswer}`)
    return [sentenceTest, testAnswer]
}

const middleLevelSentence = (sentence,sequence)=>{  //영어 빈칸 맞추기
    const thisSentence = sentence.eng[sequence]
    var subSentenceTest = thisSentence.split(" ")
    var sentenceTest = thisSentence.split(" ")
    var testAnswer = new Array()
    var cnt = 0
    while(cnt<sentenceTest.length/2){
        const selectIndex = Math.floor(Math.random()*(sentenceTest.length-1))
        if(testAnswer.includes(selectIndex)){
            continue
        }else{
            testAnswer.push(selectIndex)
            sentenceTest[selectIndex]="_"
            cnt++
        }
    }
    testAnswer.sort()
    testAnswer.map((v,i)=>{
        testAnswer[i] = subSentenceTest[v]
    })
    return [sentenceTest,testAnswer]
}

const highLevelSentence = (sentence,sequence)=>{    //한국어보고 영어 다쓰기
    const sentenceTest = sentence.kor[sequence]
    const testAnswer = sentence.eng[sequence]
    return [sentenceTest,testAnswer]
}