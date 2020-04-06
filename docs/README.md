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
- title: 多实例
  details: 一个页面可以由多个 SSR 实例组成
- title: 远程组件
  details: 输出 json，提供 API 给其它页面使用
footer: Genesis 因 Followme 5.0 而诞生
---
::: warning 注意
项目文档和单元测试还在编写中，还未发布正式版本。如果你对本项目感兴趣，欢迎加我微信 `lzxb20` 或者 QQ `1340641314`沟通交流。
::: 
::: tip 如果有一天
你写的页面，也可以提供 `API` 接口，让所有的前端页面调用，你会喜欢吗？
:::

```typescript
import express from 'express';
import { SSR } from '@fmfe/genesis-core';

const app = express();
const ssr = new SSR();
const renderer = ssr.createRenderer();
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