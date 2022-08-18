// 防抖：防止抖动，单位时间内事件触发会被重置，避免事件被误伤触发多次。代码实现重在清零 clearTimeout
// 节流：控制流量，单位时间内事件只能触发一次，如果服务器端的限流即 Rate Limit。代码实现重在开锁关锁 timer=timeout; timer=null
/**
 * 防抖函数
 * @param fn 需要防抖方法
 * @param delay 间隔多少秒
 * @return {(function(): void)|*}
 */
function debounce(fn, delay) {
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}

/**
 * 节流函数 (setTimeout 方式)
 * @param fn 需要防抖方法
 * @param delay 间隔多少秒
 * @return {(function(): void)|*}
 */
function throttle(fn, delay) {
  let timer = null
  return function () {
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, delay)
  }
}

/**
 * 节流函数 (new Date 方式)
 * @param fn 需要防抖方法
 * @param delay 间隔多少秒
 * @return {(function(): void)|*}
 */
function throttleTime(fn, delay) {
  let start = null
  return function () {
    const end = new Date()
    if (end - start >= delay) {
      fn.apply(this, arguments)
      start = end
    }
  }
}
