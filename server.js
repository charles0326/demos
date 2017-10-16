var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server), //引入socket.io模块并绑定到服务器
	users = [];
app.use('/', express.static(__dirname + '/www'));
server.listen(8080);

io.on('connection', function(socket) {
    //昵称设置
    socket.on('login', function(nickname) {
        if(users.indexOf(nickname) > -1){
			socket.emit('nickExisted');
		}else{
			socket.userIndex = users.length;
			socket.nickname = nickname;
			users.push(nickname);
			socket.emit('loginSuccess');
			io.sockets.emit('system', nickname, users.length, 'login');
		}
    });
	socket.on('disconnect', function() {
        if (socket.nickname != null) {
            users.splice(users.indexOf(socket.nickname), 1);
            socket.broadcast.emit('system', socket.nickname, users.length, 'logout');
        }
    });
	socket.on('postMsg', function(msg,color){
		socket.broadcast.emit('newMsg', socket.nickname, msg, color);
	});
	socket.on('img', function(imgData,color){
		socket.broadcast.emit('newImg', socket.nickname, imgData, color );
	})
});

console.log('server started');