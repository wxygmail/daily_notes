## Reactive和Ref的对比

### 从定义角度：

ref用来定义数据：基本数据类型

reactive同来定义数据：对象（或数组）类型数据

**备注：ref也可以用来定义对象（或数组）类型数据*。它内部会自动通过reactive转为代理对象。**

### 从原理角度

ref通过Object.defineProperty()的get和set来实现响应式（数据劫持）

reactive通过使用Proxy来实现响应式（数据劫持），并通过Reflect操作源对象内部的数据

```
  const proxyData = new Proxy(origin, {
    get(target, p, receiver) {
      return Reflect.get(target, p);
    },
    set(target, p, value) {
      Reflect.set(target, p)
    },
    deleteProperty(target, p) {
      return delete Reflect.deleteProperty(target, p)
    }
  })
```



### 从使用角度

ref定义的数据：操作数据需要.value，读取数据时模板中直接读取不需要.value

reactive定义的数据：操作数据与读取数据：均不需要.value

