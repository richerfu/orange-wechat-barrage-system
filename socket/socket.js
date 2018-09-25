const redis = require('redis');
const ioRedis = require('socket.io-redis');

var roomInfo = {};

let ioCreater = function(server) {
    const io = require('socket.io')(server);
    io.on('connection', function (socket) {

        var url = socket.request.headers.referer;
        var splited = url.split('/');
        var roomID = splited[splited.length - 1];   // 获取房间ID
        // var user = '';
        console.log(socket.request.headers);
        console.log(roomID);
        socket.join(roomID);    // 加入房间

       
        socket.on('disconnect', function(){    //断开socket连接的时候触发
            console.log('user disconnected');
        });
        socket.on('message', function(){  //接收socket连接消息的时候触发
            console.log('received a message');
        });
        socket.on('connect', function(){  //建立socket连接时候触发
            console.log('connect a socket client');
        });

    });

// var pub = redis.createClient({host:"127.0.0.1", port:"6379" }); 
// var sub = redis.createClient({host:"127.0.0.1", port:"6379" ,return_buffers: true});
    io.adapter(ioRedis({host:"127.0.0.1", port:"6379" })); //使用socket.io-adapter设置缓存依赖
    return io; 
};
 module.exports = ioCreater;