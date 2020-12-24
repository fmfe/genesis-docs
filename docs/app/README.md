---
sidebar: auto
---
# genesis-app
它提供了快速创建APP的方法，以及包装了 `vue-router`，它帮你解决了在历史模式下，多个 `Router` 实例冲突的问题

## 安装
```bash
npm install vue-router @fmfe/genesis-app
```

## 使用
### 路由配置
```ts
// import VueRouter from 'vue-router';
import { Router } from '@fmfe/genesis-app';
const router = new Router({
    mode: 'history'
});
```
只需要将 [VueRouter](https://github.com/vuejs/vue-router) 修改成 `@fmfe/genesis-app` 的 Router 即可，其它的还是和 [VueRouter](https://github.com/vuejs/vue-router) 的使用方式一样
### 客户端使用
```ts
// entry-client.ts
import { ClientOptions } from '@fmfe/genesis-core';
import { createClientApp } from '@fmfe/genesis-app';
import Vue from 'vue';
import App from './app.vue';

export default async (clientOptions: ClientOptions): Promise<Vue> => {
    return createClientApp({
        App,
        clientOptions,
        vueOptions: {
            // 传递给 new Vue({}) 的选项
            // 默认将 renderContext 传递给 new Vue({ clientOptions })
        }
    });
};

```
### 服务端
```ts
// entry-server.ts
import { RenderContext } from '@fmfe/genesis-core';
import { createServerApp } from '@fmfe/genesis-app';
import Vue from 'vue';
import App from './app.vue';

export default async (renderContext: RenderContext): Promise<Vue> => {
    return createServerApp({
        App,
        renderContext,
        vueOptions: {
            // 传递给 new Vue({}) 的选项
            // 默认将 renderContext 传递给 new Vue({ renderContext })
        }
    });
};

```

### 远程组件  
有的时候，我们我们希望自己的服务，可以提供给其它的服务使用，这样时候就需要对外提供远程组件了，让其它服务使用[远程组件](/remote/)来调用。调用远程组件渲染的时候，一般来说路由模式都会使用 `abstract` 来渲染对应的组件，但是我们又期望远程组件内部跳转的时候，可以使用 `history` 模式。所以我们给 `Router` 拓展了 `syncHistory` 选项，你可以以此来实现 `React Server Components` 类似的功能
```ts
// Express 例子，对外提供远程组件
app.use('/remote-component', async (req, res, next) => {
    const r = await renderer
        .renderJson({
            // 下面的参数，你都可以通过 get 或者 post请求接收对应的参数，这里就不多作介绍
            // 具体的传参，可以去了解一下渲染器相关的API
            url: '/remote/component/my',
            mode: 'ssr-json',
            state: {
                mode: 'abstract',
                syncHistory: true
            }
        })
        .catch(next);
    if (r) {
        res.send(r.data);
    }
});
// entry-client.ts
import Vue from 'vue';
import { ClientOptions } from '@fmfe/genesis-core';
import { createClientApp, Router } from '@fmfe/genesis-app';
import { App } from './routes';

export default async (clientOptions: ClientOptions): Promise<Vue> => {
    return createClientApp({
        App,
        clientOptions,
        vueOptions: {
            router: new Router({
                mode: clientOptions.state.mode,
                syncHistory: clientOptions.state.syncHistory,
                routes: [
                    {
                        path: '/remote/component/my',
                        component: My
                    }
                ]
            })
        }
    });
};

// entry-server.ts

import Vue from 'vue';
import { RenderContext } from '@fmfe/genesis-core';
import { createServerApp, Router } from '@fmfe/genesis-app';
import { App } from './routes';

export default async (renderContext: RenderContext): Promise<Vue> => {
    return createServerApp({
        App,
        renderContext,
        vueOptions: {
            router: new Router({
                mode: renderContext.data.state.mode,
                syncHistory: renderContext.data.state.syncHistory,
                routes: [
                    {
                        path: '/remote/component/my',
                        component: My
                    }
                ]
            })
        }
    });
};

```
实现上面的功能后，你在其它服务就可以使用[远程组件](/remote/)来渲染了。