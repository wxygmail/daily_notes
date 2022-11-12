/**
 * @Description: 文本对比
 * @Author: WuXiaoyan
 * @Date: 2022-10-11 13:07:00
 * @LastEditors: WuXiaoyan
 * @LastEditTime: 2022-10-11 13:07:00
 **/

import React, {useRef} from "react";

import {useEffect} from "react";

const Diff = require('diff')

const TextDiff = (params = {}) => {

  const {
    oldVal,
    newVal,
    visibleType,
    optionsConfig = {}
  } = params
  const options = {
    added: 'red', //修改之后的文本颜色
    removed: 'red', // 旧文本变化的颜色
    colorKey: 'added', // 判断颜色所选取的值
    usualColor: '#333', // 其他无变化的文本颜色
    ...optionsConfig
  }
  const ref = useRef(null)
  const _d = Diff.diffChars(String(oldVal) || "", String(newVal) || "") || []
  /**
   * 创建文档碎片节点
   * 作用：可以创建一个文档碎片，把所有的新节点附加其上，然后把文档碎片的内容一次性添加到document中
   * @type {DocumentFragment}
   */
  const fragment = document.createDocumentFragment()
  _d.forEach(item => {
    const color = item[options.colorKey] ? options[options.colorKey] : options.usualColor
    //创建span标签
    const span = document.createElement('span')
    span.style.color = color;
    //判断是否包含有新增、删除的属性 都没有就是共同部分
    if (
      (!item.hasOwnProperty('added') && !item.hasOwnProperty('removed'))
      ||
      item[options.colorKey]
    ) {
      span.appendChild(document.createTextNode(item.value || '--'));
    }
    fragment.appendChild(span)
  })
  useEffect(() => {
    const t = setTimeout(() => {
      ref.current.appendChild(fragment)
    }, 100)
    return () => {
      clearTimeout(t)
    }
  }, [])
  return <div ref={ref}></div>
};

export default TextDiff
