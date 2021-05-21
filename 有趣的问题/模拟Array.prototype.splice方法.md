```
/**
 *
 * @param start 开始删除的位置
 * @param deletetCount 删除个数
 * @param other 其他参数
 * @private
 */
 Array.prototype.splice = function (start, deleteCount, ...other) {
  if (start < 0) {
    //绝对值
    if (Math.abs(start) > this.length) {
      start = 0;
    } else {
      //小于0从后面算起，所以加上数组长度
      start += this.length;
    }
  }
    //当deleteCount不传值时
  if (deleteCount === undefined) {
    deleteCount = this.length - start;
  }
  //获取需要删除的数据
  const removeList = this.slice(start, start + deleteCount);
    //获取截取之后的右边数据
  const right = this.slice(start + deleteCount);
  let addIndex = start;
  right.concat(other).forEach(item => {
    this[addIndex] = item;
    addIndex++;
  })
  this.length = addIndex;
  return removeList;
}

```

