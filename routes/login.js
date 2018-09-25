const express = require('express');
const router = express.Router();
const User = require('./../service/advancedUserService');

router.get('/',(req,res,next) => {
    res.cookie('isLogin',1,{maxAge: 60*1000*60*24*30});
    res.render('login',{
        title: '登录'
    })
});

router.post('/',(req,res) => {
    User.findUser(req.body.username).then(data => {
        console.log(data);
        if (data == null){
            return 1;
        } else{
            if(data.dataValues.user_pwd == req.body.pwd){
                return 0
            }else{
                return 2
            }
        }
    }).then(data => {
        console.log(data);
        if (data == 1){
            res.json({msg:'用户名错误，不存在此用户名'});
        } else if(data == 0){
            req.session.user = req.body;
            // res.location('/barrage/'+req.body.username);
            res.json({msg: 'ok',username:req.body.username})
        }else{
            res.json({msg:'密码错误'});
        }
    })
    // console.log(req.body);

});

module.exports = router;