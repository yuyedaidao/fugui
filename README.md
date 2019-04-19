# fugui
借助dsbrige转移http请求到native

### 安装
> npm install fugui -s

### 使用示例(完全模仿axios)

```
import fugui from 'fugui'
// some code
fugui({
	url: "topic",
	method: "get"
}).then((value) => {
	console.log(value);
})
// or 
fugui.get({
	url: "list"
}).then((value) => {
	console.log(value);
});
// or
fugui.post({
	url: "login",
	data: {}
}).then((value) => {
	console.log(value);
}).catch((result) => {
	console.log(result);
})
```
**请求方法暂时只支持`get` `post`  `put` `delete` `head`,如有新需求再行添加 **

### 更新说明
#### 19/4/3
1. 增加基础配置
```
const service = fugui.create({
        baseURL: process.env.BASE_URL,  // api的base_url
        timeout: 5000,  // 请求超时时间
        scheme: topic //模块标识，必填
});
```
2. 增加拦截器

```
//请求发起拦截器
service.interceptors.request.use(config => {
	console.log(config)
})
//请求响应拦截器
service.interceptors.response.use(response => {
	console.log(response)
})
```