const util = require('../modules/util')
const statusCode = require('../modules/statusCode')
const responseMessage = require('../modules/responseMessage')
const courseService = require('../service/courseService')
const userService = require('../service/userService')
module.exports = {
    makeContents: async (req, res) => {
        const {
            id
        } = req.decoded;
        console.log(`id:${id}, authority:${authority}`)
        const {
            category,
            url,
            contentsTitle,
            songInfo
        } = req.body;
        if (!category || !url || !contentsTitle || !songInfo) {
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE))
        }
        try {
            await userService.readOneById(id)
            const contents = await courseService.createContents(url, contentsTitle, songInfo, category)
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.COURSEMAKE_CONTENTS_SUCCESS, contents))
        } catch (err) {
            errorReturn(err, res)
        }
    },
    makeWords: async (req, res) => {
        const {
            eng,
            kor,
            courseId
        } = req.body;
        if (!eng || !kor || !courseId) {
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE))
        }
        try {
            const word = await courseService.createWords(eng, kor, courseId)
            console.log('test!', typeof word.dataValues.eng)
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.COURSEMAKE_CONTENTS_SUCCESS, word))
        } catch (err) {
            errorReturn(err, res)
        }
    },
    makeSentences: async (req, res) => {
        const {
            eng,
            kor,
            courseId
        } = req.body;
        if (!eng || !kor || !courseId) {
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE))
        }
        try {
            const sentence = await courseService.createSentences(eng, kor, courseId)
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.COURSEMAKE_SENTENCE_SUCCESS, sentence))
        } catch (err) {
            errorReturn(err, res)
        }
    },
    makeSyncs: async (req, res) => {
        const {
            start,
            end,
            courseId
        } = req.body
        if (!start || !end || !courseId) {
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE))
        }
        try {
            const sync = await courseService.createSyncs(start, end, courseId)
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.COURSEMAKE_SYNC_SUCCESS, sync))
        } catch (err) {
            errorReturn(err, res)
        }
    },
    makeQuestions: async (req, res) => {
        const parseBodyQuestion = JSON.parse(req.body.question) //프론트와 통신할때는 json형식으로 들어올테니 json.parse제거해주고 한다.
        parseBodyQuestion.map((v) => {
            var {
                questionTitle,
                questionText,
                questionAnswer,
                multiChoice,
                commentary,
                courseId
            } = v
            if (!questionTitle || !questionAnswer || !multiChoice || !courseId) {
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE))
            }
        })
        try {
            // parseBodyQuestion.map(async(v,i)=>{
            //     var questionImg=null
            //     if(v.questionText == undefined){
            //         if(req.files.length>0){
            //             console.log(req.files)
            //             questionImg = req.files[i].location
            //         }else{
            //             var newError = new Error('이미지파일이나 txt 둘중 하나는 꼭 작성해야한다.')
            //             newError.name = "ImgOrText"
            //             throw newError
            //         }
            //     }
            //     await courseService.createQuestions(v.questionTitle,v.questionText,questionImg,v.questionAnswer,v.multiChoice,v.commentary,v.courseId)
            // })
            var questionImgLength = req.files.length
            var questionImgCnt = 0
            parseBodyQuestion.map(async (v, i) => {
                var questionImg = null
                if (v.questionText == undefined) {
                    if (questionImgLength > 0) {
                        questionImg = req.files[questionImgCnt].location
                        questionImgCnt++
                    } else {
                        var newError = new Error('이미지파일이나 txt 둘중 하나는 꼭 작성해야한다.')
                        newError.name = "ImgOrText"
                        throw newError
                    }
                }
                await courseService.createQuestions(v.questionTitle,v.questionText,questionImg,v.questionAnswer,v.multiChoice,v.commentary,v.courseId)
            })
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.COURSEMAKE_QUESTION_SUCCESS))
        } catch (err) {
            errorReturn(err, res)
        }
    },
    updateContents: async (req, res) => {
        const {
            contentsId
        } = req.params
        const {
            contentsTitle,
            url,
            songInfo,
            categoryList
        } = req.body
        try {
            const word = await courseService.updateContents(contentsId, contentsTitle, url, songInfo)
            await courseService.setCategoryList(categoryList, contentsId)
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.CONTENTS_UPDATE_SUCCESS, word))
        } catch (err) {
            errorReturn(err, res)
        }
    },
    updateWord: async (req, res) => {
        const {
            wordId
        } = req.params
        const {
            eng,
            kor
        } = req.body
        if (!eng || !kor) {
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.WORD_UPDATE_FAIL))
        }
        try {
            const sentence = await courseService.updateWord(wordId, eng, kor)
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.WORD_UPDATE_SUCCESS, sentence))
        } catch (err) {
            errorReturn(err, res)
        }
    },
    updateSentence: async (req, res) => {
        const {
            sentenceId
        } = req.params
        const {
            eng,
            kor
        } = req.body
        if (!eng || !kor) {
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.SENTENCE_UPDATE_FAIL))
        }
        try {
            const sync = await courseService.updateSentence(sentenceId, eng, kor)
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SENTENCE_UPDATE_SUCCESS, sync))
        } catch (err) {
            errorReturn(err, res)
        }
    },
    updateSync: async (req, res) => {
        const {
            syncId
        } = req.params
        const {
            start,
            end
        } = req.body
        if (!start || !end) {
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.SYNC_UPDATE_FAIL))
        }
        try {
            const question = await courseService.updateSync(syncId, start, end)
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SYNC_UPDATE_SUCCESS, question))
        } catch (err) {
            errorReturn(err, res)
        }

    },
    updateQuestion: async (req, res) => {
        const question = JSON.parse(req.body.question)
        question.map((v) => {
            var {
                questionId,
                questionTitle,
                questionText,
                questionAnswer,
                multiChoice,
                commentary,
                courseId
            } = v
            if (!questionId ||!questionTitle || !questionAnswer || !multiChoice || !courseId) {
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE))
            }
        })
        try {
            var questionImgLength = req.files.length
            var questionImgCnt = 0
            console.log(question.length)
            question.map(async (v, i) => {
                var questionImg = null;
                if(v.questionText == ""){
                    if(questionImgLength>0){
                        questionImg = req.files[questionImgCnt].location
                        questionImgCnt++
                    }else{
                        var newError = new Error('이미지파일이나 txt 둘중 하나는 꼭 작성해야한다.')
                        newError.name = "ImgOrText"
                        throw newError
                    }
                }
                await courseService.updateQuestion(v.questionId,v.questionTitle,questionImg,v.questionText,v.questionAnswer,v.multiChoice,v.commentary)
            })
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.QUESTION_UPDATE_SUCCESS))
        } catch (err) {
            errorReturn(err, res)
        }
    },
    deleteCourse:async(req,res)=>{
        const {courseId} = req.params
        try{
            await courseService.deleteCourse(courseId)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.COURSE_DELETE_SUCCESS))
        }catch(err){
            errorReturn(err,res)
        }
    },
    ////////////////////////
    findwords: async (req, res) => { //테스트용
        const {
            courseId
        } = req.body
        var starttime = new Date('2020', '11', '19', '12', '49', '55', '22');
        var endtime = new Date('2020', '11', '19', '12', '49', '57', '22')
        var hh = time.getHours().toString();
        var mm = time.getMinutes().toString();
        var ss = time.getSeconds().toString();
        var ms = time.getMilliseconds().toString();
        console.log(`${hh}:${mm}:${ss}:${ms}`)
        var sampletime = new Date()
        var newDate = new Date(sampletime.getFullYear().toString(), sampletime.getDate().toString(), sampletime.getDay().toString(), hh, mm, ss, ms)
        console.log(newDate)
        return res.send(newDate)

    }
    ///////////////////////////
}

const errorReturn = (err, res) => {
    if (err.name == 'TokenExpiredError') {
        return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.UNAUTHORIZED))
    } else if (err.name == 'NoRow') {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message))
    } else if (err.name == 'NotExistUser') {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message))
    } else if (err.name == 'NoTeacher') {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message))
    } else if (err.name == 'ImgOrText') {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message))
    } else {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR))
    }
}