var app = getApp();
var globalData = app.globalData;
var web_request = globalData.web;
var api_request = globalData.api;
var validate = require('../../utils/validate')
var test_phone = validate.phone;
var test_code = validate.code;
Page({
    data: {
        placesTop: null,
        userInfo: {},
        phone: '',
        code: '',
        send: false,//是否发送
        second: 60,
        login: false
    },
    //事件处理函数
    default: function (e) {
        e.preventDefault();
    },
    onLoad: function () {//页面加载
        var that = this;
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            console.log(userInfo);
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })
    },
    // 发送验证码
    send_sms: function () {
        var phone = this.data.phone;
        var that = this;
        this.setData({
            send: true,
            second: 60
        })
        if (test_phone(phone)) {
            web_request({
                url: '/sms/staff',
                method: 'post',
                data: {
                    phone: phone
                },
                success: function (result) {
                    console.log(that);
                    var timer_interval = setInterval(function () {
                        var second = that.data.second;
                        that.setData({
                            second: --second
                        })
                    }, 1000);
                    var timer = setTimeout(function () {
                        that.setData({
                            send: false
                        });
                        clearInterval(timer_interval);
                        clearTimeout(timer);
                        timer_interval = null;
                        timer = null;
                    }, 60000)
                    return wx.showToast({
                        title: '验证码发送成功',
                        duration: 1000,
                        icon: 'success'
                    });
                },
                fail: function () {
                    that.setData({
                        send: false
                    })
                }
            })
        } else {
            wx.showToast({
                title: '手机号错误',
                duration: 1000,
                icon: 'loading'
            });
            this.setData({
                send: false
            })
        }
    },
    bindPhone: function (e) {
        this.setData({
            phone: e.detail.value
        })
    },
    bindCode: function (e) {
        this.setData({
            code: e.detail.value
        })
    },
    bindLogin: function () {
        this.setData({
            login: true
        })
        var that = this;
        var code = this.data.code;
        var phone = this.data.phone;
        if (!test_phone(phone)) {
            this.setData({
                login: false
            })
            return wx.showToast({
                title: '手机号错误',
                duration: 1000,
                icon: 'loading'
            });
        }
        if (!test_code(code)) {
            this.setData({
                login: false
            })
            return wx.showToast({
                title: '验证码错误',
                duration: 1000,
                icon: 'loading'
            });
        }
        globalData.userInfo.phone = phone;
        globalData.userInfo.validate = code;
        wx.login({
            success: function (result) {
                globalData.userInfo.code = result.code;
                web_request({
                    url: '/staff/login',
                    method: 'post',
                    data: globalData.userInfo,
                    success: function (result) {
                        var oid = result.data.oid;
                        var uid = result.data.uid;
                        app.globalData.oid = oid;
                        app.globalData.uid = uid;
                        wx.setStorageSync(oid, uid);
                        wx.redirectTo({
                            url: '../index/index'
                        })
                    },
                    complete: function () {
                        that.setData({
                            login: false
                        })
                    }
                })
            },
            fail: function () {
                wx.showToast({
                    title: '微信登录失败',
                    duration: 1000,
                    icon: 'loading'
                });
            }
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