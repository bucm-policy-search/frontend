## 介绍
前端部分使用React开发，使用技术或内容包括：
1. [React.JS](https://reactjs.org/)和[create-react-app](https://create-react-app.dev/)。本项目的核心，用后者创建项目基础，不多说。
2. [React-Router](https://reactrouter.com/web/guides/quick-start)。如果后期涉及多页面开发需要，用此插件。
3. [eui](https://github.com/elastic/eui)。顾名思义，用此UI模板。
4. [Express.js](https://expressjs.com/)做proxy。Elastic新版不能通过客户端直接连接，转向使用url类型来连接。Express在这起代理作用。
5. 依然使用[PM2](https://pm2.keymetrics.io/docs/usage/quick-start/)让js后台运行。