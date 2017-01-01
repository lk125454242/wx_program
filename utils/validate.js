exports.phone = function(value){
    return /^1[345789]\d{9,9}$/.test(value);
}
exports.code = function(value){
    return /^\d{6,6}$/.test(value);
}