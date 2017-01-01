/* 队列模拟类 开始 */
function Queue(delay) {
    this.queue = [];
    this.timer = null;
    this.call_me();
    this.delay = delay || 500;
}
Queue.prototype.call_me = function () {
    var self = this,
        queue = this.queue,
        cache = [];
    while (queue.length){
        var a = queue.shift();
        var result = a();
        if(!result){
            cache.push(a);
        }
    }
    this.queue = queue.concat(cache);
    this.timer = setTimeout(function () {
        clearTimeout(self.timer);
        self.timer = null;
        self.call_me();
    },this.delay);
};
Queue.prototype.add = function (fn) {
    this.queue.push(fn);
};
Queue.prototype.remove = function (fn) {
    var i = 0,queue = this.queue,len = queue.length;
    for(;i<len;i++){
        if(fn  === queue[i]){
            this.queue = queue.slice(0,i).concat(queue.slice(i+1))
        }
    }
};
/* 队列模拟类 结束 */
module.exports = Queue;