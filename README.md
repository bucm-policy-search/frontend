## 介绍
前端部分使用React开发，使用技术或内容包括：
1. [React.JS](https://reactjs.org/)和[Next.JS](https://nextjs.org/)。本项目的核心，用后者创建项目基础，不多说。
2. [Material-UI](https://material-ui.com/)。顾名思义，用此UI模板。
3. [Express.js](https://expressjs.com/)做proxy。Elastic新版不能通过客户端直接连接，转向使用url类型来连接。Express在这起代理作用。
4. 依然使用[PM2](https://pm2.keymetrics.io/docs/usage/quick-start/)让js后台运行。
其他可见`package.json`

## 遇到的问题及解决方式
1. 试图直接通过带用户名和密码绕过去
index.js:1 Error: TypeError: Failed to execute 'fetch' on 'Window': Request cannot be constructed from a URL that includes credentials: http://elastic:CHANGEME@localhost:9200/test/_search?q=2020

2. header值不相等
Access to fetch at 'http://localhost:3200/api/search?q=' from origin 'http://localhost:3000' has been blocked by CORS policy: The 'Access-Control-Allow-Origin' header has a value 'http://localhost' that is not equal to the supplied origin. Have the server send the header with a valid value, or, if an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
精确到对应端口

3. The locked read-only property of the ReadableStream interface returns whether or not the readable stream is locked to a reader.
参考这篇[Stack Overflow](https://stackoverflow.com/questions/40385133/retrieve-data-from-a-readablestream-object)回答

4. ReadableStream.locked
对res.data用.json()或.text()解锁

5. Internal Server Error
用自带的`DEBUG=express:* node xxx.js`进行Debug

6. ×
Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object.

Check the render method of `Search`.

常在this.setState报错，用`[]`或`{}`包裹对应的值

7. Router.push()不起作用
表单，表单！！！不要用表单！！！ 卡了半天


最后小小吐槽，为啥我用Node.js debug不到什么问题。。。