# Format
对SSR的结果进行格式化。   
在你调用渲染器的`renderer.renderHtml(req, res)`和`renderer.renderMiddleware(req, res, next)`时，会自动调用对应的格式化方法   
你也可以在调用渲染器的`renderer.renderJson(req, res)`方法时，手动进行格式化状态
```typescript
renderer.renderJson(req, res).then(res => format.page(res.data));
```

## 属性
### format.ssr
说明：在创建实例的时候，会将当前的ssr实例传入，所以它总是会这样
```typescript
const ssr = new SSR()
const renderer = ssr.createRenderer();
const format =  new Format(ssr);
format.ssr === ssr // true
```
## 方法
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
renderer.renderJson(req, res).then(res => format.page(res.data));
```

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
