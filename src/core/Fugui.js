import {forEach} from './uitls'

function Fugui(bridge)  {
    this.bridge = bridge;
}

Fugui.prototype.request = function request(configure) {
    console.log(configure);
    var promise = new Promise(function(resolve, reject) {
        var debug = configure.fg_debug
        if (debug == true) {
            setTimeout(function(){
                resolve("成功了");
            }, 1000);
        } else {
            bridge.call("onAjaxRequest", {}, function(value, success) {
                if (success == true) {
                    resolve(value);
                } else {
                    reject(value);
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