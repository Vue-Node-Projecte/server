const {Categories,Contents} = require('../models')

module.exports={
    createCategory:async(categoryName)=>{
        const alreadyCategory = await Categories.findOne({where:{categoryName:categoryName}})
        if(alreadyCategory){
            var newError = new Error("해당 카테고리는 존재합니다.")
            newError.name = "AlreadyCategory"
            throw newError
        }
        const category = await Categories.create({categoryName})
        return category
    },
    findAllCategory:async()=>{
        const category = await Categories.findAll({attributes:['id','categoryName']})
        return category
    },
    findCategoryById:async(id)=>{
        const category = await Categories.findByPk(id)
        if(category==null){
            var newError = new Error("카테고리가 없습니다")
            newError.name = "NoCategory"
            throw newError
        }
        return category
    },
    deleteCategory:async(categoryId)=>{
        await Categories.destroy({where:{id:categoryId}})
    }
}