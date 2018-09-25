const UserModel = require('./../Utils/testsql');
const User = UserModel.advancedUser;
const uuidPwd = require('./../Utils/encrypt').randomLoginPwd;
const uuid = require('uuid/v1');

/**
 * 添加用户
 * @param _openid
 * @param _login_id
 */
exports.addUser = function(_openids,_openid,_login_id,uuid_pwd){
    let uuid_s = uuid().replace(/-/g,'');
    // let uuid_pwd = uuidPwd();
    User.create({
        advanced_user_id: uuid_s,
        advanced_user_openid: _openid,
        user_login_id: _login_id,
        user_pwd: uuid_pwd
    }).catch(e => {
        console.log(e);
        return e;
    })
};

/**
 * 更改用户状态为已删除
 * @param _openid
 */
exports.deleteUser = function (_openid) {
    User.update({
        where: {

        }
    }).catch(e => {
        console.log(e);
        return e;
    })
};

/**
 * 更改用户状态
 * @param _openid
 * @param room_id
 */
exports.ipdataUser = function (_openid,room_id) {
    User.update({
        current_barrage_room_number: room_id
    },{
        where: {
            advanced_user_openid: _openid
        }
    }).catch(e => {
        return e;
    })
};

exports.findUser = function (room_id) {
    let user = User.find({
        where: {
            user_login_id: room_id
        }
    }).catch(e => {
        return e;
    })
    return user;
};