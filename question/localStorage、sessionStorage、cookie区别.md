### 什么是localStorage？

localStorage是HTML5提供的一个人API，主要是用来作为本地存储使用，解决了cookie存储空间不足的问题（cookie存储大小为4kb），localStorage中一般浏览器支持大小为5M，会因为浏览器的不用有所差异。

localStorage的使用方法：

```
//存储
localStorage.setItem("key","value");
localStorage['key'] = value;
//获取
localStorage.getItem('key');  //value
//删除某个key
localStorage.remove('key');
//清除所有localStorage中的信息
localStorage.clear()
```

### 什么是sessionStorage?

与localStorage类似，但是保存的生命周期不同。sessionStorage更适合用来存储生命周期和它同步的会话级别信息。这些信息只适用于当前网页会话，关闭页面或浏览器后就会被清除。它的使用方法与localStorage一样。

### 什么是Cookie？

HTTP Cookie(也叫WebCookie 或 浏览器 Cookie)是服务器发送到浏览器的一小块数据，它会在浏览器下次向同一服务器发起请求时被携带并发送到服务器上。通常，它用于告知服务器俩个请求是否来自同一个浏览器，如保持用户的登录状态。Cookie使基于无状态的HTTP协议记录稳定的状态信息成为可能。

### 三者之间的区别？

- 都是保存在浏览器端，并且都是同源的。
- cookie数据始终在同源的HTTP请求中携带（即使不需要用到cookie，也会一并携带），即cookie在浏览器和服务器之间来回传递，而localStorage和sessionStorage不会自动把数据发给服务端，仅在本地保存。cookie还有path（路径）的概念，可以限制cookie在某个路径下。
- 存储大小的限制不同，cookie的数据不能超过4KB，同时因为每次请求都会携带cookie，所以cookie只适合用来保存小数据，如会话标识。localStorage和sessionStorage虽然存在存储大小的限制，但是比cookie大多，可以达到5M或者更大（因浏览器的差异变化）。
- 数据的有效期不同，localStorage始终有效，及时关闭窗口或浏览器，除非手动清除，用作持久存储数据；sessionStorage在关闭当前页面会话之前，或者在session有效期之内一直有效，当关闭当前页面或者浏览器，sessionStorage数据就会释放；cookie在过期时间之内一直有效，即使关闭当前页面或者关闭浏览器。
- 作用域的不同，sessionStorage只在同一个窗口中共享，即使同一个页面不同窗口都是不能的；localStorage和cookie在所有同源窗口中都是共享的。

以上三种都只能存储少量的简单数据，当遇到大规模的，结构复杂的数据时，他们就爱莫能助了。这时候就应该轮到我们的终极大BOSS出马啦---IndexedDB。

<img src="../images/cookie/shuai.jpg" style="zoom:50%;" />

### IndexedDB的概念

根据[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API)解释

```
IndexedDB是一种底层的API，用于在客户端存储大量的数据化结构（也包括文件/二进制大型对象(blobs)）。该API使用索引实现对数据的高性能搜索。
```

IndexedDB是一个运行在浏览器上的非关系型数据库，既然是数据库，那就是不是5M、10M这种小级别的存储量了。理论上来说，IndexedDB是没有存储上限的（一般不会小于250M）。他不仅可以存储字符串，还可以存储二进制数据。

**IndexedDB特点：**

**键值对储存**

IndexedDB内部采用对象仓库存放数据。所有类型的数据都直接存入，包括js对象。对象仓库中，数据以“键值对”的形式保存，每一个数据记录都有对应的主键，主键是独一无二的，不能重复，否则会抛出错误。

**异步**

IndexedDB操作是不会锁死浏览器，用户依然可以进行其他操作，这与localStorage形成对比，后者的操作是同步的。异步设计是为了防止大量数据的读写，拖慢网页的表现。

**支持事务**

IndexedDB支持事务操作，这就意味着一系列操作步骤之中，只要有一步失败，整个事务就都取消，数据库回滚到事务发生之前的状态，不存在只改写一部分数据的情况。

**同源限制**

IndexedDB受同源限制，每一个数据库对应创建他的域名。网页只能访问自身域名下的数据库，而不能跨域访问。

**存储空间大**

IndexedDB的存储空间很大，一般来说不少于250M，甚至没有上限。

**支持二进制存储**

IndexedDB不仅可以存储字符串，还可以存储二进制数据（Array Buffer对象和Blob对象）