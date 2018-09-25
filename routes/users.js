var express = require('express');
var router = express.Router();
var xml = require('./../Utils/XML');
const encrypt = require('./../Utils/encrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var data = {
    "ToUserName": '132465',
    "FromUserName": '123',
    "CreateTime": '123456',
    "MsgType": '123456',
    "Content": '12345'
  }
  var xmls = xml.xmltool.txtMsg(data.ToUserName,data.FromUserName,data.Content);
  console.log(xmls);
  res.send(xmls);
});

router.get('/test',(req,res,next) => {
  console.log(encrypt.randomRoomId());
  res.end();
});

module.exports = router;
