const {Homeworks,Courses,Users,Reports,StudentAssignments} = require('../models')

module.exports={
    createHomework:async(courseId,closingTime,grade,classroom)=>{
        const course = await Courses.findByPk(courseId)
        const students = (await Users.findAll({where:{grade,classroom}}))
        const total = students.length
        console.log('closingTime!!!!!!!!!!!! : ',typeof closingTime)
        const homework = await Homeworks.create({grade,classroom,closingTime,total})
        await course.addHomework(homework)
    
        students.map(async(v,i)=>{
            const studentAssignment = await StudentAssignments.findByPk((await homework.addUser(await Users.findByPk(v.id)))[0].id)
            const studentReport = await Reports.create()
            await studentAssignment.addReport(studentReport)
        })
    },
    modifyHomework:async(homeworkId,closingTime)=>{
        await Homeworks.update({closingTime},{where:{id:homeworkId}})
        const test = await Homeworks.findByPk(homeworkId)
        return test.closingTime
    },
    readAll:async()=>{
        const homework = await Homeworks.findAll({attributes:{exclude:['createdAt','updatedAt']}})
        return homework
    },
    isDeadline:async(deadline)=>{
        const homework = await Homeworks.findAll({where:{deadline},attributes:{exclude:['createdAt','updatedAt']}})
        return homework
    },
    deleteHomework:async(homeworkId)=>{
        const homework = await Homeworks.destroy({where:{id:homeworkId}})
    }
}