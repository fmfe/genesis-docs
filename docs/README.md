---
home: true
heroImage: 
heroText: Genesis
tagline: 轻量级的 Vue SSR 插件
actionText: 快速开始 →
actionLink: /guide/
features:
- title: 简单
  details: 新老项目，开箱即用
- title: 渐进式
  details: 可以和现有的 ejs、pug 配合使用，也可以在老的 CSR 项目上使用 remote-view 组件配合使用
- title: 微前端
  details: 将 CSR、SSR 渲染的结果，输出 json，在客户端、服务端进行渲染
footer: Genesis 因 Followme 5.0 而诞生
---
::: warning 注意
项目文档和单元测试还在编写中，还未发布正式版本。如果你对本项目感兴趣，欢迎加我微信 `lzxb20` 或者 QQ `1340641314`沟通交流。
::: 
::: tip 核心能力
`express` 不是必须的，它可以是任意的 HTTP 框架，`renderer` 可以渲染成 `html` 或 `json`，由 `remote-view` 远程组件渲染
:::

```typescript
import express from 'express';
import { SSR } from '@fmfe/genesis-core';

const app = express();
const ssr = new SSR();
const renderer = ssr.createRenderer();

// 设置静态目录和缓存
app.use(
    renderer.staticPublicPath,
    express.static(renderer.staticDir, {
        immutable: true,
        maxAge: '31536000000'
    })
);
// HTML 渲染模式，直出页面
app.get('/', (req, res, next) => {
    renderer
        .renderHtml(req, res)
        .then((r) => {
            res.send(r.data);
        })
        .catch(next);
});
// JSON 渲染模式，其它服务通过远程组件调用 <remote-view url="/api/header" />
app.get('/api/header', (req, res, next) => {
    renderer
        .renderJson(req, res)
        .then((r) => {
            res.send(r.data);
        })
        .catch(next);
});

```
```vue
<template>
    <div class="app">
        <!-- 其它的服务或 CSR 的老项目，也可以这样直接调用 -->
        <remote-view url="/api/header" />
    </div>
</template>
```