# 新特性

## 数值分隔符

ES2021，允许 JavaScript 的数值使用下划线（_）作为分隔符。

这个数值分隔符没有指定间隔的位数，也就是说，可以每三位添加一个分隔符，也可以每一位、每两位、每四位添加一个。

数值分隔符有几个使用注意点。

- 不能放在数值的最前面（leading）或最后面（trailing）。
- 不能两个或两个以上的分隔符连在一起。
- 小数点的前后不能有分隔符。
- 科学计数法里面，表示指数的 `e` 或 `E` 前后不能有分隔符。

```js
console.log(123_00 === 12_300) // true
console.log(123_00_0000 === 1_23_00_0_000) // true
console.log(0.0000_1 === 0.00001) // true
console.log(1.2e1_0 === 12_000_000_000) // true
```

下面三个将字符串转成数值的函数，不支持数值分隔符。**主要原因是语言的设计者认为，数值分隔符主要是为了编码时书写数值的方便，而不是为了处理外部输入的数据。**

- Number()
- parseInt()
- parseFloat()

```js
console.log(parseInt('123_00')) // 123
console.log(Number('123_00')) // NaN
```

## [JS 即将发布数组的4个新特性，学会了拿去吹牛](https://zhuanlan.zhihu.com/p/451641148)

## [JS 的新一代日期时间 API Temporal](https://zhuanlan.zhihu.com/p/468691439)