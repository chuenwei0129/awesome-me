# Attributes

元素对象有一个 `attributes` 属性，返回一个类似数组的动态对象

```js
// HTML 代码如下
// <body bgcolor="yellow" onload="">
document.body.attributes[0]
document.body.attributes.bgcolor
document.body.attributes['ONLOAD']
```

元素节点提供六个方法，用来操作属性。

- `getAttribute(key)` 方法返回当前元素节点的指定属性。如果指定属性不存在，则返回 `null`

- `getAttributeNames()` 返回一个数组，成员是当前元素的所有属性的名字。使用 `Element.attributes` 属性，也可以拿到同样的结果，唯一的区别是它返回的是类似数组的对象。
- `setAttribute(key, val)` 方法用于为当前元素节点新增属性。如果同名属性已存在，则相当于编辑已存在的属性。该方法没有返回值
- `hasAttribute(key)` 方法返回一个布尔值，表示当前元素节点是否包含指定属性
- `hasAttributes()` 方法返回一个布尔值，表示当前元素是否有属性，如果没有任何属性，就返回 `false`，否则返回 `true`
- `removeAttribute(key)` 方法移除指定属性。该方法没有返回值
