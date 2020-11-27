const {Homeworks,Courses,Users} = require('../models')

module.exports={
    createHomework:async(courseId,closingTime,grade,classroom)=>{
        const course = await Courses.findByPk(courseId)
        const total = (await Users.findAll({where:{grade,classroom}})).length
        const homework = await Homeworks.create({grade,classroom,closingTime,total})
        await course.addHomework(homework)
        return total
    }
}