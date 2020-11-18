module.exports=function async(sequelize,DataTypes){
    return sequelize.define('Questions',{
        QuestionTitle:{
            type:DataTypes.STRING(500),
            allowNull:false
        },
        QuestionText:{
            type:DataTypes.STRING(1000),
            allowNull:true
        },
        QuestionImg:{
            type:DataTypes.STRING(500),
            allowNull:true
        },
        QuestionAnswer:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        MultiChoice:{
           type:DataTypes.STRING,
           get:function(){
               return JSON.parse(this.getDataValue('MultiChoice'))
           },
           set:function(val){
               return this.setDataValue('MultiChoice',JSON.stringify(val))
           },
           allowNull:false
        },
        Commentary:{
            type:DataTypes.TEXT,
            allowNull:true
        }
    },{
        freezeTableName:true,
        timetables:true
    })
}