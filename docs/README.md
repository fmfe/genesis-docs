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
本项目还在编写测试用例和文档中，API可能还会有所变动，在测试期间请使用最新版本测试。
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
        .renderJson({ req, res })
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
## 团队成员
[@lzxb](https://www.followme.com/user/203489)    
[@zhgh](https://www.followme.cn/user/229620/zone)    
[@Deboy](https://www.followme.com/user/196312/zone)    
[@sxqstyle](https://www.followme.com/user/256784/zone)   
