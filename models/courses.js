module.exports=function async(sequelize,DataTypes){
    return sequelize.define('Courses',{
        
    },{
        freezeTableName:true,
        timetables:true
    })
}