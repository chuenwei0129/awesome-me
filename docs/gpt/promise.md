---
group:
  title: 待定
  order: 0
---

# Promise

## 1。输出是什么？

```javascript

```

<details><summary><b>答案</b></summary>
<p>

## 答案

在函数内部，我们首先通过 `var` 关键字声明了 `name` 变量。这意味着变量被提升了 (内存空间在创建阶段就被设置好了)，直到程序运行到定义变量位置之前默认值都是 `undefined`。因为当我们打印 `name` 变量时还没有执行到定义变量的位置，因此变量的值保持为 `undefined`。

通过 `let` 和 `const` 关键字声明的变量也会提升，但是和 `var` 不同，它们不会被<i>初始化</i>。在我们声明 (初始化) 之前是不能访问它们的。这个行为被称之为暂时性死区。当我们试图在声明之前访问它们时，JavaScript 将会抛出一个 `ReferenceError` 错误。

</p>
</details>

---

###### 2。输出是什么？

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1)
}

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1)
}
```

- A：`0 1 2` 和 `0 1 2`
- B：`0 1 2` 和 `3 3 3`
- C：`3 3 3` 和 `0 1 2`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

由于 JavaScript 的事件循环，`setTimeout` 回调会在*遍历结束后*才执行。因为在第一个遍历中遍历 `i` 是通过 `var` 关键字声明的，所以这个值是全局作用域下的。在遍历过程中，我们通过一元操作符 `++` 来每次递增 `i` 的值。当 `setTimeout` 回调执行的时候，`i` 的值等于 3。

在第二个遍历中，遍历 `i` 是通过 `let` 关键字声明的：通过 `let` 和 `const` 关键字声明的变量是拥有块级作用域 (指的是任何在 {} 中的内容)。在每次的遍历过程中，`i` 都有一个新值，并且每个值都在循环内的作用域中。

</p>
</details>

---
