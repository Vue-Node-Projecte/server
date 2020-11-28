module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Homeworks', {
        grade: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        classroom: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        closingTime: {
            type: DataTypes.DATE,
            allowNull: false,
            set: function (val) {//"yyyy-mm-dd hh:mm:ss"string 형식으로 들어온걸 month index떄문에 -1, utc시간 맞춰주기 위해 +9 한 후 date인턴스로 변경
                var year = Number(val.substring(0, 4))
                var month = Number(val.substring(5, 7)) - 1
                var day = Number(val.substring(8, 10))
                var hours = Number(val.substring(11, 13)) + 9
                var minutes = Number(val.substring(14, 16))
                return this.setDataValue('closingTime', new Date(year, month, day, hours, minutes))
            },
            get: function () {//date타입으로 되있는걸 실제 시간과 맞춰주기 위해 kor시간에 맞춰주기 위해 hours +9한걸 -9 한 후 다시 date 인스턴스화
                const resultDate = this.getDataValue('closingTime')
                const year = resultDate.getFullYear()
                const month = resultDate.getMonth()
                const day = resultDate.getDate()
                const hours = resultDate.getHours() - 9
                const minutes = resultDate.getMinutes()
                return new Date(year, month, day, hours, minutes)
            }
        },
        deadline: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        submit: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        }
    }, {
        timestamp: true,
        freezeTableName: true
    })
}