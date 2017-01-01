var formatTime = require('./utils/time').formatTime;
//封装全局可用的ajax请求 以后可以考虑拿到 utils里面
var _request = function (options) {
  wx.request({
    url: options.url,
    data: options.data,
    method: options.method || 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: options.header, // 设置请求的 header
    success: function (res) {
      if (res.data.code === 200) {
        options.success && options.success(res.data.result);
      } else {
        wx.showToast({
          title: res.data.message || '操作失败',
          duration: 1000
        })
      }
    },
    fail: function (res) {
      wx.showToast({
        title: '错误:' + res.statusCode,
        duration: 1000
      })
    },
    complete: options.complete
  })
};
//app.js
App({
  onLaunch: function () {//小程序初始化
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    //输入当前时间戳
    wx.setStorageSync('logs', logs)
    //写入本地缓存
  },
  onShow: function () { },
  onHide: function () { },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用微信登录接口
      wx.login({
        success: function (result) {
          wx.getUserInfo({
            success: function (res) {
              res.userInfo.iv = res.iv;
              res.userInfo.encryptedData = res.encryptedData;
              res.userInfo.signature = res.signature;
              res.userInfo.code = result.code;
              that.globalData.userInfo = res.userInfo
              //获取openid
              that.globalData.web({
                url: '/staff/oid?code=' + result.code,
                success: function (response) {
                  var oid = response.data;
                  try {
                    var value = wx.getStorageSync(oid);
                    console.log(value);
                    if (value) {
                      try {
                        var info = wx.getStorageSync('user ' + value);
                        if (info) {
                          that.globalData.user = info;
                          return false;
                        } else {
                          that.globalData.api({
                            url: '/get-members?mid=' + value,
                            success: function (result) {
                              wx.setStorage({
                                key: 'user ' + value,
                                data: result.data
                              });
                              that.globalData.user = result;
                            }
                          })
                        }
                      } catch (e) {
                        console.log('微信存储错误',e);
                      }
                    } else {
                      wx.redirectTo({
                        url: '../login/login'
                      })
                    }
                  } catch (e) {
                    console.log(e);
                    wx.redirectTo({
                      url: '../login/login'
                    })
                  }
                }
              });
              typeof cb == "function" && cb(that.globalData.userInfo)
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
    }
  },
  globalData: {
    userInfo: null,//用户信息存储对象
    socket: 'wss://dev.geju.com/socket.io/?EIO=3&transport=websocket&t=123标识',//socket服务器
    version: '/api-v1.3',
    video: {},
    api: function (options) {
      options.url = 'https://dev.geju.com/api-v1.3' + options.url;
      _request(options);
    },
    web: function (options) {
      options.url = 'https://dev.geju.com' + options.url;
      _request(options);
    }
  }
})