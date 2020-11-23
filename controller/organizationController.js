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
            console.log(err)
            throw err
        }
    }
}