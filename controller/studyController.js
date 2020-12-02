const util = require('../modules/util')
const responseMessage = require('../modules/responseMessage')
const statusCode = require('../modules/statusCode')
const {studyService} = require('../service')

module.exports={
    showStudyMain:async(req,res)=>{
        const {courseId} = req.params
        try{
            const study = await studyService.getCourse(courseId)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.STUDY_READ_COURSE_SUCCESS,study))
        }catch(err){

        }
    }
}