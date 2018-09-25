const express = require('express');
const router = express.Router();
const sql = require('./../service/ordinaryUserService');
const encrypt = require('./../Utils/encrypt');

router.get('/:roomID',(req, res, next) => {
    // sql.addUser('132456');
    // sql.addUser('32654');
    // res.end();
    if(req.session.user){
        console.log(encrypt.randomRoomId());
        var roomId = req.param.roomID;
        res.render('barrage',{
            title:'test',
            roomId: roomId
        })
    }else{
        res.redirect('/login');
    }

});


module.exports = router;