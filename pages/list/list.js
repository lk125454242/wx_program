var order = ['red', 'yellow', 'blue', 'green', 'red']
var app = getApp();
Page({
  data: {
    toView: 'red',
    scrollTop: 100
  },
  upper: function(e) {
    console.log(e)
  },
  lower: function(e) {
    console.log(e)
  },
  scroll: function(e) {
    console.log(e)
  },
  onLoad: function () {//页面加载
    console.log('######## onLoad #########');
    var that = this
    var request = app.globalData.web;
    request({
      url: '/city',
      data: {},
      success:function(data){
        console.log(data);
        that.setData({
          list: data.list
        })
      }
    })
  },
  onReady: function(){},//初次渲染完成
  onShow: function(){},//
  onHide: function(){},
  onUnload: function(){},//卸载
  onPullDownRefresh: function(){},//下拉
  onReachBottom: function(){},//上拉
  tap: function(e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function(e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  }
})