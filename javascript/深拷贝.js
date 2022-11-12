/**
 * 深拷贝函数
 * @param target 需要拷贝的对象
 */
const deepClone = (target, map = new Map()) => {
  //基本数据类型直接返回
  if (typeof target !== 'object') {
    return target
  }
  /**
   * 判断是否为数据类型
   * 如果没有这一层判断，拷贝出来的数组会变成对象
   * 源: [ '蓝忘机', '魏无羡' ]
   * 目标: { '0': '花城', '1': '魏无羡' }
   */
  const newObj = Array.isArray(target) ? [] : {}
  //判断 map 是否存在
  /**
   * 解决环形引用报错问题
   * a.key = a
   * RangeError: Maximum call stack size exceeded
   */
  if (map.has(target)) {
    return map.get(target)
  }
  map.set(target, newObj)
  for (const t in target) {
    newObj[t] = deepClone(target[t], map)
  }
  return newObj
}
const a = {
  name: 'lanwangji',
  age: 23,
  info: {
    address: '123'
  },
  hop: ['蓝忘机', '魏无羡']
}
a.keys = a
const b = deepClone(a)
b.info.address = '6767'
b.hop[0] = '花城'
console.log('a.info:', a.info)
console.log('b.info:', b.info)
console.log('a.hop:', a.hop)
console.log('b.hop:', b.hop)
console.log(a.keys.keys)
