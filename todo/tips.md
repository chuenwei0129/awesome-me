# 你不知道的 JS

## React Props 默认值

```jsx
const Foo = ({items = []}) => {
  return <Bar dataSource={items} />;
};

const Foo = ({items}) => {
  return <Bar dataSource={items} />;
};

Foo.defaultProps = {
  items: [],
};
```

前者与后者相比，当 items 为 undefined 时，**ES 默认值每一次都是一个“引用不相同的空数组”**，因此会导致 Bar 收到变化的 dataSource 属性发生不必要的更新，而 defaultProps 没有这问题。

因此使用 ES 默认值时，如果是非基础属性，建议放一个常量在外面：

```jsx
const EMPTY_ITEMS = [];

const Foo = ({items = EMPTY_ITEMS}) => {
  return <Bar dataSource={items} />;
};
```

> [React 默认 props 为什么不能用 es6 默认值？](https://www.zhihu.com/question/403260687/answer/1306841252)

## Date API 处理日期溢出时，会自动往后推延响应时间

**规则如下：**

- `new Date(2019, 0, 50)`，其中 0 代表 1 月，1 月只有 31 天，则多出来的 19 天会被加到 2 月，结果是 2019 年 2 月 19 日。
- `new Date(2019, 20, 10)`，1 年只有 12 个月，多出来的 9 个月会被加到 2020 年，结果是 2020 年 9 月 10 日
- `new Date(2019, -2, 10)`，2019 年 1 月 10 日往前推 2 个月，结果为 2018 年 11 月 10 日
- `new Date(2019, 2, -2)`，2019 年 3 月 1 日往前推 2 天，结果为 2019 年 2 月 26 日
- 以上可以混用

**验证下：**

```js
/** 已知年月，求该月共多少天？ **/

// month 值需对应实际月份减 1，如实际 2 月，month 为 1，实际 3 月，month 为 2
function getMonthCountDay(year, month) {
  // 下月的第 0 天，就是上个月的最后一天
  return new Date(year, month + 1, 0).getDate()
}

// 2 月份总天数
console.log(getMonthCountDay(2020, 1)) // 29
console.log(getMonthCountDay(2021, 1)) // 28
// 4 月份总天数
console.log(getMonthCountDay(2020, 3)) // 30
console.log(getMonthCountDay(2021, 3)) // 30
// 1 月份总天数
console.log(getMonthCountDay(2020, 0)) // 31
console.log(getMonthCountDay(2021, 0)) // 31
```

## Structured Clone

## 数组

## pointer-events: none

pointer-events: none;表示鼠标事件“穿透”该元素并且指定该元素“下面”的任何东西。

例：红色块上面有一个蓝色块(z-index)，如果蓝色块设置了 pointer-events: none; 。点击蓝色块将无效，红色块能捕获到鼠标事件，虽然蓝色块“罩住”了红色块。



setTimeout

https://blog.csdn.net/kaimo313/article/details/115631674


2. 如果 setTimeout 存在嵌套调用，那么系统会设置最短时间间隔为 4 毫秒

因为在 Chrome 中，定时器被嵌套调用 5 次以上，系统会判断该函数方法被阻塞了，如果定时器的调用时间间隔小于 4 毫秒，那么浏览器会将每次调用的时间间隔设置为 4 毫秒。



未激活的页面，setTimeout 执行最小间隔是 1000 毫秒
如果标签不是当前的激活标签，那么定时器最小的时间间隔是 1000 毫秒，目的是为了优化后台页面的加载损耗以及降低耗电量。

延时执行时间有最大值
Chrome、Safari、Firefox 都是以 32 个 bit 来存储延时值的，32bit 最大只能存放的数字是 2147483647 毫秒，这就意味着，如果 setTimeout 设置的延迟值大于 2147483647 毫秒（大约 24.8 天）时就会溢出，那么相当于延时值被设置为 0 了，这导致定时器会被立即执行。

为什么 setTimeout 有最小时延 4ms ?

方法论
世界观

组件

[React，如何理解“有状态无渲染，有渲染无状态”？](https://www.zhihu.com/question/366071125/answer/982270295)

深拷贝不定义范围边界，就是耍流氓哈哈
[前端JS中Object.values()可以用于拷贝数组吗？](https://www.zhihu.com/question/458217580)

生成类似[1-100]这样的的数组：
测试大量数据的数组时可以这样生成：
// fill
const arr = new Array(100).fill(0).map((item, index) => index + 1)

// Array.from() 评论区大佬指出
const arr = Array.from(Array(100), (v, k) => k + 1)

// ... + array.keys() 评论区大佬指出 生成的是0-99的数组
const ary = [...Array(100).keys()] 
复制代码new Array(100) 会生成一个有100空位的数组，这个数组是不能被map()，forEach(), filter(), reduce(), every() ，some()遍历的，因为空位会被跳过（for of不会跳过空位，可以遍历）。 [...new Array(4)] 可以给空位设置默认值undefined，从而使数组可以被以上方法遍历。

[js如何把一个含有多个元素的数组按要求变成新的数组？](https://www.zhihu.com/question/532350167/answer/2481113702)

另外评论区大佬指出，array.indexOf()找 NaN 会找不到，返回-1，array.includes()能找到，返回true~

[NaN].includes(NaN) // true
[NaN].indexOf(NaN) // -1
https://juejin.cn/post/6844904063729926152
