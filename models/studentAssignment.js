module.exports=(sequelize,DataTypes)=>{
    return sequelize.define('StudentAssignments',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        }
    })
}