const util = require('../modules/util')
const statusCode = require('../modules/statusCode')
const responseMessage = require('../modules/responseMessage')
const jwtModules = require('../modules/jwt')
const courseService = require('../service/courseService')
module.exports = {
    makeContents: async (req,res) => {
        const {category,url,contentsTitle,songInfo} = req.body;
        if(!category || !url || !contentsTitle || !songInfo){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
        }
        try {
            let token = await jwtModules.tokenCheck(req, res)
            if(!await authorityValidation(token)){
                return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED,responseMessage.UNAUTHORIZED))
            }
            const contents = await courseService.createContents(url,contentsTitle,songInfo)
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.COURSEMAKE_CONTENTS_SUCCESS, contents))
        } catch (err) {
            errorReturn(err,res)
        }
    },
    makeWords: async (req, res) => {
        const {eng,kor, courseId}=req.body;
        if(!eng || !kor || !courseId){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
        }
        try{
            let token = await jwtModules.tokenCheck(req, res)
            if(!await authorityValidation(token)){
                return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED,responseMessage.UNAUTHORIZED))
            }
            const word = await courseService.createWords(eng,kor,courseId)
            console.log('test!',typeof word.dataValues.eng)
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.COURSEMAKE_CONTENTS_SUCCESS, word))
        }catch(err){
            errorReturn(err,res)
        }
    },
    makeSentences: async (req, res) => {
        const {eng,kor, courseId}=req.body;
        if(!eng || !kor || !courseId){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
        }
        try{
            let token = await jwtModules.tokenCheck(req, res)
            if(!await authorityValidation(token)){
                return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED,responseMessage.UNAUTHORIZED))
            }
            const sentence = await courseService.createSentences(eng,kor,courseId)
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.COURSEMAKE_SENTENCE_SUCCESS, sentence))
        }catch(err){
            errorReturn(err,res)
        }
    },
    makeSyncs: async (req, res) => {
        const {start,end,courseId} = req.body
        if(!start || !end || !courseId){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
        }
        try{
            const sync = await courseService.createSyncs(start,end,courseId)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.COURSEMAKE_SYNC_SUCCESS,sync))
        }catch(err){
            errorReturn(err,res)
        }
    },
    makeQuestions: async (req, res) => {
        const parseBodyQuestion = JSON.parse(req.body.question)//프론트와 통신할때는 json형식으로 들어올테니 json.parse제거해주고 한다.
        parseBodyQuestion.map((v)=>{
            var {questionTitle,questionText,questionAnswer,multiChoice,commentary,courseId} = v
            if(!questionTitle || !questionAnswer || !multiChoice || !courseId){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
            }
        })
        try{
            parseBodyQuestion.map(async(v,i)=>{
                var questionImg = req.files[i].location
                console.log('questionImg:',questionImg)
                await courseService.createQuestions(v.questionTitle,v.questionText,questionImg,v.questionAnswer,v.multiChoice,v.commentary,v.courseId)
            })
            res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.COURSEMAKE_QUESTION_SUCCESS))
        }catch(err){
            errorReturn(err,res)
        }
    },

    ////////////////////////
    findwords:async(req,res)=>{ //테스트용
        const {courseId} = req.body
        var starttime = new Date('2020','11','19','12','49','55','22');
        var endtime = new Date('2020','11','19','12','49','57','22')
        var hh=time.getHours().toString();
        var mm = time.getMinutes().toString();
        var ss = time.getSeconds().toString();
        var ms = time.getMilliseconds().toString();
        console.log(`${hh}:${mm}:${ss}:${ms}`)
        var sampletime = new Date()
        var newDate = new Date(sampletime.getFullYear().toString(),sampletime.getDate().toString(),sampletime.getDay().toString(),hh,mm,ss,ms)
        console.log(newDate)
        return res.send(newDate)
        // try{
        //     let token = await jwtModules.tokenCheck(req, res)
        //     if(!await authorityValidation(token)){
        //         return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED,responseMessage.UNAUTHORIZED))
        //     }
        //     const word = await courseService.findWords(courseId)
        //     console.log('!!!',word.eng[0])
        //     return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.COURSEMAKE_CONTENTS_SUCCESS, word))
        // }catch(err){
        //     console.log('error!!!!!!!!!!!!!!!',err)
        //     console.log('@@@@@',err.name)
        //     errorReturn(err,res)
        // }
    }
    ///////////////////////////
}

const authorityValidation = async(token)=>{
    let authority = token.authority
    if(authority === 1){
        return true
    }else{
        return false
    }
}

const errorReturn= (err,res) =>{
    if (err.name == 'TokenExpiredError') {
        return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.UNAUTHORIZED))
    }else if(err.name=='NoContent'){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message))
    } 
    else {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR))
    }
}