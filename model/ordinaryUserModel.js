/**
 * 普通用户
 */

 module.exports = function(sequelize, DataTypes){
     return sequelize.define('barrage_ordinary_user',{
         ordinary_user_id:{
             type: DataTypes.STRING(32),
             allowNull: false
         },
         ordinary_user_openid: {
             type: DataTypes.STRING,
             allowNull: false,
             primaryKey: true
         },
         subscribe_time: {
             type: DataTypes.DATE,
             allowNull: false,
             defaultValue: DataTypes.NOW
         },
         user_status: {
             type: DataTypes.STRING(2),
             allowNull: false,
             defaultValue: 0
         },
         barrage_room_number: {
             type: DataTypes.STRING(32),
             allowNull: true
         }
     },{
        timestamps: false,
        freezeTableName: true,
        tableName: 'ordinary_user',
     })
 }