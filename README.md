## 介绍
前端部分使用React开发，使用技术或内容包括：
1. [React.JS](https://reactjs.org/)和[create-react-app](https://create-react-app.dev/)。本项目的核心，用后者创建项目基础，不多说。
2. [React-Router](https://reactrouter.com/web/guides/quick-start)。如果后期涉及多页面开发需要，用此插件。
3. [eui](https://github.com/elastic/eui)。顾名思义，用此UI模板。
4. [Express.js](https://expressjs.com/)做proxy。Elastic新版不能通过客户端直接连接，转向使用url类型来连接。Express在这起代理作用。
5. 依然使用[PM2](https://pm2.keymetrics.io/docs/usage/quick-start/)让js后台运行。


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