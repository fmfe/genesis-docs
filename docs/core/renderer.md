# Renderer
## 属性
### renderer.ssr
说明：当前的SSR实例
### renderer.staticPublicPath
说明：静态资源文件的基本路径，等同于`ssr.publicPath`，在生产环境的时候会使用到
### renderer.staticDir
说明：静态资源文件所在的目录地址，等同于`ssr.staticDir`，在生产环境的时候会使用到  

## 方法
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

### renderer.createContext
说明：

## 综合例子
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

## 高级例子
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