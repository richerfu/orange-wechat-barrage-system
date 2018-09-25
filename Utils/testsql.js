var sequelize = require('sequelize');
// var sysuser = require('./../model/sysUserModel');

var db = {
    sequelize: new sequelize('wechatbarrage','root','fuyu6666',{
        host: '127.0.0.1',
        dialect: 'mysql',
        port: 3306,
        sync: { force: true },
        pool:{
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    })
}

db.ordinaryUser = db.sequelize.import('./../model/ordinaryUserModel');
db.advancedUser = db.sequelize.import('./../model/advancedUserModel');
db.barrageTable = db.sequelize.import('./../model/barrageTableModel');
db.barrageRoom = db.sequelize.import('./../model/barrageRoomModel');


module.exports = db;