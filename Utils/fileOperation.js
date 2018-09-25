/**
 * 
 * 封装文件操作
 * FileToJson   JSON文件转JSON
 * JsonToFile   JSON转JSON文件
 * 
 */

 var fs = require('fs');

 /**
  * 读取json文件转为json
  * @param {String} _url 
  */
 exports.FileToJson = function(_url){
    try{
        var data = fs.readFileSync(_url,'utf-8');
        return data;
    }catch(e){
        return e;
    }
 }

 /**
  * 将json数据写成json文件
  * @param {String} _url 
  * @param {Object} _data 
  */
 exports.JsonToFile = function(_url,_data){
    var writedata = JSON.stringify(_data);
    try{
        fs.writeFileSync(_url,writedata);
    }catch(e){
        return e;
    }
    
 }