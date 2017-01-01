var socket_open = false;
var Queue = require('./queue');
var queue = new Queue();
var URL = '';
function connect(url) {//打开连接
    URL = url;
    wx.connectSocket({
        url: url,
        data: {},
        header: {
            'content-type': 'application/json'
        },
        method: "GET",
        success: function () {
            console.log('WebSocket连接已打开！');
            socket_open = true;
        },
        file: function () {
            socket_open = false;
            console.log(arguments);
        }
    });
    (!URL) && listener_error();
}
function listener_error() {//监听
    wx.onSocketOpen(function (res) {
        console.log('WebSocket连接已打开！');
    })
    wx.onSocketError(function (res) {
        console.log('error');
        //wx.closeSocket();
        socket_open = false;
        connect(URL)
    })
    wx.onSocketClose(function (res) {
        console.log('close');
        //wx.closeSocket();
        socket_open = false;
        connect(URL)
    })
}
function send_message(event, msg) {
    if (event && msg) {
        if (socket_open) {
            if (typeof msg !== 'string') {
                msg = JSON.stringify(msg);
            }
            var message = '42["' + event + '\",{"message":"' + msg + '"}]';
            wx.sendSocketMessage({
                data: message
            })
            return true;
        } else {
            queue.add(function () {
                return send_message(event, msg);
            })
            connect(URL);
        }
    } else {
        wx.showToast({
            title: '请输入内容',
            duration: 1000,
            icon: 'loading'
        })
    }
}
module.exports = {
    connect: connect,
    send_message: send_message
}