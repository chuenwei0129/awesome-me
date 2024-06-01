---
title: Others
order: 14
group:
  title: 杂项
---

# 杂项

## [在 JavaScript 中用 try/catch 是不是很 low？](https://www.zhihu.com/question/264259255)

> `try/catch` 更多的是用在处理 “不可信任的外部来源” 的时候。

比如 http 请求，通常有两类错误比较常见，一类是接口 (后端) 报错，另一类则是数据结构处理时发生错误。

第一类接口报错，大多数是你控制不了的，像 400/405 这些除外，一般能自己调整，其它的顺手包个 `try/catch` 或者 `promise.catch`。

而第二类则是最常见的，Bug 的源头通常就在这：**因为数据源头 (接口) 只返回了数据，而它的数据类型没有一起返回。**

举个例子：

> 一开始后端对于值为 “空” 的字段直接是不返回这个字段的，此时默认值赋值可以生效 (因为没有字段，属性取值是 `undefined`)，但是后端来了个新同事，改了一些配置，值为 “空” 的字段也返回了，只不过值是 `null`，此时默认值赋值语法没通过，后续的逻辑处理直接裂开。

另外一个经典的例子 `JSON.parse`，字符串的输入往往是外部输入，因此我们在封装的时候往往需要保护一下。

```ts
function safeParseJSON<T>(input: unknown, defaultValue: T) {
  try {
    return JSON.parse(input) as T
  } catch (error) {
    return defaultValue
  }
}
```

## JSON

JSON 是语言无关的纯数据规范，因此一些特定于 JavaScript 的对象属性会被 JSON.stringify 跳过。

即：

- 函数属性 (方法)。
- Symbol 类型的键和值。
- 存储 `undefined` 的属性。

```js
let user = {
  sayHi() {
    // 被忽略
    alert('Hello')
  },
  [Symbol('id')]: 123, // 被忽略
  something: undefined, // 被忽略
}

alert(JSON.stringify(user)) // {}（空对象
```

重要的限制：不得有循环引用。

```js
let room = {
  number: 23,
}

let meetup = {
  title: 'Conference',
  participants: ['john', 'ann'],
}

meetup.place = room // meetup 引用了 room
room.occupiedBy = meetup // room 引用了 meetup

JSON.stringify(meetup) // Error: Converting circular structure to JSON
```

JSON.stringify 的完整语法是：`let json = JSON.stringify(value[, replacer, space])`

```js
// 去除导致循环引用的 room.occupiedBy
let room = {
  number: 23,
}

let meetup = {
  title: 'Conference',
  participants: [{ name: 'John' }, { name: 'Alice' }],
  place: room, // meetup 引用了 room
}

room.occupiedBy = meetup // room 引用了 meetup

alert(
  JSON.stringify(meetup, function replacer(key, value) {
    return key == 'occupiedBy' ? undefined : value
  }),
)

/* key:value pairs that come to replacer:
:             [object Object]
title:        Conference
participants: [object Object],[object Object]
0:            [object Object]
name:         John
1:            [object Object]
name:         Alice
place:        [object Object]
number:       23
occupiedBy: [object Object]
*/
```
