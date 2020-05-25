---
sidebar: auto
---
# genesis-compiler
开发时的依赖，在生产环境中你不会使用到它，这能有效减少生产依赖的大小

## 安装
```bash
npm install @fmfe/genesis-compiler -D
```

## Build 属性
### build.ssr
说明：创建对象时，传入的 ssr 对象
## Build 方法
### build.start
说明：开始执行编译   
签名：
```ts
build.start(): Promise<[boolean, boolean]>;
```
### build.destroy
说明：取消编译，释放内存   
签名：
```ts
build.destroy(): Promise<void>;
```
## Build 例子
```ts
import { Build } from '@fmfe/genesis-compiler';
import { SSR } from '@fmfe/genesis-core'

const start = () => {
    const ssr = new SSR();
    const build = new Build(ssr);
    return build.start();
};
export default start();
```
## Watch 属性
### build.ssr
说明：创建对象时，传入的 ssr 对象
### build.devMiddleware
说明：Webpack 的[webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware)中间件
### build.hotMiddleware
说明：Webpack 的[webpack-hot-middleware](https://github.com/webpack-contrib/webpack-hot-middleware)中间件
### build.renderer
说明：[ssr.createRenderer()](../core/ssr.html#ssr-createrenderer)方法创建的[renderer](../core/renderer.html)
## Watch 方法
### build.start
说明：开始执行编译，你必须执行完成该方法后才能读取 `renderer` 属性，否则会程序会报错   
签名：
```ts
watch.start(): Promise<void>;
```
### build.destroy
说明：取消编译，释放内存   
签名：
```ts
watch.destroy(): Promise<void>;
```
## Watch 综合例子
```ts
import express from 'express';
import { SSR } from '@fmfe/genesis-core';
import { Watch } from '@fmfe/genesis-compiler';

const start = async () => {
    const ssr = new SSR();
    const watch = new Watch(ssr);
    const app = express();

    await watch.start();
    // 必须等待 watch.start() 执行完成后，才能拿到 renderer 实例
    const renderer = watch.renderer;

    app.get('*', renderer.renderMiddleware);

    return app;
};

start();

```
## Window genesis
在客户端，程序将会在 `window` 对象上注入一个 `genesis` 对象来管理应用的安装和卸载
### genesis.register
说明：注册一个应用，js 加载完成后，程序会自动注册，实际上就是 `src/entry-client` 文件 `export default` 导出的方法   
签名：
```ts
window.genesis.register(
    name: string,
    createApp: (options: Genesis.ClientOptions) => Promise<Vue>
);
```
### genesis.install
说明：安装一个应用，将会返回一个 `appId`给你，你可以调用 `uninstall` 强制卸载应用   
签名：
```ts
window.genesis.install(options: Genesis.ClientOptions): number;
```
### genesis.uninstall
说明：强制卸载应用，一般来说，你都不需要调用这个方法，程序会在 Vue 实例销毁时，自动卸载   
签名：
```ts
window.genesis.uninstall(appId: number): Promise<void>;
```