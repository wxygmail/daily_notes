**tab切换时，display:none  /  display:block; echart首次加载是没有问题**

```

setup() {
		//定义一个全局的chartDom 变量
    let chartDom = null;
    // 年度晶清分析echarts
    function initBar() {
      const barchart = document.getElementById("barchart");
      chartDom = echarts.init(barchart);
      const option = {... };
      chartDom.setOption(option);
    }
    //重点在这里，有实例先销毁！
    onBeforeUnmount(() => {
      if (!chartDom) {
        return;
      }
      chartDom.dispose();
      chartDom = null;
    });
    onMounted(() => {
      nextTick(() => initBar());
    });
    
  }
```

