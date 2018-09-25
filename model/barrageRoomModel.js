module.exports = function(sequelize, DataTypes){
    return sequelize.define('barrage_room',{
        room_id: {
            type: DataTypes.STRING(32),
            allowNull: false,
            primaryKey: true
        },
        room_login_id: {
            type: DataTypes.STRING(16),
            allowNull: false
        },
        room_login_pwd: {
            type: DataTypes.STRING(6),
            allowNull: false
        },
        create_user_id: {
            type: DataTypes.STRING(32),
            allowNull: false,
            references: {
                model: 'ordinary_user',
                key: 'ordinary_user_openid'
            }
        },
        open_status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        total_people_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        existence_status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        create_time: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    },{
        timestamps: false,
        freezeTableName: true,
        tableName: 'barrage_room'
    })
}