exports.download = function (url, success , error) {
    wx.downloadFile({
        url: url,
        success: function (res) {
            success && success(res.tempFilePath)
        },
        fail: function (err) {
            error && error(err);
        }
    })
}//下载接口
exports.upload = function saveFile(path, success , error) {
    wx.saveFile({
        tempFilePath: path,
        success: function (res) {
            success && success(res.savedFilePath)
        },
        fail: function (err) {
            error && error(err);
        }
    })
}//上传接口
