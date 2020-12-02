const {Courses,Contents,Words,Sentences,Syncs,Questions} = require('../models')

module.exports={
    getCourse:async(courseId)=>{
        const course = await Courses.findOne({where:{id:courseId},attributes:{exclude:["createdAt","updatedAt"]},include:[{model:Contents,attributes:{exclude:["createdAt","updatedAt","CourseId"]}},{model:Words,attributes:["eng","kor","id"]},{model:Sentences,attributes:["eng","kor","id"],include:[{model:Syncs,attributes:["start","end","id"]}]}]})
        return course
    }
}