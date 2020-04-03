# Build
构建生产环境版本
## 属性
### build.ssr
说明：创建对象时，传入的 ssr 对象
## 方法
### build.start
说明：开始执行编译   
签名：
```typescript
build.start(): Promise<[boolean, boolean]>;
```
### build.destroy
说明：取消编译，释放内存   
签名：
```typescript
build.destroy(): Promise<void>;
```
## 例子
```typescript
import { Build } from '@fmfe/genesis-compiler';
import { SSR } from '@fmfe/genesis-core'

const start = () => {
    const ssr = new SSR();
    const build = new Build(ssr);
    return build.start();
};
export default start();
```