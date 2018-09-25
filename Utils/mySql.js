/**
 * 封装数据库语句
 */

 var mysql = require('mysql');
 var file = require('./../Utils/fileOperation');
 const _FileUrl = process.cwd() + '/Config/MySqlConfig.json';
// var _FileUrl = './../Config/MySqlConfig.json';
 var uuid = require('uuid/v1');
 const uniqueString = require('unique-string');
 var randomString = require('./../Utils/encrypt').randomString;

 var _configstring = file.FileToJson(_FileUrl);
 var _config = JSON.parse(_configstring);

 /**
  *配置数据库连接池
  */
 var pool = mysql.createPool({
    connectionLimit: 50,
    host : _config.URL,
    port : _config.PORT,
    database : _config.DataBaseName,
    user : _config.UserName,
    password : _config.UserPwd,
    multipleStatements: true
 })

 /**
  * 封装查询语句 修改
  * @param {String} _sqlstring 
  * @param {Array} _sqldata 
  */
 exports.sqlquery = function(_sqlstring,_sqldata){
     return new Promise((resolve,reject) => {
         pool.getConnection((err, connection) => {
             if(err){
                 reject(err);
                 return;
             }
             connection.query(_sqlstring,_sqldata, (errors, res) => {
                 if(errors){
                     reject(errors);
                     return;
                 }
                 resolve(res);
             })
         })
     })
 }

/**
 * 封装查询，删除操作
 * @param {String} _sqlstring 
 */
 exports.sqlquerytwo = function(_sqlstring) {
     return new Promise((resolve, reject) => {
         pool.getConnection((err, connection) =>{
             if(err){
                 reject(err);
                 return;
             }
             connection.query(_sqlstring, (errors, res) => {
                 if(errors){
                     reject(errors);
                     return;
                 }
                 resolve(res);
             })
         })
     })
 }

 /**
  * 动态生成数据表
  */
 exports.createTable = function(sqluid){
     return new Promise((resolve,reject) => {
        
        pool.getConnection((err, connection) => {
            if(err){
                reject(err);
                return;
            }
            // let sqluid = randomString(false,32);
            // let sqluid = uuid().replace(/-/g,'');
            // console.log('================================================')
            // console.log(sqluid);
            // console.log('================================================')
            let createsql = `create table ${sqluid} (
                barrage_id int AUTO_INCREMENT,
                barrage_text text NOT NULL,
                barrage_openid varchar(32) NOT NULL,
                barrage_time timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
                PRIMARY KEY (barrage_id)
            );`
            connection.query(createsql,(errors, res) => {
                if(errors){
                    reject(errors);
                    return
                }
                console.log(res);
                resolve(res);
            })
        })
     })
 }