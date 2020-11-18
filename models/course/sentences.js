module.exports=function async(sequelize,DataTypes){
    return sequelize.define('Sentences',{
        Eng:{
            type:DataTypes.STRING(200),
            allowNull:false
        },
        Kor:{
            type:DataTypes.STRING(200),
            allowNull:false
        }
    },{
        freezeTableName:true,
        timetables:true
    })
}