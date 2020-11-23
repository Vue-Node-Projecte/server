module.exports=(sequelize,DataTypes)=>{
    return sequelize.define('Playlists',{
        title:{
            type:DataTypes.STRING,
            allowNull:false
        },
        sequence:{//autoIncrement로 구현하고 싶은데 sequelize에서 하나의 테이블객체에 하나의 autoincremnet만 할수있다고 에러가뜬다 방법이없을까
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        visible:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:true
        }
    },{
        timestamp:true,
        freezeTableName:true
    })
}