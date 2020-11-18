module.exports=function async(sequelize,DataTypes){
    return sequelize.define('Sentences',{
        eng:{
            type:DataTypes.STRING,
            get:function(){
                return JSON.parse(this.getDataValue('eng'))
            },
            set: function(val){
                return this.setDataValue('eng',JSON.stringify(val))
            }
        },
        kor:{
            type:DataTypes.STRING,
            get:function(){
                return JSON.parse(this.getDataValue('kor'))
            },
            set: function(val){
                return this.setDataValue('kor',JSON.stringify(val))
            }
        }
    },{
        freezeTableName:true,
        timetables:true
    })
}