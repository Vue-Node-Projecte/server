module.exports=(sequelize,DataTypes)=>{
    const organizations = sequelize.define('Organizations',{
        name : {
            type : DataTypes.STRING(10),
            allowNull:false
        }
    },{
        timestamp:true,
        underscored:true,
        freezeTableName:true
    })

    return organizations
}