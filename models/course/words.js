module.exports=function async(sequelize,DataTypes){
    return sequelize.define('Words',{
        Eng:{
            type:DataTypes.STRING(50),
            allowNull:false
        },
        Kor:{
            type:DataTypes.STRING(50),
            allowNull:false
        }
    },{
        freezeTableName:true,
        timetables:true
    })
}