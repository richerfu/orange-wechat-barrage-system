const UserModel = require('./../Utils/testsql');
const BarrageTable = UserModel.barrageTable;

/**
 * 增加弹幕房间表
 * @param _uuid
 * @param _login_id
 * @param room_id
 */
exports.addTable = function(_uuid,_login_id,room_id){
    BarrageTable.create({
        barrage_id: _uuid,
        barrage_room_login_id: _login_id,
        barrage_room_id: room_id
    }).catch(e => {
        console.log(e);
        return e;
    })
};

/**
 * 删除弹幕房间数据表
 * @param _uuid
 */
exports.deleteTable = function (_uuid) {
    BarrageTable.update({
        where: {

        }
    }).catch(e => {
        console.log(e);
        return e;
    })
};

/**
 * 查询房间数据表
 * @param room_id
 */
exports.findRoomID = function (room_id) {
    let res = BarrageTable.find({
        where: {
            barrage_room_id: room_id
        }
    }).catch(e => {
        return e;
    })
    return res;
};