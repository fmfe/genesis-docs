---
home: true
heroImage: 
heroText: Genesis
tagline: 轻量级的 Vue SSR 库
actionText: 快速开始 →
actionLink: /guide/
features:
- title: 微前端
  details: 与技术栈无关，能被不同的技术调用页面
- title: 微服务
  details: 将不同的页面模块，拆分成多个服务，由聚合服务组装成完整的页面
- title: 远程组件
  details: 支持在服务端、客户端使用其它服务的组件
- title: 降级渲染
  details: SSR 渲染失败，降低到 CSR 渲染
- title: SEO
  details: 使用 vue-meta 管理 SEO 信息
- title: 轻量级
  details: 核心库只专注于做 SSR 的渲染
footer: Genesis 因 Followme 5.0 而诞生
---
::: warning 注意
文档还在完善中，但项目已经趋于成熟，可以在生产环境中使用。
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
// 提供一个API使用
app.get('/api/header', (req, res, next) => {
    const url =
        typeof req.query.renderUrl === 'string' ? req.query.renderUrl : '/';
    renderer
        .renderJson({ req, res, url })
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
        <remote-view :fetch="fetch" />
    </div>
</template>
<script>
import axios from 'axios';

export default {
  methods: {
    fetch () {
      const res = await axios.get('/api/header');
      if (res.status === 200) {
        return res.data;
      }
      return null;
    }
  }
}
</script>
```
## 团队成员
[@lzxb](https://www.followme.com/user/203489)    
[@zhgh](https://www.followme.cn/user/229620/zone)    
[@Deboy](https://www.followme.com/user/196312/zone)    
[@sxqstyle](https://www.followme.com/user/256784/zone)   
