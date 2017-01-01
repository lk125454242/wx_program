var order = ['red', 'yellow', 'blue', 'green', 'red']
var app = getApp();
var socketer = require('../../utils/socket');
console.log(socketer);
Page({
    data: {
        toView: 'red',
        scrollTop: 100,
        message: ''
    },
    upper: function (e) {
        console.log(e)
    },
    lower: function (e) {
        console.log(e)
    },
    scroll: function (e) {
        console.log(e)
    },
    onLoad: function () {//页面加载
        console.log('######## onLoad #########');
        var that = this
        var socket = getApp().globalData.socket;
        socketer.connect(socket);
        wx.onSocketMessage(function (res) {
            console.log(res)
            console.log('收到服务器内容：' + res.data)
        })
    },
    onReady: function () { },//初次渲染完成
    onShow: function () { },//
    onHide: function () { },
    onUnload: function () { },//卸载
    onPullDownRefresh: function () { },//下拉
    onReachBottom: function () { },//上拉
    bindInput: function (e) {
        this.setData({
            message: e.detail.value
        })
    },
    sendmessage: function () {
        console.log(this.data);
        socketer.send_message('message',this.data.message);
    },
    tap: function (e) {

    },
    tapMove: function (e) {

    }
})