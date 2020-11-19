module.exports=function async(sequelize,DataTypes){
    return sequelize.define('Questions',{
        questionTitle:{
            type:DataTypes.STRING(500),
            allowNull:false
        },
        questionText:{
            type:DataTypes.STRING(1000),
            allowNull:true
        },
        questionImg:{
            type:DataTypes.STRING(500),
            allowNull:true
        },
        questionAnswer:{
            type:DataTypes.STRING,
           get:function(){
               return JSON.parse(this.getDataValue('questionAnswer'))
           },
           set:function(val){
               return this.setDataValue('questionAnswer',JSON.stringify(val))
           },
           allowNull:false
        },
        multiChoice:{
           type:DataTypes.STRING,
           get:function(){
               return JSON.parse(this.getDataValue('multiChoice'))
           },
           set:function(val){
               return this.setDataValue('multiChoice',JSON.stringify(val))
           },
           allowNull:false
        },
        commentary:{
            type:DataTypes.TEXT,
            allowNull:true
        }
    },{
        freezeTableName:true,
        timetables:true
    })
}