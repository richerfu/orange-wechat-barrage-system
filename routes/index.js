const express = require('express');
const router = express.Router();
const config = require('./../Config/WeChat.config');
const xml = require('./../Utils/XML');
const sql = require('./../Utils/mySql');
const encrypt = require('./../Utils/encrypt');
const uuidv1 = require('uuid/v1');
const uuidv4 = require('uuid/v4');
const ordiaryUser = require('./../service/ordinaryUserService');
const advancedUser = require('./../service/advancedUserService');
const barrageRoom = require('./../service/barrageRoomService');
const barrageTable = require('./../service/barrageTableService');

const emitter = require('socket.io-emitter')({ host: '127.0.0.1', port: '6379'});

/**
 * 
 * 验证服务器域名配置以及token
 */
router.get('/', (req,res,next) => {
  let Token = config.Token;
  //  获取微信服务器发送的签名信息
  let signature = req.query.signature;
  let timestamp = req.query.timestamp;
  let echostr = req.query.echostr;
  let onoce = req.query.nonce;

  //  对参数进行字典排序 拼接字符串
  let shastr = [onoce,timestamp,Token].sort().join('');

  let scyptoString = encrypt.getsha1(shastr);
  //  比对信息
  if(scyptoString == signature){
      console.log(signature, scyptoString);
      res.send(echostr + '');
  }else{
      console.log("fail");
      res.end();
  }
});

/**
* 
* post请求 接受消息 分发请求
*/

router.post('/',(req,res) => {
//  处理上传消息请求
let promise = new Promise((resolve,reject) => {
  let buffer = [];
  //监听 data 事件 用于接收数据
  req.on('data',chunk => {
      buffer.push(chunk);
  });
  //监听 end 事件 用于处理接收完成的数据
  req.on('end',() => {
      let msgXml = Buffer.concat(buffer).toString('utf-8');
      xml.xmltool.getXml(msgXml).then(datas => {
          resolve(JSON.stringify(datas.xml));
      }).catch(e => {
          reject(JSON.stringify(e));
      })
  })
});

promise.then(data => {
    //  处理上报消息状态
   let message = JSON.parse(data);
   let flag = -1;
   let type = message.MsgType;
   switch(type[0]){
        case 'text':
            {
                flag = 0;
            }
            break;
        case "event":
            {
                flag = 1;
            }
            break;
   }
   return {flag: flag,data: message};
}).then(data => {
    /**
     * 针对不同类型的事件进行判定
     * code:
     *      1: 创建弹幕墙
     *      2：加入弹幕墙
     *      3：退出当前弹幕墙
     *      4: 删除弹幕墙
     *      5: 普通消息（一般为弹幕消息）
     *
     *      -1：关注公众号
     *      -2：取消关注公众号
     *      -3: 其他事件
     */
    let code = 0;
    switch(data.flag){
        case 0:
            {
                let addReg = /^创建弹幕墙$/;
                let addone = /^加入弹幕：\d+/;
                let addtwo = /^加入弹幕:\d+/;
                let out = /^退出当前弹幕墙$/;
                let deleteBarrage1 = /^删除弹幕墙：\d+/;
                let deleteBarrage2 = /^删除弹幕墙:\d+/;
                if(addReg.test(data.data.Content[0])){
                    code = 1;
                }else if(addone.test(data.data.Content[0] || addtwo.test(data.data.Content[0]))){
                    code = 2;
                }else if(out.test(data.data.Content[0])){
                    code = 3;
                }else if(deleteBarrage1.test(data.data.Content[0]) || deleteBarrage2.test(data.data.Content[0])){
                    code = 4;
                }else{
                    code = 5;
                }
            }
            break;
        case 1:
            {
                if(data.data.Event[0] === 'subscribe'){
                    code = -1;
                }else if(data.data.Event[0] === 'unsubscribe'){
                    code = -2;
                }else{
                    code = -3;
                }
            }
            break;
    }
    return {flag: data.flag,code: code,data: data.data};
}).then(data => {
    //  处理不同类型上报消息
    let status = -1;
    switch(data.flag){
        case 0:
            {
                switch(data.code){
                    case 1:
                        {
                            //  创建弹幕墙
                            let sqluuid = uuidv1().replace(/-/g,'');
                            let uuids = encrypt.randomRoomId();
                            let room_pwd = encrypt.randomLoginPwd();
                            sql.createTable(sqluuid).then(sqldata => {
                                sql.sqlquery('select count(open_status) from barrage_room where open_status = ?',['0']).then(() => {
                                }).then(() =>{
                                    advancedUser.addUser(data.data.FromUserName[0],data.data.FromUserName[0],uuids,room_pwd);
                                    barrageRoom.addRoom(uuids,uuids,data.data.FromUserName[0],room_pwd);
                                    barrageTable.addTable(sqluuid,uuids,uuids);
                                    let msg = `创建弹幕墙成功。墙号为：${uuids}\n若已关注弹幕墙回复：加入弹幕：${uuids}\n若未关注公众号，关注公众号之后回复：加入弹幕：${uuids}即可发送弹幕\n回复：删除弹幕墙：${uuids}即可删除弹幕墙。\n回复：退出当前弹幕墙。即可退出。进入网址http://www.tangtang.link/login即可看见发送的弹幕（登录用户名为：${uuids}，密码为：${room_pwd}）\n开始使用它吧！！`;
                                    let returnmsg = xml.xmltool.txtMsg(data.data.FromUserName[0],data.data.ToUserName[0],msg);
                                    res.send(returnmsg);
                                }).catch(e => {
                                    console.error(e);
                                })

                            })
                        }
                        break;
                    case 2:
                        {
                            let mathRex = /\d+/;
                            let messagedata = data.data.Content[0].match(mathRex);
                            console.log(messagedata);
                            barrageTable.findRoomID(messagedata[0]).then(returndata => {
                                let msg = '';
                                console.log(returndata);
                                if (returndata != null){
                                    if (returndata.dataValues.table_status == '1'){
                                        ordiaryUser.updateUserRoomId(data.data.FromUserName[0],messagedata[0]);
                                        msg = `加入弹幕成功，开始发送弹幕吧（在公众号发送消息即可）`;
                                    } else{
                                        msg = `嘤嘤嘤，当前房间已关闭！换个房间或者自己创建一个房间吧！`
                                    }
                                } else{
                                    msg = `该房间号不存在请核对房间号是否正确！`
                                }
                                let returnmsg = xml.xmltool.txtMsg(data.data.FromUserName[0],data.data.ToUserName[0],msg);
                                res.send(returnmsg);
                            })
                            
                        }
                        break;
                    case 3:
                        {
                            ordiaryUser.layOut(data.data.FromUserName[0]);
                            let msg = `退出当前房间成功`;
                            let xmlmsg = xml.xmltool.txtMsg(data.data.FromUserName[0],data.data.ToUserName[0],msg);
                            res.send(xmlmsg);
                        }
                        break;
                    case 4:
                        {
                            let mathRex = /\d+/;
                            let messagedata = data.data.Content[0].match(mathRex);
                            barrageRoom.deleteRoom(messagedata[0]);
                            let msg = `删除弹幕墙成功`;
                            let xmlmsg = xml.xmltool.txtMsg(data.data.FromUserName[0],data.data.ToUserName[0],msg);
                            res.send(xmlmsg);
                        }
                        break;
                    case 5:
                        {
                            //  查询是否当前已加入弹幕，若未加入则直接结束，若已加入则发送弹幕到指定弹幕墙
                            let user = ordiaryUser.findUserRoomId(data.data.FromUserName[0]).then(querydata => {

                                if(querydata.dataValues.barrage_room_number != null){
                                    return querydata.dataValues.barrage_room_number;
                                    // res.end();
                                }
                            }).then(returndata => {
                                console.log(returndata);
                                return barrageTable.findRoomID(returndata);
                            }).then(returndata2 => {
                                if (returndata2 != null){
                                    return [returndata2.dataValues.barrage_id,returndata2.dataValues.barrage_room_id];
                                } else{
                                    return null;
                                }
                            }).then(finldata => {
                                if (finldata != null){
                                    sql.sqlquery(`insert into ${finldata[0]} (barrage_text,barrage_openid) values (?,?)`,[data.data.Content[0],data.data.FromUserName[0]]);
                                    emitter.to(finldata[1]).emit('news',{data: data.data.Content[0]});
                                    res.end();
                                } else{
                                    res.end();
                                }

                            });
                        }
                        break;
                }
            }
            break;
        case 1:
            {
                switch(data.code){
                    case -1: {
                        ordiaryUser.findUser(data.data.FromUserName[0]).then(returndata => {

                            if(returndata != null){
                                ordiaryUser.updateOldUser(data.data.FromUserName[0]);
                            }else{
                                ordiaryUser.addUser(data.data.FromUserName[0]);
                            }
                            let msg = "欢迎关注本公众号，公众号旨在提供方便快捷的弹幕墙系统。\n回复：\n创建弹幕墙。即可快速创建弹幕墙\n";
                            let returnmsg = xml.xmltool.txtMsg(data.data.FromUserName,data.data.ToUserName,msg);
                            res.send(returnmsg);
                        })
                    }
                    break;
                    case -2: {
                        ordiaryUser.deleteUser(data.data.FromUserName[0]);
                        res.end();
                    }
                    break;
                    case -3: {
                        res.end();
                    }
                    break;
                }
            }
            break;
    }
    // console.log(data);
}).catch(e => {
    console.log(e);
})

});


// router.post('/login',(req,res) =>{
//         console.log('qingqiuchengg');
//         emitter.emit('test', {data:'successful --------'});  //推送一条消息
//         res.end();
//         // res.render('index', { title: '推送一条消息成功！'});
// })

module.exports = router;
