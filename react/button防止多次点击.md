在实际开发中，在很短的时间内多次点击一个按钮，此时发送多个网络请求，这在开发联调过程中会触发很多错误。

假设现在请求一个接口，你可能很快就会想到，设置一个开关，等第一次请求完毕再把开关打开。很好，very good，我刚开始也是这么想的，好家伙，我开心的写下这简略的代码：

```
let changeStatus = null;
const Testing = () => {
    const getMessageBtn = () => {
        if (changeStatus !== null) return console.log("已经发送了一次请求！");
        changeStatus = "click";
        console.log("你应该只能看见我一次");
        //发起请求
        getMessage().then(res => {
        //请求回来做相应事
            if (res.status) {
            //请求回来之后再初始化
                window.location.href = "http://www.baidu.com";
                changeStatus = null;
            }
        })
    }
        return <SquareBackground>
        <Button onClick={getMessageBtn}>快速点击</Button>
    </SquareBackground>
};
```

此时，你点击button，按我们心中所想，“你应该只能看见我一次”只能打印一次，可是快速点击的时候还会看到多次，你又回去瞅代码，咦~这逻辑没毛病啊，点击一次，changeStatus为空继续往下走并为其设置值，在请求回来才初始化。左思右想，你还是打算去吃个雪糕放松放松。

在这简短的代码，涉及事件循环机制，一个线程中，事件循环是唯一的，但是任务队列可以拥有多个。任务队列又分为macro-task（宏任务）与micro-task（微任务），在最新标准中，它们被分别称为task与jobs。详细请移步：https://www.jianshu.com/p/12b9f73c5a4f

1. macro-task大概包括：script(整体代码), setTimeout, setInterval, setImmediate, I/O, UI rendering。
2. micro-task大概包括: process.nextTick, Promise, Object.observe(已废弃), MutationObserver(html5新特性)
3. setTimeout/Promise等我们称之为任务源。而进入任务队列的是他们指定的具体执行任务。

有了macro-task，micro-task，来分析一下为什么会造成以上问题。ajax请求成功，跳转百度首页，在这个任务队列里面，跳转链接已经赋值，当快速点击button，页面还未来得及跳转，此时changeStatus置空，就会再次发起请求，为了避免这个问题，我们可以通过以下方法解决：

````
getMessage().then(res => {
            if (res.status) {
                window.location.href = "http://www.baidu.com";
                //定义一个定时器（创建一个宏任务），只有当script(整体代码)执行完成之后，才会去执行 macro-task               			//这样就可以避免多次点击发起多次请求的问题
                setTimeout(() => {
                    changeStatus = null;
                }, 0)
            }
        })
````





