const UserModel = require('./../Utils/testsql');
const User = UserModel.ordinaryUser;
const uuid = require('uuid').v1;


/**
 * 查询是否存在该用户
 * @param _openid
 * @returns {*}
 */
exports.findUser = function(_openid){
    let user = User.find({
        where: {
            ordinary_user_openid: _openid
        }
    }).catch(e => {
        return e;
    });
    return user
};
/**
 * 新用户关注公众号
 * @param _openid
 */
exports.addUser = function(_openid){
    let uuid_id = uuid().replace(/-/g,'');
    User.create({
        ordinary_user_id: uuid_id,
        ordinary_user_openid: _openid,
        barrage_room_number: null
    }).catch(e => {
        console.log(e);
        return e;
    })
};

exports.updateOldUser = function(_openid){
    User.update({
        user_status: 0
    },{
        where:{
            ordinary_user_openid: _openid
        }
    }).catch(e => {
        return e;
    })
};

/**
 * 用户加入聊天室
 * @param _openid
 * @param room_id
 */
exports.updateUserRoomId = function (_openid,room_id) {
    User.update({
        barrage_room_number: room_id
    },{
        where: {
            ordinary_user_openid: _openid
        }
    }).catch(e => {
        console.error(e);
        return e;
    })
};

/**
 * 用户取消关注改变用户状态
 * @param _openid
 */
exports.deleteUser = function(_openid){
    User.update({
        user_status: 1
    },{
        where: {
            ordinary_user_openid: _openid
        }
    }).catch(e => {
        console.log(e);
        return e;
    })
};

/**
 * 查询是否有当前加入的弹幕房间
 * @param _openid
 */
exports.findUserRoomId = function (_openid) {
    let res = User.find({
        where: {
            ordinary_user_openid: _openid
        }
    }).catch(e => {
        return e;
    });
    return res;
};

/***
 * 退出当前房间
 * @param _openid
 */
exports.layOut = function (_openid) {
    User.update({
        barrage_room_number: null
    },{
        where: {
            ordinary_user_openid: _openid
        }
    }).catch(e => {
        return e;
    })
};