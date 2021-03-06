const jwt = require('../modules/jwt')
const responseMessage = require('../modules/responseMessage')
const statusCode = require('../modules/statusCode')
const util = require('../modules/util')
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;
const authUtil={
    checkTeacherToken: async(req,res,next)=>{
        var token = req.headers.jwt;
        if(!token){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.EMPTY_TOKEN))
        }
        const user = await jwt.verify(token);
        if(user === TOKEN_EXPIRED){
            return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED,responseMessage.EXPIRED_TOKEN))
        } 
        if(user === TOKEN_INVALID){
            return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED,responseMessage.EXPIRED_TOKEN))
        } 
        if(user.id === undefined){
            return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED,responseMessage.INVALID_TOKEN))
        }
        if(user.authority !=1){
            return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED,responseMessage.CAN_ACCESS_TEACHER))
        }
        req.decoded = user;
        next();
    },
    checkStudentToken: async(req,res,next)=>{
        var token = req.headers.jwt;
        if(!token){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.EMPTY_TOKEN))
        }
        const user = await jwt.verify(token);
        if(user === TOKEN_EXPIRED){
            return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED,responseMessage.EXPIRED_TOKEN))
        } 
        if(user === TOKEN_INVALID){
            return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED,responseMessage.EXPIRED_TOKEN))
        } 
        if(user.id === undefined){
            return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED,responseMessage.INVALID_TOKEN))
        }
        if(user.authority != 2){
            return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED,responseMessage.CAN_ACCESS_STUDENT))
        }
        req.decoded = user;
        next();
    },
    checkToken:async(req,res,next)=>{
        var token = req.headers.jwt;
        if(!token){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.EMPTY_TOKEN))
        }
        const user = await jwt.verify(token);
        if(user === TOKEN_EXPIRED){
            return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED,responseMessage.EXPIRED_TOKEN))
        } 
        if(user === TOKEN_INVALID){
            return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED,responseMessage.EXPIRED_TOKEN))
        } 
        if(user.id === undefined){
            return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED,responseMessage.INVALID_TOKEN))
        }
        req.decoded = user;
        next();
    }
}

module.exports=authUtil