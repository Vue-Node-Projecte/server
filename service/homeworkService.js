const {Homeworks,Courses,Users,Reports,StudentAssignments} = require('../models')

module.exports={
    createHomework:async(courseId,closingTime,grade,classroom)=>{
        const course = await Courses.findByPk(courseId)
        const students = (await Users.findAll({where:{grade,classroom}}))
        const total = students.length
        const homework = await Homeworks.create({grade,classroom,closingTime,total})
        const test = await course.addHomework(homework)
    
        students.map(async(v,i)=>{
            const studentAssignment = await StudentAssignments.findByPk((await homework.addUser(await Users.findByPk(v.id)))[0].id)
            const studentReport = await Reports.create()
            console.log('추가된 assignment : ',studentAssignment.dataValues)
            console.log('studentReport : ',studentReport)
            await studentAssignment.addReport(studentReport)
        })
        return test
    }
}