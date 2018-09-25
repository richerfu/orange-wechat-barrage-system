var barrageRoom = require('./barrageRoomModel');

module.exports = function(sequelize, DataTypes){
    const tables = sequelize.define('barrage_table',{
        barrage_id: {
            type: DataTypes.STRING(32),
            allowNull: false,
            primaryKey: true
        },
        barrage_room_login_id: {
            type: DataTypes.STRING(16),
            allowNull:false
        },
        barrage_room_id: {
            type: DataTypes.STRING(32),
            allowNull:false,
            references: {
                model: 'barrage_room',
                key: 'room_id'
            }
        },
        table_status: {
            type: DataTypes.STRING(2),
            allowNull: false,
            defaultValue: true
        },
        table_create_time: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    },{
        timestamps: false,
        freezeTableName: true,
        tableName: 'barrage_table'
    })

    return tables;
}