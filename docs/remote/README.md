---
sidebar: auto
---
# genesis-remote
这是一个基础的远程组件，当你使用 `renderer.renderJson(options)` 输出 json 的时候，你期望它能够在其它的服务上使用。如果你想更加深入的了解它是怎么工作的，[点击这里查看源码](https://github.com/fmfe/genesis/blob/master/packages/genesis-remote/src/index.ts)
## 安装
```bash
# npm
npm install @fmfe/genesis-remote -D
# yarn
yarn add @fmfe/genesis-remote -D
```
### 全局注册
```typescript
import Vue from 'vue';
import RemoteView from '@fmfe/genesis-remote';

Vue.use(RemoteView);
```
程序将会在全局注册一个 `remote-view` 组件
### 局部注册
```typescript
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
说明：只会在`客户端`执行，优先级比 fetch 高
```vue
<template>
    <remote-view :clientFetch="clientFetch" />
</template>
```
### serverFetch
说明：只会在`服务端`执行，优先级比 fetch 高
```vue
<template>
    <remote-view :serverFetch="serverFetch" />
</template>
```
## 数据结构
在执行 `fetch`、`clientFetch`、`serverFetch` 钩子时，需要返回 `renderer.renderJson(options)` 执行的结果。所以基本的数据结构，应该是下面这样子的
```typescript
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