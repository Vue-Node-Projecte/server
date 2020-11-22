const {Organizations} = require('../models')
const sequelize = require('sequelize')
const Op = sequelize.Op

module.exports={
    findOrganizationByKeyword:async(keyword)=>{
        const organizations = await Organizations.findAll({where:{name:{[Op.like]:`%${keyword}%`}},attributes:['id','name']})
        return organizations
    }
}