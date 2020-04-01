# SSR
它提供了程序基础的配置，和插件系统，它本身不负责任何功能的实现，一切功能都由它的插件来实现。

## 选项
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
## 属性
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

## 方法
### ssr.getBrowsers
说明：获取 browsers 的配置
例子：
```typescript
ssr.getBrowsers('client');
ssr.getBrowsers('server');
```
### ssr.createRenderer
说明：创建一个SSR的渲染器，一般来说，你会在生产环境中使用   
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