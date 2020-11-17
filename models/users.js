module.exports=(sequelize,DataTypes)=>{
    const users = sequelize.define('Users',{
        email:{
            type : DataTypes.STRING(20),
            allowNull : false
        },
        name:{
            type : DataTypes.STRING(10),            
            allowNull : false
        },
        password : {
            type : DataTypes.STRING(200),
            allowNull:false
        },
        salt : {
            type : DataTypes.STRING(200),
            allowNull:true
        },
        grade:{
            type : DataTypes.INTEGER,
            allowNull:true
        },
        classroom:{
            type : DataTypes.INTEGER,
            allowNull:true
        },
        number:{
            type : DataTypes.INTEGER,
            allowNull:true
        },
        authority :{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    },{
        timestamps:true,
        freezeTableName:true,
        underscored:true
    })

    return users
}