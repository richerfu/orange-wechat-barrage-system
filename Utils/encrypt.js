/**
 * 
 * 封装加密模块
 */

 const crypto = require('crypto');
 const moment = require('moment');

 /**
  * sha1加密方法
  * @param {String} _string
  * @return {String} 
  */
 exports.getsha1 = function(_string){
     const hash = crypto.createHash('sha1');
     hash.update(_string,'utf8');
     return hash.digest('hex');
 };

 /**
  * md5加密方法
  * @param {String} _string 
  * @return {String} 
  */
 exports.getmd5 = function(_string){
     const md5 = crypto.createHash('md5');
     md5.update(_string,'utf8');
     return md5.digest('hex');
 };

/**
 * 生成随机字符串
 * @param randomFlag
 * @param min
 * @param max
 * @returns {string}
 */
 exports.randomString = function(randomFlag, min, max){
    let str = "",
    range = min,
    arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
      'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
      'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;// 任意长度
    }
    for (let i = 0; i < range; i++) {
        pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    return str;
 };


/**
 * 生成随机登录密码
 * @returns {string}
 */
 exports.randomLoginPwd = function(){
    let randomFlag = false,max = 6,min = 6;
    let str = "",
    range = min,
    arr = ['0','1','2','3','4','5','6','7','8','9'];

    if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;// 任意长度
    }
    for (let i = 0; i < range; i++) {
        pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    return str;
 };

/**
 * 生成随机房间名用作登录名
 * @returns {string}
 */
exports.randomRoomId = function () {
    let day = moment().format('YYYYMMDD');
     let randomFlag = false,max = 4,min = 4;
     let str = "",
         range = min,
         arr = ['0','1','2','3','4','5','6','7','8','9'];

     if (randomFlag) {
         range = Math.round(Math.random() * (max - min)) + min;// 任意长度
     }
     for (let i = 0; i < range; i++) {
         pos = Math.round(Math.random() * (arr.length - 1));
         str += arr[pos];
     }
     return day + str;
 };