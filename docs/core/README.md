---
sidebar: auto
---
# genesis-core
提供了生产环境运行所需的功能，所以它在生产环境时，总是保证依赖是最小的。在开发环境时，需要和 [@fmfe/genesis-compiler](../compiler) 配合使用

## 安装
```bash
# npm
npm install @fmfe/genesis-core
# yarn
yarn add @fmfe/genesis-core
```

## SSR 选项
```typescript
import { SSR } from '@fmfe/genesis-core';
const ssr = new SSR({
    // 选项
});
```
### name
  - 说明：应用名称，如果你的页面有多个`ssr`实例，需要使用不同的名词区分它。
  - 类型：`string`
  - 默认值：`ssr-genesis`
  - 例子：
```typescript
const ssr = new SSR({
    name: 'ssr-demo'
});
```
### build.baseDir
  - 说明：应用的根目录：在此基础上获取对应的 `src` 和 `dist`目录
  - 类型：`string`
  - 默认值：`path.resolve()`
  - 例子：
```typescript
const ssr = new SSR({
    build: {
        baseDir: path.resolve(__dirname, './')
    }
});
```
### build.outputDir
  - 说明：应用的编译目录，你可以使用相对于项目的路径，也可以使用绝对的路径
  - 类型：`string`
  - 默认值：`应用根目录/dist/`
  - 例子：
```typescript
const ssr = new SSR({
    build: {
        outputDir: path.resolve(__dirname, './dist')
    }
});
```
### build.transpile
  - 说明：默认的情况下，`webpack loader`会忽略 `node_modules` 目录的打包，通过配置 `build.transpile` 来打包你的程序，在开发插件的时候，特别有用
  - 类型：`string`
  - 默认值：`[]`
  - 例子：
```typescript
const ssr = new SSR({
    build: {
        transpile: [/src/]
    }
});
```

### build.alias
  - 说明：webpack的别名设置
  - 类型：`{[x: string]: string}`
  - 默认值：`{}`
```typescript
const ssr = new SSR({
    build: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
});
```
### build.browsers
  - 说明：根据你需要兼容的版本，来生产 js 和 css 的兼容代码，查看详情 [https://github.com/browserslist/browserslist](https://github.com/browserslist/browserslist)
  - 类型：`{
        client?: string | string[];
        server?: string | string[];
    }`
  - 默认值：
```typescript
{
    client: ['ie >= 9', 'ios >= 5', 'android >= 4.0'],
    server: [`node >= ${process.versions.node}`]
}
```
例子：
```typescript
import process from 'process';

const ssr = new SSR({
    build: {
        browsers: {
            client: ['ie >= 9', 'ios >= 5', 'android >= 4.0'],
            server: [`node >= ${process.versions.node}`]
        }
    }
});
```
### build.template
  - 说明：SSR 和 CSR 渲染的模板的地址，它使用了 [ejs](https://github.com/mde/ejs) 模板引擎，如果你配置了模板地址，就会使用你的模板地址，否则会使用默认模板
  - 类型：`string`
  - 默认值：`path.resolve(this.srcDir, 'index.html')`
  - 默认模板：
```html
<!DOCTYPE html>
<html>

<head>
    <title>Vue SSR for Genesis</title><%-style%>
</head>

<body>
<%-html%>
<%-scriptState%>
<%-script%>
</body>

</html>
```
例子：
```typescript
import path from 'path';

const ssr = new SSR({
    build: {
        template: path.resolve(__dirname, './index.html')
    }
});
```
## SSR 属性
```typescript
import { SSR } from '@fmfe/genesis-core';

const ssr = new SSR({
    // ...可选项
});

// ssr.属性

```
### ssr.Format
说明：一个渲染结果格式化的类，你可以修改默认的格式化逻辑，详情请看 [Format](./format.md)   
例子：
```typescript
import { SSR, Format } from '@fmfe/genesis-core';

class MyFormat extends Format {}

const ssr = new SSR({});
ssr.Format = MyFormat;
```
### ssr.Renderer
说明：一个SSR的渲染器，你可以修改默认的渲染逻辑，详情请看 [Renderer](./renderer.md)   
```typescript
import { SSR, Renderer } from '@fmfe/genesis-core';

const ssr = new SSR({});

class MyRenderer extends Renderer {}

ssr.Renderer = MyRenderer;

```
### ssr.options
说明：你传入的选项   
类型：`Genesis.Options`
### ssr.plugin
说明：插件系统，详情请看 [Plugin](./plugin.md)   
类型：`Genesis.PluginManage`   
### ssr.isProd
说明：判断是否是生产环境   
默认值：`process.env.NODE_ENV === 'production'`   
类型：`string`
### ssr.name
说明：应用的名称，[options.name](#name)可以修改这个值   
类型：`string`
### ssr.publicPath
说明：应用静态资源的基本路径，会影响 webpack 的相关配置，[options.name](#name)可以修改这个值   
类型：`string`
### ssr.baseDir
说明：应用的基本目录，[options.baseDir](#build-basedir)可以修改这个值      
默认值：`path.resolve()`
类型：`string`
### ssr.outputDir
说明：应用的编译输出目录，[options.build.outputDir](#build-outputdir)可以修改这个值      
默认值：`编译输出目录/应用名称/`   
类型：`string`
### ssr.srcDir
说明：源码目录   
默认值：`应用根目录/src/`
类型：`string`
### ssr.srcIncludes
说明：webpack loader 的 includes会读取配置，[options.build.transpile](#build-transpile)可以添加你需要打包的文件或者目录      
类型：`string`
### ssr.transpile
说明：`options.transpile`的配置   
类型：`string`
### ssr.entryClientFile
说明：客户端的入口文件    
默认值：`应用根目录/src/entry-server`    
类型：`string`
### ssr.entryServerFile
说明：服务端的入口文件   
默认值：`应用根目录/src/entry-server`   
类型：`string`
### ssr.clientManifestName
说明：客户端的映射文件名称   
默认值：`vue-ssr-client-manifest.json`   
类型：`string`
### ssr.outputClientManifestFile
说明：客户端的映射文件的输出路径   
默认值：`编译输出目录/应用名称/server/vue-ssr-client-manifest.json`   
类型：`string`
### ssr.serverBundleName
说明：服务端的映射文件名称   
默认值：`vue-ssr-server-bundle.json`   
类型：`string`
### ssr.outputServerBundleFile
说明：服务端的映射文件的输出路径   
默认值：`编译输出目录/应用名称/server/vue-ssr-server-bundle.json`   
类型：`string`
### ssr.templaceFile
说明：ssr 和 csr 的模块入口地址[options.build.templace](#build-template)可以修改这个值      
类型：`string`   
默认值：`应用根目录/src/index.html`

### ssr.outputTemplaceFile
说明：模板文件的输出地址   
类型：`string`   
默认值：`编译输出目录/应用名称/server/index.html`

## SSR 方法
### ssr.getBrowsers
说明：获取 browsers 的配置   
签名：
```typescript
ssr.getBrowsers(env: keyof Genesis.Browsers): Genesis.Browserslist;
```
例子：
```typescript
ssr.getBrowsers('client');
ssr.getBrowsers('server');
```
### ssr.createRenderer
说明：创建一个SSR的渲染器，一般来说，你会在生产环境中使用   
签名：
```typescript
ssr.createRenderer(options?: Genesis.RendererOptions): Renderer;
```
例子：
```typescript
const renderer = ssr.createRenderer();
const app = express();

// 静态资源挂载
app.use(
    renderer.staticPublicPath,
    express.static(renderer.staticDir, {
        immutable: true,
        maxAge: '31536000000'
    })
);
// SSR 渲染中间件
app.use(renderer.renderMiddleware());

```
## Renderer 属性
### renderer.ssr
说明：当前的SSR实例
### renderer.staticPublicPath
说明：静态资源文件的基本路径，等同于`ssr.publicPath`，在生产环境的时候会使用到
### renderer.staticDir
说明：静态资源文件所在的目录地址，等同于`ssr.staticDir`，在生产环境的时候会使用到  

## Renderer 方法
### renderer.hotUpdate
说明：热更新接口，一般来说只作为开发环境的热更新使用   
签名：
```typescript
renderer.hotUpdate(options?: Genesis.RendererOptions): void;
```
### renderer.renderJson
说明：渲染一个json，可以利用这个API开发出微前端应用所需的接口   
签名：
```typescript
renderer.renderJson(
    req: IncomingMessage,
    res: ServerResponse,
    mode: Genesis.RenderModeJson = 'ssr-json'
): Promise<Genesis.RenderResultJson>;
```
### renderer.renderHtml
说明：渲染一个html  
签名：
```typescript
renderer.renderHtml(
    req: IncomingMessage,
    res: ServerResponse,
    mode: Genesis.RenderMode = 'ssr-html'
): Promise<Genesis.RenderResultHtml>;
```
### renderer.render
说明：可以渲染成 json 或者 html，它更像是 `renderer.renderJson` 和 `renderer.renderHtml`的综合体  
签名：
```typescript
renderer.render(
    req: IncomingMessage,
    res: ServerResponse,
    mode: Genesis.RenderMode = 'ssr-html'
): Promise<Genesis.RenderResul>;
```
### renderer.renderMiddleware
说明：渲染的中间件，只要是类似于`express`的中间件设计，都可以直接使用，你可以通过[Plugin](./plugin)的方式来调整应该渲染成json或html   
签名：
```typescript
renderer.renderMiddleware(
    req: IncomingMessage, 
    res: ServerResponse, 
    next: (err: any) => void
): Promise<void>;
```
## Renderer 例子
### 生产环境使用
例子：
```typescript
import express from 'express';
import { SSR, Renderer } from '@fmfe/genesis-core';

const app = express();
const ssr = new SSR();
const renderer = ssr.createRenderer(); // 等同于 new Renderer(ssr);

// 设置静态目录
app.use(
    renderer.staticPublicPath,
    express.static(renderer.staticDir, {
        immutable: true,
        maxAge: '31536000000'
    })
);

// 首页渲染成html
app.get('/', (req, res, next) => {
    renderer
        .renderHtml(req, res, 'ssr-html')
        .then((r) => res.send(r.data))
        .catch(next); // SSR 报错，则向下一个中间件执行
});

// api开头的一律渲染成json
app.get('/api/', (req, res, next) => {
    renderer
        .renderJson(req, res, 'ssr-json')
        .then((r) => res.send(r.data))
        .catch(next); // SSR 报错，则向下一个中间件执行
});

// 其它路由，自动使用中间件渲染
app.get('*', renderer.renderMiddleware);

app.listen(3000, () => console.log(`http://localhost:3000`));

```

### 生成 HTML
说明：下面举了一个生成静态html的例子
```typescript
import { IncomingMessage, ServerResponse } from 'http';
import { Socket } from 'net';
import { SSR } from '@fmfe/genesis-core';

const ssr = new SSR();
const renderer = ssr.createRenderer();

const render = (url: string) => {
    const req = new IncomingMessage(new Socket());
    const res = new ServerResponse(req);
    return renderer.renderHtml(req, res, 'ssr-html');
};

render('/home').then((res) => {
    console.log(res.data); // 渲染成html，你可以保存起来，生成一个静态网站
});

```
## Plugin 插件
### 钩子说明
```typescript
import { SSR, Plugin } from '@fmfe/genesis-core';

class MyPlugin extends Plugin {

    /**
     * 编译之前执行
     */
    public beforeCompiler(type: Genesis.CompilerType) {}
    /**
     * 修改webpack的配置
     */
    public chainWebpack(config: Genesis.WebpackHookParams) {}
    /**
     * 编译完成之后执行
     */
    public afterCompiler(type: Genesis.CompilerType) {}
    /**
     * 渲染之前执行
     */
    public renderBefore(context: Genesis.RenderContext) {}
    /**
     * 渲染之后执行
     */
    public renderCompleted(context: Genesis.RenderContext) {}
}

const ssr = new SSR();
ssr.plugin.use(new MyPlugin(ssr));

```

### 外置化依赖
说明：如果你正在开发大型的应用，需要提供远程组件加载，避免项目与项目之间重复加载同样的内容，那么外置化依赖是必不可少的
```typescript
class MyPlugin extends Plugin {
    /**
     * 修改webpack的配置
     */
    public chainWebpack({ config, target }: Genesis.WebpackHookParams) {
        if (target === 'client') {
            config.externals({
                vue: 'Vue',
                'vue-router': 'VueRouter',
                axios: 'axios'
            });
        }
    }

    /**
     * 渲染之前执行
     */
    public renderBefore(context: Genesis.RenderContext) {
        context.data.script +=
            '<script src="https://cdn.jsdelivr.net/npm/vue@' + require('vue').version + '" defer></script>' +
            '<script src="https://cdn.jsdelivr.net/npm/vue-router@' + require('vue-router').version + '" defer></script>' +
            '<script src="https://cdn.jsdelivr.net/npm/axios@' + require('axios').version + '" defer></script>';
    }
}

```
## Format 属性
### format.ssr
说明：在创建实例的时候，会将当前的ssr实例传入，所以它总是会这样
```typescript
const ssr = new SSR()
const renderer = ssr.createRenderer();
const format =  new Format(ssr);
format.ssr === ssr // true
```
## Format 方法
### format.page
说明：完整的对页面进行渲染，包含了`style`、`script`、`state`、`script`
签名：
```typescript
format.page(data: Genesis.RenderData): string;
```
默认值：
```typescript
public page(data: Genesis.RenderData) {
    return (
        this.style(data) +
        this.html(data) +
        this.scriptState(data) +
        this.script(data)
    );
}
```
例子：
```typescript
import { Format } from '@fmfe/genesis-core';

const format = new Format();

renderer.renderJson(req, res).then(res => format.page(res.data));
```
在你调用 `renderer.renderHtml(req, res)` 和 `renderer.renderMiddleware(req, res, next)` 时，会自动调用对应的格式化方法   
你也可以在调用 `renderer.renderJson(req, res)` 方法时，手动进行格式化状态

### format.html
说明：对html进行格式化   
签名：
```typescript
format.html(data: Genesis.RenderData): string;
```
默认值：
```typescript
public html(data: Genesis.RenderData) {
    return data.html;
}
```   
例子：
```typescript
renderer.renderJson(req, res).then(res => format.html(res.data));
```
### format.style
说明：对样式进行格式化   
签名：
```typescript
format.style(data: Genesis.RenderData): string;
```
默认值：
```typescript
public style(data: Genesis.RenderData) {
    return data.style;
}
```   
例子：
```typescript
renderer.renderJson(req, res).then(res => format.style(res.data));
```
### format.scriptState
说明：对状态进行格式化，默认会使用[serialize-javascript](https://github.com/yahoo/serialize-javascript)来注入应用的状态   
签名：
```typescript
format.scriptState(data: Genesis.RenderData): string;
```
默认值：
```typescript
public scriptState(data: Genesis.RenderData) {
    const scriptJSON: string = serialize(
        {
            url: data.url,
            id: data.id,
            name: data.name,
            state: data.state
        },
        {
            isJSON: true
        }
    );
    return `<script data-ssr-genesis-name="${data.name}" data-ssr-genesis-id="${data.id}">window["${data.id}"]=${scriptJSON};</script>`;
}
```
例子：
```typescript
renderer.renderJson(req, res).then(res => format.scriptState(res.data));
```
### format.script
说明：对脚本进行格式化   
签名：
```typescript
format.script(data: Genesis.RenderData): string;
```
默认值：
```typescript
public script(data: Genesis.RenderData) {
    return data.script;
}
```
例子：
```typescript
renderer.renderJson(req, res).then(res => format.script(res.data));
```