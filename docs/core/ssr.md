# SSR
它提供了程序基础的配置，和插件系统，它本身不负责任何功能的实现，一切功能都由它的插件来实现。

## 使用
```typescript
import { SSR } from '@fmfe/genesis-core';

const ssr = new SSR({
    // ...可选项
});

```

## 选项
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
  - 说明：项目的根目录：在此基础上获取对应的 `src` 和 `dist`目录
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
        transpile: [/你要打包的地址/]
    }
});
```

### build.alias
  - 说明：webpack的别名设置
  - 类型：`[x: string]: string`
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