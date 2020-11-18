module.exports= function async(sequelize, DataTypes){
    return sequelize.define('Categories',{
        categoryName:{
            type:DataTypes.STRING(50),
            allowNull:false
        }
    },{
        freezeTableName:true,
        timetables:true
    })
}