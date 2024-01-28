# Node 接口

所有 DOM 节点对象都继承了 Node 接口，拥有一些共同的属性和方法

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/web/document.png)

⚠️：`Node.childNodes`，`document.querySelectorAll()` 等节点搜索方法会返回 NodeList 实例。

> 只有 `Node.childNodes` 返回的是一个动态集合，其他的 NodeList 都是静态集合，HTMLCollection 实例都是动态集合，添加/移除节点，**节点的变化会实时反映在集合中**。

⚠️：`nextSibling` 属性可以用来遍历所有子节点。

```js
const el = document.getElementById('div1').firstChild

while (el !== null) {
  console.log(el.nodeName)
  el = el.nextSibling
}
```

⚠️：在 DOM 的世界中，`null` 值就意味着 **不存在** 或者 **没有这个节点**。

> 文档节点（ document ）和文档片段节点（ documentFragment ）的父节点都是 `null`。另外，**对于那些生成后还没插入 DOM 树的节点，父节点也是 `null`**。

```js
// 属性
Node.nodeName   // 返回节点名称
Node.nodeType   // 返回节点类型的常数值
Node.nodeValue  // 返回 Text 或 Comment 节点的文本值
Node.textContent  // 返回当前节点和它的所有后代节点的文本内容，可读写
Node.baseURI    // 返回当前网页的绝对路径
Node.nextSibling  // 返回紧跟在当前节点后面的第一个兄弟节点
Node.previousSibling  // 返回当前节点前面的、距离最近的一个兄弟节点
Node.parentNode   // 返回当前节点的父节点
Node.parentElement  // 返回当前节点的父 Element 节点
Node.childNodes   // 返回当前节点的所有子节点
Node.firstChild  // 返回当前节点的第一个子节点
Node.lastChild   // 返回当前节点的最后一个子节点
Node.isconnecoted   // 返回一个布尔值，表示当前节点是否在文档之中

// 方法
Node.appendChild(node)   // 向节点添加最后一个子节点
Node.hasChildNodes()   // 返回布尔值，表示当前节点是否有子节点
Node.cloneNode(true) // 默认为 false, true (深拷贝节点及其属性，以及后代)
Node.insertBefore(newNode, oldNode)  // 在指定子节点之前插入新的子节点
Node.removeChild(node)   // 删除节点，在要删除节点的父节点上操作
Node.replaceChild(newChild,oldChild)  // 替换节点
Node.contains(node)  // 返回一个布尔值，表示参数节点是否为当前节点的后代节点。
Node.compareDocumentPosition(node)   //返回一个 7 个比特位的二进制值，表示参数节点和当前节点的关系
Node.isEqualNode(node)  // 返回布尔值，用于检查两个节点是否相等。所谓相等的节点，指的是两个节点的类型相同、属性相同、子节点相同。
Node.isSameNode(node)  // 返回一个布尔值，表示两个节点是否为同一个节点。
Node.normalize()   // 用于清理当前节点内部的所有 Text 节点。它会去除空的文本节点，并且将毗邻的文本节点合并成一个。
Node.getRootNode()  // 返回当前节点所在文档的根节点 document，与 ownerDocument 属性的作用相同。

// NodeList 接口
Node.length   // 返回 NodeList 实例包含的节点数量
Node.forEach(fn，this)   // 用于遍历 NodeList 的所有成员
Node.item(index) // 接受一个整数值作为参数，表示成员的位置，返回该位置上的成员
Node.keys()  // 返回键名的遍历器
Node.values()   // 返回键值的遍历器
Node.entries()  // 返回的遍历器同时包含键名和键值的信息

// parentNode 接口
Node.children  // 返回指定节点的所有 Element 子节点
Node.firstElementChild  // 返回当前节点的第一个 Element 子节点
Node.lastElementChild   // 返回当前节点的最后一个 Element 子节点
Node.childElementCount  // 返回当前节点所有 Element 子节点的数目
Node.append()  // 为当前节点追加一个或多个子节点，位置是最后一个元素子节点的后面。
Node.prepend()   // 为当前节点追加一个或多个子节点，位置是第一个元素子节点的前面。

// ChildNode 接口
Node.remove()  // 用于从父节点移除当前节点
Node.before()  // 用于在当前节点的前面，插入一个或多个同级节点。两者拥有相同的父节点。
Node.after()   // 用于在当前节点的后面，插入一个或多个同级节点，两者拥有相同的父节点。
Node.replaceWith()  // 使用参数节点，替换当前节点
```
