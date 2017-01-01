//index.js
//获取应用实例
var app = getApp();
var web_request = app.globalData.web;
var api_request = app.globalData.api;
function _get_home(cb, that) {
  api_request({
    url: '/get-home',
    success: function (data) {
      wx.setStorageSync('get-home', data);
      cb(data, that);
    }
  })
}
function _set_data(data, that) {
  console.log(that);
  that.setData({
    placesTop: data.placesTop,
    placesRecommend: data.placesRecommend,
    classback: data.classback,
    splendid: data.splendid,
    course: data.course
  })
}
function downloadFile(url , success) {
  wx.downloadFile({
    url: url,
    success: function (res) {
      success && success(res.tempFilePath)
    },
    fail: function (err) {
      console.log(err)
    }
  })
}
function saveFile(path) {
  wx.saveFile({
    tempFilePath: path,
    success: function (res) {
      var savedFilePath = res.savedFilePath
      console.log(savedFilePath);
    }
  })
}
function cache_file(absolute_path) {
  downloadFile(absolute_path, saveFile);
}

Page({
  data: {
    placesTop: null,
    userInfo: {},
    placesTop: null,
    placesRecommend:null
  },
  //事件处理函数
  video_error:function(){
    wx.setStorage({
      key:"video_error",
      data:JSON.stringify(arguments)
    })
  },
  bindVideoTap: function (e) {
    var target = e.currentTarget;
    var dataset = target.dataset;
    app.globalData.video = dataset;
    wx.navigateTo({
      url: '../video/video'
    })
  },
  default:function(e){
    e.preventDefault();
  },
  onLoad: function () {//页面加载
    var that = this;
    wx.getStorage({
      key: 'get-home',
      success: function (res) {
        console.log(res);
        var data = res.data;
        console.log('data', data);
        if (data) {
          _set_data(data, that);
          console.log(data.classback[0].class_back_pics);
          cache_file(data.classback[0].class_back_pics);
        } else {
          _get_home(_set_data, that);
        }
      },
      fail: function (res) {
        _get_home(_set_data, that);
      }
    })
    //设置标题
    wx.setNavigationBarTitle({
      title: '首页'
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
    var that = this;
  },//初次渲染完成
  onShow: function () { },//
  onHide: function () { },
  onUnload: function () { },//卸载
  onPullDownRefresh: function () {
    _get_home(_set_data, this);
  },//下拉
  onReachBottom: function () { }//上拉
})
