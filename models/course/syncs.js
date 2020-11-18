module.exports=function async(sequelize,DataTypes){
    return sequelize.define('Syncs',{
        Start:{
            type:DataTypes.DATE,
            allowNull:false
        },
        End:{
            type:DataTypes.DATE,
            allowNull:false
        }
    },{
        freezeTableName:true,
        timetables:true
    })
}