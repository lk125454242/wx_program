var app = getApp();
var globalData = app.globalData;
var web_request = globalData.web;
var api_request = globalData.api;
Page({
    data: {
        placesTop: null,
        userInfo: {},
        title: '',
        url: '',
        image: ''
    },
    //事件处理函数
    video_error: function () {
        console.log('error', arguments);
        wx.setStorage({
            key: "video_error",
            data: JSON.stringify(arguments)
        })
    },
    default: function (e) {
        e.preventDefault();
    },
    onLoad: function () {//页面加载
        var that = this;
        var video = app.globalData.video;
        this.setData({
            title: video.title,
            url: video.image,
            src: video.src
        })
        console.log(app.globalData.video)
        //设置标题
        wx.setNavigationBarTitle({
            title: video.title
        });
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })
    },
    onReady: function () {
    },//初次渲染完成
    onShow: function () { },//
    onHide: function () { },
    onUnload: function () { },//卸载
    onPullDownRefresh: function () {
    },//下拉
    onReachBottom: function () { }//上拉
})