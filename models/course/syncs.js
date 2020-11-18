module.exports=function async(sequelize,DataTypes){
    return sequelize.define('Syncs',{
        start:{
            type:DataTypes.STRING,
            get:function(){
                return JSON.parse(this.getDataValue('start'))
            },
            set: function(val){
                return this.setDataValue('start',JSON.stringify(val))
            }
        },
        end:{
            type:DataTypes.STRING,
            get:function(){
                return JSON.parse(this.getDataValue('end'))
            },
            set: function(val){
                return this.setDataValue('end',JSON.stringify(val))
            }
        }
    },{
        freezeTableName:true,
        timetables:true
    })
}