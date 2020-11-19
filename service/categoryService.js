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
        const contents = await Contents.findOne({where:{id:3}})
        const categories = await Categories.findOne({where:{id:3}})
        const result = await contents.addCategories(categories)
        console.log(result)
        // await Categories.findByPk(3).then(async(categories)=>{
        //     console.log('contents:',categories.dataValues)
        //     await Contents.findByPk(3).then(async (contents)=>{
        //         const result = await categories.addCategories(contents)
        //         console.log(result)
        //     })
        // })
        const category = await Categories.findAll({attributes:['id','categoryName']})
        return category
    }
}