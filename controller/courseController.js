const util=require('../modules/util')
const statusCode = require('../modules/statusCode')
const responseMessage = require('../modules/responseMessage')
const jwtModules=require('../modules/jwt')
module.exports={
    makeContents:async(req,res)=>{
        const {category, url, courseTitle} = req.body;
        return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.COURSEMAKE_CONTENTS_SUCCESS,{category,url,courseTitle}))
    },
    makeWords:async(req,res)=>{

    },
    makeSentences:async(req,res)=>{

    },
    makeSyncs:async(req,res)=>{

    },
    makeQuestions:async(req,res)=>{

    }
}