const util = require('../modules/util')
const responseMessage = require('../modules/responseMessage')
const statusCode = require('../modules/statusCode')
const organizationService = require('../service/organizationService')

module.exports={
    findOrganizationName:async(req,res)=>{
        const {keyword} = req.query
        console.log('keyword:',keyword)
        try{
            const organization = await organizationService.findOrganizationByKeyword(keyword)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.ORGANIZATION_FIND_SUCCESS,organization))
        }catch(err){
            console.log(err)
            throw err
        }
    }
}