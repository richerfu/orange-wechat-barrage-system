const UserModel = require('./../Utils/testsql');
const barrageRoom = UserModel.barrageRoom;
const uuid = require('uuid/v1');

/**
 * 增加房间信息
 * @param room_id
 * @param _login_id
 * @param open_id
 * @param room_pwd
 */
exports.addRoom = function(room_id,_login_id,open_id,room_pwd){
    let uuid_s = uuid().replace(/-/g,'');
    barrageRoom.create({
        room_id: room_id,
        room_login_id: _login_id,
        create_user_id: open_id,
        room_login_pwd: room_pwd
    }).catch(e => {
        console.log(e);
        return e;
    })
};

/**
 * 获取登录ID
 */
exports.getRoomLoginId = function () {
    barrageRoom.count({
        where: {
            open_status: true
        }
    }).then(data => {
        console.log(data);
    }).catch(e => {
        console.log(e);
        return e;
    })
};

/**
 * 删除弹幕墙
 * @param room_id
 */
exports.deleteRoom = function (room_id) {
    barrageRoom.update({
        existence_status: 1
    },{
        room_login_id: room_id
    }).catch(e => {
        return e;
    })
};
