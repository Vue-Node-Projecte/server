const {Contents, Categories} = require('../models')
const sequelize = require('sequelize')
const Op = sequelize.Op

module.exports={
    searchByKeyword:async(keyword)=>{
        const contents = await Contents.findAll({where:{contentsTitle:{[Op.like]:`%${keyword}%`}},attributes:['id','contentsTitle','url','songInfo','CourseId']})
        return contents
    },
    searchByCategory:async(categoryId)=>{
        const category = await Categories.findByPk(categoryId)
        const list = await category.getContents({attributes:['id','contentsTitle','url','songInfo','CourseId'],joinTableAttributes:[]})
        return list
    }
}