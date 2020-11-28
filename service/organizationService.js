const {Organizations,Users} = require('../models')
const sequelize = require('sequelize')
const Op = sequelize.Op

module.exports={
    findOrganizationByKeyword:async(keyword)=>{
        const organizations = await Organizations.findAll({where:{name:{[Op.like]:`%${keyword}%`}},attributes:['id','name']})
        return organizations
    },
    createOrganization:async(name)=>{
       await Organizations.create({name:name})
    },
    modifyOrganization:async(organizationId,name)=>{
        const organizations = await Organizations.update({name},{where:{id:organizationId}})
        if(organizations==0){
            var newError = new Error('기관이 없습니다.')
            newError.name ="NoOrganization"
            throw newError
        }
    },
    deleteOrganization:async(organizationId)=>{
        await Organizations.destroy({where:{id:organizationId}})
    },
    readAllOrganization:async()=>{
        const organizations = await Organizations.findAll()
        return organizations
    }
}