import {forEach} from './utils'
import {InterceptorManager} from './Interceptor'
import mergeConfig from './merge'

function Fugui(bridge, config)  {
    this.bridge = bridge;
    this.defaults = config
    this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
    };
}

Fugui.prototype.request = function request(config) {
    var bridge = this.bridge;
    if (typeof config === 'string') {
        config = arguments[1] || {};
        config.url = arguments[0];
      } else {
        config = config || {};
      }
    
    config = mergeConfig(this.defaults, config);
    config.method = config.method ? config.method.toLowerCase() : 'get';
    var interceptors = this.interceptors
    var promise = new Promise(function(resolve, reject) {
        interceptors.request.forEach(function requestInterceptors(interceptor) {
            interceptor.fulfilled(config);
        });
        var debug = config.params.fg_debug;
        if (debug == true) {
            setTimeout(function(){
                interceptors.response.forEach(function responseInterceptors(interceptor) {
                    interceptor.fulfilled("您的测试预期返回成功，返回成功");
                });
                resolve("您的测试预期返回成功，返回成功");
            }, 1000);
        } else {
            bridge.call("onAjaxRequest", config, function(value) {
                var json = JSON.parse(value);
                interceptors.response.forEach(function responseInterceptors(interceptor) {
                    interceptor.fulfilled(json.value);
                });
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

export default Fugui;
