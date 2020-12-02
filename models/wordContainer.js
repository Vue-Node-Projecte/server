const { sequelize } = require(".");

module.exports=(sequelize,DataTypes)=>{
    return sequelize.define('WordsContainers',{
        word:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{
        freezeTableName:true,
        timetables:true
    })
}