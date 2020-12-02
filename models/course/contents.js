module.exports=function async(sequelize,DataTypes){
    return sequelize.define('Contents',{
        contentsTitle:{
            type:DataTypes.STRING(50),
            allowNull:false
        },
        url:{
            type:DataTypes.STRING(200),
            allowNull:false
        },
        songInfo:{
            type:DataTypes.STRING(200),
            allowNull:false
        },
        visible:{
            type:DataTypes.BOOLEAN,
            defineValue:true
        }
    },{
        freezeTableName:true,
        timetables:true
    })
}