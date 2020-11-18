module.exports=function async(sequelize,DataTypes){
    return sequelize.define('Contents',{
        ContentsTitle:{
            type:DataTypes.STRING(50),
            allowNull:false
        },
        Url:{
            type:DataTypes.STRING(200),
            allowNull:false
        },
        SongInfo:{
            type:DataTypes.STRING(200),
            allowNull:false
        }
    },{
        freezeTableName:true,
        timetables:true
    })
}