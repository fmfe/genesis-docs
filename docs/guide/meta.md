## 页面元信息
项目要做 SSR 渲染，其中很大一部分原因就是能够对 SEO 更加的友好。本文将会讲解如何使用[vue-meta](https://vue-meta.nuxtjs.org/)来管理页面的信息

## 安装依赖
```bash
npm install vue-meta
```

## 使用
:::tip
在客户端的 `entry-client.ts` 和服务端的 `entry-server.ts` 文件都需要安装
:::
```ts
import Vue from 'vue'
import VueMeta from 'vue-meta'

Vue.use(VueMeta)
```
在任意组件中使用
```vue
<template>
    <div class="app">
        ....
    </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'app',
    metaInfo() {
        return {
            title: '标题'
        };
    }
});
</script>
```

### 获取 SEO 配置信息
```ts
import { RenderContext } from '@fmfe/genesis-core';
import Vue from 'vue';

/**
 * 服务端入口，需要导出一个方法，并且返回一个 Promise<Vue>
 */
export default async (renderContext: RenderContext): Promise<Vue> => {
    /**
     * 创建服务端应用程序
     */
    const app = new Vue({
        // options
    });
    /**
     * 等渲染完成后，将标题传输给 index.html 模板中
     */
    renderContext.beforeRender(() => {
        // 如果你需要设置网站的关键词、描述等等，请查阅相关文档：https://vue-meta.nuxtjs.org/
        const {
            title,
            meta,
            link,
            style,
            script,
            htmlAttrs,
            headAttrs,
            bodyAttrs,
            base,
            noscript
        } = app.$meta().inject();
        // 在 index.html 文件中使用 <%- meta.title %>  就可以渲染出标题了，其它的举一反三
        Object.defineProperty(renderContext.data, 'meta', {
            enumerable: false,
            value: {
                title: title?.text() || '',
                meta: meta?.text() || '',
                link: link?.text() || '',
                style: style?.text() || '',
                script: script?.text() || '',
                htmlAttrs: htmlAttrs?.text() || '',
                headAttrs: headAttrs?.text() || '',
                bodyAttrs: bodyAttrs?.text() || '',
                base: base?.text() || '',
                noscript: noscript?.text() || ''
            }
        });
    });
    return app;
};

```
## 自定义模板
```ts
import path from 'path';

const ssr = new SSR({
    build: {
        template: path.resolve(__dirname, './index.html')
    }
});
```
你需要自定义一个html模板，更多[查看](../core/#build-template)

## 在模板中使用
```html
<!DOCTYPE html>
<html <%-meta.htmlAttrs%>>

<head <%-meta.bodyAttrs%>>
    <%-meta.meta%>
    <%-meta.title%>
    <%-meta.link%>
    <%-meta.style%>
    <%-style%>
</head>

<body <%-meta.headAttrs%>>
<%-html%>
<%-meta.noscript%>
<%-scriptState%>
<%-meta.script%>
<%-script%>
</body>

</html>
```