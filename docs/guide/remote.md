# 深入远程组件
## 编写API 接口
```typescript
app.get('/api/index', (req, res, next) => {
    renderer
        .renderJson(req, res)
        .then((r) => res.send(r.data))
        .catch(next);
});
```
请求输出结果如下：
```json
{
  "id": "6b354339e62f25aa1569ec0cafc19805",
  "name": "ssr-genesis",
  "url": "/api/index",
  "html": "<div data-ssr-genesis-id=\"6b354339e62f25aa1569ec0cafc19805\" data-server-rendered=\"true\" class=\"app\" data-v-5ef48958><h2 data-v-5ef48958>你好世界！</h2> <p class=\"text\" data-v-5ef48958>\n        未安装\n    </p></div>",
  "style": "<style data-vue-ssr-id=\"57367e92:0\">.app[data-v-5ef48958] {\n  padding: 100px;\n  text-align: center;\n}\n.text[data-v-5ef48958] {\n  color: #999;\n  font-size: 14px;\n  cursor: pointer;\n}\n</style>",
  "script": "<script src=\"/ssr-genesis/js/runtime.js\" defer></script><script src=\"/ssr-genesis/js/app.js\" defer></script>",
  "scriptState": "<script data-ssr-genesis-name=\"ssr-genesis\" data-ssr-genesis-id=\"6b354339e62f25aa1569ec0cafc19805\">window[\"6b354339e62f25aa1569ec0cafc19805\"]={\"url\":\"\\u002F\",\"id\":\"6b354339e62f25aa1569ec0cafc19805\",\"name\":\"ssr-genesis\",\"state\":{}};</script>",
  "state": {},
  "resource": [
    {
      "file": "/ssr-genesis/js/runtime.js",
      "extension": "js"
    },
    {
      "file": "/ssr-genesis/js/app.js",
      "extension": "js"
    }
  ]
}
```
## 调用原理
::: tip 原理
将 `style`、 `html`、`scriptState`、`script` 依次渲染到页面中，等 `js` 加载完成后，程序将在全局的 `window.genesis.applicationCenter` 中注册一个应用，js首次加载时，将会尝试自动初始化   
:::

- 在客户端，如果同一个服务多次远程调用，势必会导致同样的 `css`、 `js` 文件被插入多次，这个就会引发bug
- 在服务端，如果一个服务多次远程调用，或者服务的服务又再远程调用，需要解决同服务之间 `css` 和 `js` 重复的问题