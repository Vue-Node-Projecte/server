const {Users,Organizations} = require('.')

module.exports = (sequelize,DataTypes)=>{
    return sequelize.define('Affiliations',{
        UserId:{
            type:DataTypes.INTEGER,
            reference:{
                model:Users,
                key:'id'
            }
        },
        OrganizationId:{
            type:DataTypes.INTEGER,
            reference:{
                model:Organizations,
                key:'id'
            }
        }
    },{
        freezeTableName:true,
        timetables:true
    })
}