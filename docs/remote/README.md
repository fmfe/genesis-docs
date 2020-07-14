---
sidebar: auto
---
# genesis-remote
这是一个基础的远程组件，当你使用 `renderer.renderJson(options)` 输出 json 的时候，你期望它能够在其它的服务上使用。如果你想更加深入的了解它是怎么工作的，[点击这里查看源码](https://github.com/fmfe/genesis/blob/master/packages/genesis-remote/src/index.ts)
## 安装
```bash
npm install @fmfe/genesis-remote
```
### 全局注册
```ts
import Vue from 'vue';
import RemoteView from '@fmfe/genesis-remote';

Vue.use(RemoteView);
```
程序将会在全局注册一个 `remote-view` 组件
### 局部注册
```ts
import Vue from 'vue';
import { RemoteView } from '@fmfe/genesis-remote';

Vue.extend({
    components: {
        RemoteView
    }
});
```
一般来说，远程组件使用的频率都不会特别高，推荐在局部注册组件

## 回调函数
### fetch
说明：在`服务端`和`客户端`都会执行
```vue
<template>
    <remote-view :fetch="fetch" />
</template>
```
### clientFetch
说明：在`客户端`执行，优先级比 fetch 高
```vue
<template>
    <remote-view :clientFetch="clientFetch" />
</template>
```
### serverFetch
说明：在`服务端`执行，优先级比 fetch 高，只能在基于 `Genesis` 开发的服务才能使用。
```vue
<template>
    <remote-view :serverFetch="serverFetch" />
</template>
```
特别说明：因为在服务端加载远程组件，需要存储远程服务的数据，所以需要将对应的上下文传给 `Vue` 实例
```ts
// entry-client.ts
import { ClientOptions } from '@fmfe/genesis-core';
import Vue from 'vue';

export default async (clientOptions: ClientOptions): Promise<Vue> => {
    return new Vue({
        clientOptions
    });
};
// entry-server.ts
import { RenderContext } from '@fmfe/genesis-core';
import Vue from 'vue';

export default async (renderContext: RenderContext): Promise<Vue> => {
    return new Vue({
        renderContext
    });
};

```
## 数据结构
在执行 `fetch`、`clientFetch`、`serverFetch` 钩子时，需要返回 `renderer.renderJson(options)` 执行的结果。所以基本的数据结构，应该是下面这样子的
```ts
export interface RemoteViewData {
    automount: boolean;
    html: string;
    id: string;
    name: string;
    style: string;
    script: string;
    url: string;
    state: { [x: string]: any };
}
```
## 完整例子
```vue
<template>
    <remote-view :fetch="fetch" />
</template>
<script>
export default {
    methods: {
        fetch () {
            // 调用其它服务的组件
            const res = await axios.get('/api/ssr-服务名称/render?url=/demo');
            if (res.status === 200) {
                return res.data;
            }
            return null
        }
    }
}
</script>

```

## 事件通信
可以像正常的组件那样，监听到远程组件根组件发射的事件
```vue
<template>
    <remote-view :fetch="fetch" @my-event="myEvent" />
</template>
<script>
export default {
    methods: {
        myEvent(str) {
            console.log(str); // Hello world
        }
    }
}
</script>

```
远程组件发射事件
```ts
this.$root.$emit('my-event', 'Hello world');
```
