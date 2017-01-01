var proxy = function(boolean , obj){
    if(boolean){
        //TODO
    }
}
exports.get = function () {
    var obj = {};
    var net = false;
    var sys = false;
    // 获取网络信息
    wx.getNetworkType({
        success: function () {
            obj.network = res.networkType
            net = true;
            proxy(net && sys ,obj);
        },
        fail: function () {
            sys = true;
            proxy(net && sys ,obj);
        }
    });
    // 获取系统信息
    wx.getSystemInfo({
        success: function () {
            obj.model = res.model //手机型号
            obj.pixelRatio = res.pixelRatio //像素比
            obj.network = res.windowWidth  //宽度
            obj.network = res.windowHeight  //高度
            obj.network = res.language  //语言
            obj.network = res.version  //微信版本
            sys = true;
            proxy(net && sys ,obj);
        },
        fail: function () {
            sys = true;
            proxy(net && sys ,obj);
        }
    })
}