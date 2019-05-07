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
    var promise = Promise.resolve(config)
    interceptors.request.forEach(function requestInterceptors(interceptor) {
        promise = promise.then(interceptor.fulfilled)
    });
    promise = promise.then(config => {
        return new Promise(function(resolve, reject) {
            bridge.call("onAjaxRequest", config, function(value) {
                try {
                    var json = JSON.parse(value);
                    var success = json.success;
                    if (success === true || success === 'true' || success === 1 || success === '1') {
                        resolve(json.value);
                    } else {
                        reject(json.value);
                    }
                } catch(e) {
                    reject("json解析错误:",e);
                }
            });  
        })
    })
    interceptors.response.forEach(function responseInterceptors(interceptor) {
        promise = promise.then(interceptor.fulfilled)
    });
    
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
