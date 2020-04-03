# 快速开始
Genesis 是源于 Followme 5.0诞生的一个轻量级的 Vue SSR 插件，它总是不和任何的框架进行绑定，你可以自由的选择 Express、Koa、Egg、nest 等服务器端框架使用。
- 可以在老项目中，无缝的嵌入使用，你甚至可以在使用 [ejs](https://github.com/mde/ejs) 的项目中使用，也可以在CSR的老项目中使用，通过`remote-view`组件远程调用
- 在 SSR 渲染失败，或者内存泄漏的时候，可以快速的切换到 CSR 渲染
- 它更像是一个插件，而不是一个框架， `Genesis` 提供了一个核心的底层库，你可以自由的在此基础上进行二次开发
- 多个 SSR 的实例并行运行，可以做到业务独立
- `Genesis` 和 `Express` 并不是强依赖的关系，后续的文档只是使用 `Express` 作为例子而已

## 安装
# 安装
```bash
npm install @fmfe/genesis-core
npm install @fmfe/genesis-compiler -D
```
## 使用
::: tip 
服务端是基于 JavaScript 编写，客户端是基于 `typescript` 开发，如果你没有创建初始化程序，程序会自动给你创建一个简单的模板运行起来
:::
在你的项目根目录创建下面四个文件，当然了你也可以使用其它的文件名字
```
.
├── genesis.js       // 放置需要渲染的 SSR 实例
├── genesis.build.js // 编译生产环境代码
├── genesis.dev.js   // dev环境启动入口
├── genesis.prod.js  // 生产环境启动入口
└── package.json
```
因为 `Genesis` 只是一个 SSR 插件，它不具备创建 HTTP 服务的能力，所以这里我们还需要安装`Express`，当然了，你可以选择其它的框架使用。
```bash
npm install express
```
### genesis.js
```javascript
const { SSR } = require('@fmfe/genesis-core');
const express = require('express');

const app = express();
const ssr = new SSR();

const startApp = (renderer) => {
    app.use(renderer.renderMiddleware);
    app.listen(3000, () => console.log(`http://localhost:3000`));
};

exports.app = app;
exports.ssr = ssr;
exports.startApp = startApp;
```
### genesis.build.js
```javascript
const { Build } = require('@fmfe/genesis-compiler');
const { ssr } = require('./genesis');

const start = () => {
    return new Build(ssr).start();
};
start();
```
### genesis.dev.js
```javascript
const { Watch } = require('@fmfe/genesis-compiler');
const { ssr, app, startApp } = require('./genesis');

const start = async () => {
    const watch = new Watch(ssr);
    await watch.start();
    const renderer = watch.renderer;
    // 开发时使用的中间件
    app.use(watch.devMiddleware);
    app.use(watch.hotMiddleware);
    // 拿到渲染器之后，启动服务
    startApp(renderer);
};
start();
```
### genesis.prod.js
```javascript
const express = require('express');
const { ssr, app, startApp } = require('./genesis');

const renderer = ssr.createRenderer();

// 设置静态目录和缓存
app.use(
    renderer.staticPublicPath,
    express.static(renderer.staticDir, {
        immutable: true,
        maxAge: '31536000000'
    })
);

startApp(renderer);

```
上述的例子，是一个 `JavaScript` 的例子，如果需要使用 `typescript` 运行时，可以了解一下[ts-node](https://github.com/TypeStrong/ts-node)   
### 添加命令到 `package.json`
```json
{
  "scripts": {
    "dev": "node genesis.dev.js",
    "build": "NODE_ENV=production node genesis.build.js",
    "start": "NODE_ENV=production node genesis.prod.js"
  }
}
```
```bash
# 开发环境启动
npm run dev
# 打包生产环境代码
npm run build
# 生产环境运行
npm run start
```
