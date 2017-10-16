window.onload = function(){
	var hichat = new HiChat();
	hichat.init();
};
var HiChat = function(){
	this.socket = null;
};
HiChat.prototype = {
	init:function(){
		var that = this;
		this.socket = io.connect();
		this.socket.on("connect", function(){
			document.getElementById('info').textContent = "get yourself a nickname :)";
			document.getElementById('nicknameInput').focus();
		});
		this.socket.on("nickExisted", function(){
			document.getElementById('info').textContent = "!nickname is taken, choose another pls";
		});
		this.socket.on("loginSuccess", function(){
			document.getElementById('loginWrapper').style.display = 'none';
			document.getElementById('msgInput').focus();
		});
		this.socket.on('error', function(err) {
            if (document.getElementById('loginWrapper').style.display == 'none') {
                document.getElementById('status').textContent = '!fail to connect :(';
            } else {
                document.getElementById('info').textContent = '!fail to connect :(';
            }
        });
		this.socket.on("system", function(nickname,userCount,type){
			var msg = nickname + (type == "login" ? " joined" : " left");
			that._displayNewMsg('system ', msg, 'red');
			document.getElementById('status').textContent = userCount + (userCount > 1 ? ' users' : ' user') + ' online';
		});
		this.socket.on("newMsg", function(user,msg,color){
			that._displayNewMsg(user, msg, color);
		});
		this.socket.on('newImg', function(user, img, color) {
            that._displayImage(user, img, color);
        });
		document.getElementById('loginBtn').addEventListener('click', function(){
			var nickname = document.getElementById('nicknameInput').value;
			if(nickname.trim().length != 0){
				that.socket.emit('login', nickname);
			}else{
				document.getElementById('nicknameInput').focus();
			}
		});
		document.getElementById('nicknameInput').addEventListener('keyup', function(e) {
            if (e.keyCode == 13) {
                var nickName = document.getElementById('nicknameInput').value;
                if (nickName.trim().length != 0) {
                    that.socket.emit('login', nickName);
                };
            };
        }, false);
		document.getElementById('clearBtn').addEventListener('click', function(){
			document.getElementById('historyMsg').innerHTML = '';
		});
		document.getElementById('sendBtn').addEventListener('click', function(){
			var msginput = document.getElementById('msgInput'),
				msg = msginput.value,
				color = document.getElementById('colorStyle').value;
			msginput.value = "";
			msginput.focus();
			if(msg.trim().length != 0){
				that.socket.emit('postMsg', msg, color);
				that._displayNewMsg('me', msg, color);
			}
		});
		document.getElementById('msgInput').addEventListener('keyup', function(e){
			var msginput = document.getElementById('msgInput'),
				msg = msginput.value,
				color = document.getElementById('colorStyle').value;
			if(msg.trim().length != 0 && e.keyCode==13){
				msginput.value = "";
				that.socket.emit('postMsg', msg, color);
				that._displayNewMsg('me', msg, color);
			}
		});
		document.getElementById('sendImage').addEventListener('change', function(){
			if (this.files.length != 0) {
				var file = this.files[0],
					reader = new FileReader(),
					color = document.getElementById('colorStyle').value;
				if(!reader){
					that._displayNewMsg('system', '!your browser doesn\'t support fileReader', 'red');
                    this.value = '';
                    return;
				}
				reader.onload = function(e){
					this.value = '';
					that.socket.emit('img', e.target.result, color);
                    that._displayImage('me', e.target.result, color);
				}
				reader.readAsDataURL(file);
			}
		});
		
		this._initialEmoji();
		document.getElementById('emoji').addEventListener('click', function(e) {
				var emojiwrapper = document.getElementById('emojiWrapper');
				emojiwrapper.style.display = 'block';
				e.stopPropagation();
			}, false);
		document.body.addEventListener('click', function(e) {
				var emojiwrapper = document.getElementById('emojiWrapper');
				if (e.target != emojiwrapper) {
					emojiwrapper.style.display = 'none';
				};
			});
		document.getElementById('emojiWrapper').addEventListener('click', function(e){
			var target = e.target;
			if(target.nodeName.toLowerCase() == "img"){
				var msginput = document.getElementById("msgInput");
				msginput.focus();
				msginput.value = msginput.value + '[emoji:' + target.title + ']';
			}
		});
	},
	_initialEmoji:function(){
		var emojiContainer = document.getElementById('emojiWrapper'),
			docFragment = document.createDocumentFragment();
		for (var i = 1; i <= 69; i++){
			var emojiItem = document.createElement('img');
			emojiItem.src = '/chat/content/emoji/' + i + '.png';
			
			emojiItem.title = i;
			docFragment.appendChild(emojiItem);
		};
		emojiContainer.appendChild(docFragment);
	},
	_displayNewMsg:function(user,msg,color){
		var container = document.getElementById('historyMsg'),
			msgToDisplay = document.createElement('p'),
			date = new Date().toTimeString().substr(0, 8);
		msg = this._showEmoji(msg);
		msgToDisplay.style.color = color || '#000';
        msgToDisplay.innerHTML = user + '<span class="timespan">(' + date + '): </span>' + msg;
        container.appendChild(msgToDisplay);
        container.scrollTop = container.scrollHeight;
	},
	_displayImage: function(user, imgData, color) {
        var container = document.getElementById('historyMsg'),
            msgToDisplay = document.createElement('p'),
            date = new Date().toTimeString().substr(0, 8);
        msgToDisplay.style.color = color || '#000';
        msgToDisplay.innerHTML = user + '<span class="timespan">(' + date + '): </span> <br/>' + '<a href="' + imgData + '" target="_blank"><img src="' + imgData + '"/></a>';
        container.appendChild(msgToDisplay);
        container.scrollTop = container.scrollHeight;
    },
	_showEmoji: function(msg) {
        var match, result = msg,
            reg = /\[emoji:\d+\]/g,
            emojiIndex,
            totalEmojiNum = document.getElementById('emojiWrapper').children.length;
        while (match = reg.exec(msg)) {
            emojiIndex = match[0].slice(7, -1);
            if (emojiIndex > totalEmojiNum) {
                result = result.replace(match[0], '[X]');
            } else {
                result = result.replace(match[0], '<img class="emoji" src="/chat/content/emoji/' + emojiIndex + '.png" />');//todo:fix this in chrome it will cause a new request for the image
            };
        };
        return result;
    }
}