---
title: 千位分隔符
order: 3
group:
  title: 工具函数
  order: 3
---

### addThousandsSeparator

> 给数字或数字字符串添加千位分隔符。

### 参数

| 参数名 |       类型       | 是否必填 | 默认值 |          说明          |
| :----: | :--------------: | :------: | :----: | :--------------------: |
| input  | number \| string |    是    |   —    | 输入的数字或数字字符串 |

### 返回值

> 格式化后的日期时间字符串

类型：string

### 示例

```ts
import { addThousandsSeparator } from 'awesome-me'

console.log(addThousandsSeparator(123456789))
// => '123,456,789'
console.log(addThousandsSeparator('123456789'))
// => '123,456,789'
console.log(addThousandsSeparator('123456789.1234'))
// => '123,456,789.1234'
```
