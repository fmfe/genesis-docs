# 引导
`@fmfe/genesis-core` 核心库，只提供了生产环境运行所需的功能，所以它在生产环境时，总是保证依赖是最小的。在开发环境时，需要和 `@fmfe/genesis-compiler`配合使用

## 安装
```bash
# npm
npm install @fmfe/genesis-core
# yarn
yarn add @fmfe/genesis-core
```

## 核心概念
- [SSR](./ssr)
- [Renderer](./renderer)
- [Plugin](./plugin)
- [Format](./format)