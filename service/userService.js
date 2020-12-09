const {Users,Organizations,Affiliations} = require('../models')

module.exports={
    emailCheck:async(email)=>{
        try{
            const alreadyEmail = await Users.findOne({
                where:{
                    email:email
                },
            })
            return alreadyEmail
        }catch(err){
            throw err
        }
    },
    createTeacher:async(name, authority, organization ,email,password)=>{
        try{
            const user = await Users.create({name,authority,email,password})
            const organizationContent = await Organizations.findOne({where:{name:organization}})
            const affiliation = await Affiliations.create({UserId:user.dataValues.id,OrganizationId:organizationContent.dataValues.id})
            return affiliation
        }catch(err){
            throw err
        }
    },
    createStudent:async(name, authority, organization ,email,password,grade,classroom,number)=>{
        try{
            const user = await Users.create({name,authority,email,password,grade,classroom,number})
            const organizationContent = await Organizations.findOne({where:{name:organization}})
            const affiliation = await Affiliations.create({UserId:user.dataValues.id,OrganizationId:organizationContent.dataValues.id})
            return affiliation
        }catch(err){
            throw err
        }
    },
    login:async(email,password)=>{
        try{
            const alreadyEmailAndPw = await Users.findOne({
                where:{
                    email:email,
                    password:password
                },
                attributes:{exclude:['password','salt']},
                include:[{
                    model:Organizations,
                    as:'affiliationed',
                    attributes:['id','name']
                }]
            })
            return alreadyEmailAndPw
        }catch(err){
            throw err
        }
    },
    readOneById:async(id)=>{
        try{
            const alreadyUser = await Users.findByPk(id)
            if(!alreadyUser){
                var newError = new Error("존재하지 않는 사용자입니다.")
                newError.name = "NotExistUser"
                throw newError
            }
            return alreadyUser
        }catch(err){
            throw err
        }
    },
    update:async(userId,name,email,password,grade,classroom,number)=>{
        await Users.update({name,email,password,grade,classroom,number},{where:{id:userId}})
    },
    delete:async(userId)=>{
        await Users.destroy({where:{id:userId}})
    }
}