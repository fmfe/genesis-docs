# Plugin
这是一个 SSR 的插件系统，你可以根据自己的需求来开发插件   
例子：
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
    public webpackConfig(config: Genesis.WebpackHookParams) {}
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