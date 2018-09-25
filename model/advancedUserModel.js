module.exports = function(sequelize ,DataTypes){
    return sequelize.define('advanced_user',{
        advanced_user_id: {
            type: DataTypes.STRING(32),
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        advanced_user_openid: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'ordinary_user',
                key: 'ordinary_user_openid'
            }
        },
        user_login_id: {
            type: DataTypes.STRING(16),
            allowNull: false
        },
        user_pwd: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        create_time: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        current_barrage_room_number: {
            type: DataTypes.STRING(32),
            defaultValue: null
        }
    },{
        timestamps: false,
        freezeTableName: true,
        tableName: 'advanced_user',
    })
};