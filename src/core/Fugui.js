import {forEach} from './uitls'

function Fugui(bridge)  {
    this.bridge = bridge;
}

Fugui.prototype.request = function request(configure) {
    var bridge = this.bridge;
    var promise = new Promise(function(resolve, reject) {
        var debug = configure.fg_debug
        if (debug == true) {
            setTimeout(function(){
                resolve("您的测试预期返回成功，返回成功");
            }, 1000);
        } else {
            bridge.call("onAjaxRequest", configure, function(value) {
                var json = JSON.parse(value);
                var success = json.success;
                if (success == true) {
                    resolve(json.value);
                } else {
                    reject(json.value);
                }
            });
        }
    })
    return promise;
}

forEach(['get','delete','head','put','post'], function (method) {
    Fugui.prototype[method] = function(url, data) {
        return this.request({
            method: method,
            url: url,
            data: data
        });
    };
});

// module.exports = Fugui;
export default Fugui;
// export {
//     Fugui
// }