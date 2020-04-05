# Plugin
这是一个 SSR 的插件系统，你可以根据自己的需求来开发插件 

## 钩子说明
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

## 外置化依赖
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
            '<script src="https://cdn.jsdelivr.net/npm/vue-router@' + require('vue-router').version + '" defer></script>';
    }
}

```