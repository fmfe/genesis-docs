# Watch
开发时使用
## 属性
### build.ssr
说明：创建对象时，传入的 ssr 对象
### build.devMiddleware
说明：Webpack 的[webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware)中间件
### build.hotMiddleware
说明：Webpack 的[webpack-hot-middleware](https://github.com/webpack-contrib/webpack-hot-middleware)中间件
### build.renderer
说明：[ssr.createRenderer()](../core/ssr.html#ssr-createrenderer)方法创建的[renderer](../core/renderer.html)
## 方法
### build.start
说明：开始执行编译，你必须执行完成该方法后才能读取 `renderer` 属性，否则会程序会报错
签名：
```typescript
watch.start(): Promise<void>;
```
### build.destroy
说明：取消编译，释放内存
签名：
```typescript
watch.destroy(): Promise<void>;
```
## 综合例子
```typescript
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