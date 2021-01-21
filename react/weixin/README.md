

#### 扫码绑定微信

在业务开发，我们在个人信息模块中，有时会遇到绑定微信的需求开发，面对我这种小白，不知道该从何下手，在慢慢的摸索过程当中，稍微弄明白一点点，接下来我会以自己小白的方式做简单的描述，其实就是想记起来，免得下次又不懂怎么敲代码了。

具体的授权流程请参考微信官方文档：https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html

<img src="C:\Users\wxy\AppData\Roaming\Typora\typora-user-images\image-20210121150159386.png" alt="image-20210121150159386" style="zoom: 50%;" />

###### （1）首先你需要在index.html（你的html页面）添加一个加载微信插件的<script></script>标签.

```
<script src="https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"></script>
```

###### （2）需要调用一个获取微信相关数据的接口，接口所需要传递的参数，需要同后端同事进行沟通.

一般我们需要后端接口给我们返回以下数据，当然，返回的内容形式根据公司规范略有不同：

```
appid：应用唯一标识（例：wx111111111111）
callBackDomain：域名（例：http://test.umc.xxxx.yyy.com）
callbackUrl：主要的回调Url(例：/third/login/global/codeBindCallback.do)
state:用于防止CSRF攻击(例：wx_202774832217184256)
```

```
当获取成功以上数据，我们就可以像如下方式进行调用：
export default props=>{
    new window.WxLogin({
            self_redirect: true, // true: 页内iframe跳转; false: 新标签页打开 
            appid: appId,
            id: 'wxDIV', //这个是用来进行二维码展示的div
            scope: 'snsapi_login', //用户授权的作用域
            state:state,
            'redirect_uri': callBackDomain + callbackUrl,//重定向地址
            href: `${callBackDomain}/css/g_wxQc.css`,
          });
    //绑定成功时的函数回调
    window.wxQcCb = (qsObj = {}) => {
        const { code, message: msg } = qsObj;
        if (code == '0000') {
          message.success('您已成功绑定微信账号！');      
            } else {
          message.error(msg);
    	}
  };
    return <>
			<div id="wxDIV"></div>
		</>
}      
```