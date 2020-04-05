# 快速开始
Genesis 是源于 Followme 5.0诞生的一个轻量级的 Vue SSR 插件，它总是不和任何的框架进行绑定，你可以自由的选择 Express、Koa、Egg、nest 等服务器端框架使用。

## 安装
::: tip 
为了减少生产依赖的大小，`Genesis` 特意拆分成两个包，`@fmfe/genesis-core` 负责核心的 SSR 渲染逻辑，`@fmfe/genesis-compiler` 负责在开发阶段和编译阶段使用，在生产环境中不需要它
:::
```bash
npm install @fmfe/genesis-core
npm install @fmfe/genesis-compiler -D
```

## TS 运行时
::: tip 
文档内所有的例子都基于 `ts` 进行编写，关于如何在 `Node` 运行 `ts` ，请了解 [ts-node](https://github.com/TypeStrong/ts-node)。如果你不想使用 `ts`，可以跳过这个步骤，只需要将文档的例子，修改成 `js` 语法即可
:::
```bash
npm install ts-node
```
## HTTP 服务
::: tip 
因为 `Genesis` 只是一个 SSR 插件，它不具备创建 HTTP 服务的能力，所以这里我们还需要安装 `Express` 。如果你选择了其它的框架，可以跳过这一步，并且将例子中的代码，转换成对应框架的代码即可
:::
```bash
npm install express
```
## 编码
在你的项目根目录创建下面四个文件，当然了你也可以使用其它的文件名字
```
.
├── genesis.ts       // 核心业务逻辑入口
├── genesis.build.ts // 编译生产环境代码
├── genesis.dev.ts   // dev环境启动入口
├── genesis.prod.ts  // 生产环境启动入口
├── tsconfig.json    // TS 的配置文件
└── package.json
```
### genesis.ts
```typescript
import express from 'express';
import { SSR, Renderer } from '@fmfe/genesis-core';

export const app = express();

export const ssr = new SSR();

export const startApp = (renderer: Renderer) => {
    app.use(renderer.renderMiddleware);
    app.listen(3000, () => console.log(`http://localhost:3000`));
};

```
因为在开发环境时，需要等待 ` await watch.start();` 执行完成后，才能拿到 `renderer`，所以这里需要导出，`app`，`ssr`，`startApp` 给不同的环境使用。
### genesis.build.ts
```typescript
import { Build } from '@fmfe/genesis-compiler';
import { ssr } from './genesis';

const start = () => {
    return new Build(ssr).start();
};
start();
```
构建生产换依赖包
### genesis.dev.ts
```typescript
import { Watch } from '@fmfe/genesis-compiler';
import { ssr, app, startApp } from './genesis';

const start = async () => {
    const watch = new Watch(ssr);
    await watch.start();
    const renderer = watch.renderer;
    // 开发时使用的中间件，如果你不是使用 express，你需要将这两个中间件，包装成对应框架的中间件
    app.use(watch.devMiddleware);
    app.use(watch.hotMiddleware);
    // 拿到渲染器之后，启动服务
    startApp(renderer);
};
start();
```
开发环境时，程序启动入口文件
### genesis.prod.ts
```typescript
import express from 'express';
import { ssr, app, startApp } from './genesis';

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
生产环境启动入口
### tsconfig.json
```json
{
    "compilerOptions": {
        "target": "esnext",
        "module": "esnext",
        "moduleResolution": "node",
        "esModuleInterop": true,
        "experimentalDecorators": true,
        "allowJs": true,
        "sourceMap": true,
        "strict": true,
        "noEmit": true,
        "noUnusedLocals": true,
        "skipLibCheck": true,
        "noImplicitAny": false,
        "resolveJsonModule": true,
        "baseUrl": "./",
        "typeRoots": [
            "./types/*"
        ],
        "types": [
            "@types/node"
        ],
        "allowSyntheticDefaultImports": true
    },
    "ts-node": {
        "compilerOptions": {
            "target": "es2018",
            "module": "commonjs",
            "moduleResolution": "node",
            "allowSyntheticDefaultImports": true,
            "declaration": true,
            "esModuleInterop": true,
            "outDir": "../dist"
        }
    }
}
```
这里提供了一份常见的 ts 配置，你可以根据自己的需要进行调整
### package.json
```json
{
  "scripts": {
    "dev": "ts-node genesis.dev -p=tsconfig.json",
    "build": "rm -rf dist && NODE_ENV=production ts-node genesis.build -p=tsconfig.json",
    "start": "NODE_ENV=production ts-node genesis.prod -p=tsconfig.json",
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
将常用命令添加到 npm script 中，可以让我们各个快速的启动应用   
执行 `npm run dev`命令，在浏览器中访问 `http://localhost:3000`