const moment = require('moment')
module.exports=(sequelize,DataTypes)=>{
    return sequelize.define('IndividualReports',{
        completeDate:{//학생의 공부일
            type:DataTypes.DATEONLY,
            set:function(val){
                return this.setDataValue('completeDate',moment(val).toDate())
            }
        },
        wordRate:{//단어 정답률
            type:DataTypes.INTEGER,
            defaultValue:0,
            get:function(){
                return Number((this.getDataValue('wordAnswerCnt')/this.getDataValue('wordCount')).toFixed(2))
            },
        },
        wordCount:{//학습 단어 갯수
            type:DataTypes.INTEGER,
            defaultValue:0,
        },
        wordAnswerCnt:{//단어 정답 갯수
            type:DataTypes.INTEGER,
            defaultValue:0
        },
        wordWrongCnt:{//단어 오답 갯수
            type:DataTypes.INTEGER,
            defaultValue:0
        },
        wordWrong:{//틀린단어
            type:DataTypes.STRING,
            set:function(val){
                return this.setDataValue('wordWrong',JSON.stringify(val))
            },
            get:function(){
                return JSON.parse(this.getDataValue('wordWrong'))
            },
            defaultValue:"[]"
        },
        sentenceRate:{//문장 정답률
            type:DataTypes.INTEGER,
            defaultValue:0,
            get:function(){
                return Number((this.getDataValue('sentenceAnswerCnt')/this.getDataValue('sentenceCount')).toFixed(2))
            }
        },
        sentenceCount:{//학습 문장 갯수
            type:DataTypes.INTEGER,
            defaultValue:0
        },
        sentenceAnswerCnt:{//문장 정답 갯수
            type:DataTypes.INTEGER,
            defaultValue:0
        },
        sentenceWrongCnt:{//문장 오답 갯수
            type:DataTypes.INTEGER,
            defaultValue:0
        },
        sentenceWrong:{//틀린 문장
            type:DataTypes.STRING,
            set:function(val){
                return this.setDataValue('sentenceWrong',JSON.stringify(val))
            },
            get:function(){
                return JSON.parse(this.getDataValue('sentenceWrong'))
            },
            defaultValue:"[]"
        },
        questionRate:{//문제 정답률
            type:DataTypes.INTEGER,
            defaultValue:0,
            get:function(){
                return Number((this.getDataValue('questionAnswerCnt')/this.getDataValue('questionCount')).toFixed(2))
            }
        },
        questionCount:{//학습 문제 갯수
            type:DataTypes.INTEGER,
            defaultValue:0
        },
        questionAnswerCnt:{//문제 정답 갯수
            type:DataTypes.INTEGER,
            defaultValue:0
        },
        questionWrongCnt:{//문제 오답 갯수
            type:DataTypes.INTEGER,
            defaultValue:0
        },
        questionWrong:{//틀린문제
            type:DataTypes.STRING,
            set:function(val){
                return this.setDataValue('questionWrong',JSON.stringify(val))
            },
            get:function(){
                return JSON.parse(this.getDataValue('questionWrong'))
            },
            defaultValue:"[]"
        }
    })
}