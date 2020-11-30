const crypto = require('crypto')
const util = require('../modules/util')
const responseMessage = require('../modules/responseMessage')
const statusCode = require('../modules/statusCode')
const {userService} = require('../service')
const jwt =require('../modules/jwt')
module.exports={
    registration:async(req,res)=>{
        const {name, authority, organizationId,email,password,grade,classroom,number} = req.body;
        if(!name || !authority || !organizationId || !email || !password){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
        }
        try{
            const alreadyEmail = await userService.emailCheck(email)
            if(alreadyEmail != null){
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.ALREADY_ID))
            }
            let affiliation
            if(authority==1){
                affiliation = await userService.createTeacher(name,authority,organizationId,email,password)
            }else{
                affiliation = await userService.createStudent(name, authority, organizationId,email,password,grade,classroom,number)
            }
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.SIGN_UP_SUCCESS,affiliation))
        }catch(err){
            console.log(err)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,responseMessage.SIGN_UP_FAIL))
        }
    },
    login:async(req,res)=>{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
        }
        try{
            const user = await userService.login(email,password)
            if(user == null){
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NO_USER))
            }
            let token = await jwt.sign(user)
            res.cookie("token",token.accessToken)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.SIGN_IN_SUCCESS,user))
        }catch(err){
            console.log(err)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,responseMessage.INTERNAL_SERVER_ERROR))
        }   
    },
    updateUser:async(req,res)=>{
        const {userId} = req.params
        const {name,grade,classroom,number,email,password}= req.body
        if(!name || !email || !password || !grade || !classroom || !number ){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
        }
        try{
            await userService.update(userId,name,email,password,grade,classroom,number)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.MEMBER_UPDATE_SUCCESS))
        }catch(err){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,err.message))
        }
    },
    deleteUser:async(req,res)=>{
        const {userId} = req.params
        if(!userId){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
        }
        try{
            await userService.delete(userId)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.MEMBER_DELETE_SUCCESS))
        }catch(err){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,err.message))
        }
    },
    }