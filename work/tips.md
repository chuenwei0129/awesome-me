# 奇技淫巧

## 已知年月，求该月共多少天？

**原理：Date API 处理日期溢出时，会自动往后推延响应时间。**

- `new Date(2019, 0, 50)` 其中 0 代表 1 月，1 月只有 31 天，则多出来的 19 天会被加到 2 月，结果是 2019 年 2 月 19 日。
- `new Date(2019, 20, 10)`，1 年只有 12 个月，多出来的 9 个月会被加到 2020 年，结果是 2020 年 9 月 10 日
- `new Date(2019, -2, 10)`，2019 年 1 月 10 日往前推 2 个月，结果为 2018 年 11 月 10 日
- `new Date(2019, 2, -2)`，2019 年 3 月 1 日往前推 2 天，结果为 2019 年 2 月 26 日
- 以上可以混用

**验证下：**

```js
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

## Structured Clone 结构化克隆算法

https://justjavac.com/javascript/2018/02/02/deep-copy.html

## 数组

## pointer-events: none

pointer-events: none;表示鼠标事件“穿透”该元素并且指定该元素“下面”的任何东西。

例：红色块上面有一个蓝色块(z-index)，如果蓝色块设置了 pointer-events: none; 。点击蓝色块将无效，红色块能捕获到鼠标事件，虽然蓝色块“罩住”了红色块。

## [对象解构应用在数组上](https://github.com/justjavac/the-front-end-knowledge-you-may-not-know/issues/20)

```js
// 解构获取数据最后一个元素
const { length: len, [len - 1]: last, ...rest } = [1, 2, 3]
console.log(len, last, rest) // 3 3 {0: 1, 1: 2}
```



