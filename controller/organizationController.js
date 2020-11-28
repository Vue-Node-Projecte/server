const util = require('../modules/util')
const responseMessage = require('../modules/responseMessage')
const statusCode = require('../modules/statusCode')
const {organizationService} = require('../service')

module.exports={
    findOrganizationName:async(req,res)=>{
        const {keyword} = req.query
        try{
            const organization = await organizationService.findOrganizationByKeyword(keyword)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.ORGANIZATION_FIND_SUCCESS,organization))
        }catch(err){
            errReturn(err,res)
        }
    },
    registerOrganization:async(req,res)=>{
        const {name} = req.body
        if(!name){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.ORGANIZATION_CREATE_FAIL))
        }
        try{
            await organizationService.createOrganization(name)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.ORGANIZATION_CREATE_SUCCESS))
        }catch(err){
            errReturn(err,res)
        }
    },
    modifyOrganization:async(req,res)=>{
        const {organizationId} = req.params
        const {name} = req.body
        try{
            await organizationService.modifyOrganization(organizationId,name)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.ORGANIZATION_UPDATE_SUCCESS))
        }catch(err){
            errReturn(err,res)
        }
    },
    deleteOrganization:async(req,res)=>{
        const {organizationId} = req.params
        try{
            await organizationService.deleteOrganization(organizationId)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.ORGANIZATION_DELETE_SUCCESS))
        }catch(err){
            errReturn(err,res)
        }
    },
    readAllOrganization:async(req,res)=>{
        try{
            const organizations = await organizationService.readAllOrganization()
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.ORGANIZATION_FIND_SUCCESS,organizations))
        }catch(err){
            errReturn(err,res)
        }
    }
}
const errReturn=(err,res)=>{
    if(err.name=='NoOrganization'){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,err.message))
    }
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,err.message))
}