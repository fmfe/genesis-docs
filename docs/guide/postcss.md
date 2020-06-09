# Postcss
程序没有提供对应的参数配置，只能以插件的形式去修改 [Postcss](https://www.npmjs.com/package/postcss-loader) 的配置。

## 编写 Postcss 插件
```ts
import { Plugin, PostcssOptions } from '@fmfe/genesis-core';

export class PostcssPlugin extends Plugin {
    public postcss(config: PostcssOptions) {
        config.plugins.push({
            // 插件
        });
    }
}
```
`genesis.dev.ts` 和 `genesis.build.ts` 使用这个插件
```ts
ssr.plugin.use(PostcssPlugin);
```