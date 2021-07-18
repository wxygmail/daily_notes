const obj = [
  {
    name: '11',
    id: '123',
    children: [
      {
        name: '11-11',
        id: '123',
        children: [
          {
            name: '11-啦啦啦',
            id: '000'
          }
        ]
      }
    ]
  },
  {
    name: '22',
    id: '234',
    children: [
      {
        name: '22-11',
        id: '222',
      }
    ]
  },
]
/**
 *
 * @param arr []
 * @returns {*[]}
 */
const recursion = (arr) => {
  const _arr = [];
  //遍历数组
  arr.forEach(item => {
    const _obj = {};
    // 判断是否有children,再进行递归操作
    if (item?.children) {
      const ch = recursion(item?.children || []);
      _obj.children = ch;
    }
    //需要的数据对象结构
    _obj['label'] = item.name;
    _obj['value'] = item.id;
    _arr.push(_obj)
  })
  return _arr;
}
const a = recursion(obj);
console.log(a,1111)
