---

title: 前端状态与后端数据
toc: content

---

## 探讨前端状态与后端数据的耦合与解耦

### 需求背景及示例

在前后端数据交互的过程中，前端状态是否与后端数据耦合是一个重要决策，它直接影响到开发效率、数据传输效率和代码的可维护性。以下是一个常见的场景，旨在探讨不同耦合方式的优缺点。

假设我们从后端获取了一个产品列表，前端需要为每个产品添加选中（selected）和激活（activated）这两种状态。

后端的数据模型如下：

```json
products: [
    {
        id: 1,
        name: 'pro1',
    },
]
```

在前端，有三种设计方案：

#### 1. 强耦合方案

```json
products: [
    {
        id: 1,
        name: 'pro1',
        selected: false,
        activated: false,
    }
]
```

在强耦合方案中，状态属性直接被添加到后端数据模型中。

**优点：**

1. 操作非常简便，状态更新一目了然。

**缺点：**

1. 前端状态属性可能意外传递到后端，造成不必要的麻烦。
2. 状态与数据难以区分，对于新手来说，理解难度增加。

#### 2. 弱耦合方案

```json
products: [
    {
        id: 1,
        name: 'pro1',
        frontState: {
            selected: false,
            activated: false,
        }
    }
]
```

在弱耦合的方案中，状态信息被放到了一个专有属性`frontState`中。

**优点：**

1. 业务数据与状态数据分离，状态信息集中到一个子对象中。

**缺点：**

1. 操作稍显复杂，每次访问状态需要多一步。

#### 3. 完全解耦方案

```json
products: [
    {
        id: 1,
        name: 'pro1',
    }
],
selectedIds: [],
activatedIds: []
```

在完全解耦的方案中，状态信息被完全独立出来，单独管理。

**优点：**

1. 数据与状态彻底分离，结构清晰，不易混淆。
2. 符合单一职责原则，有助于代码的维护。

**缺点：**

1. 操作复杂度增加，尤其在复杂场景中，可能需要额外的映射结构：

```json
products: [
    {
        id: 1,
        name: 'pro1',
    },
    //...
],
productsStateMap: {
    'id1': {
        status: 'pending',
        selected: true,
        activated: false,
    },
    //...
}
```

### 个人建议

从状态设计的角度来看，优先选择完全解耦。状态管理本身就复杂，清晰可追踪的状态才是关键。如果项目时间紧迫，耦合也不是不可行的选择。比如，管理一份数据时，用 txt 文档记录可能会更快，但不如使用 Excel 在长时间内更便捷和强大。此外，有些状态并不适合耦合或提取到全局，应该由组件自身维护。例如，对于选中、激活这类状态，让表单组件自身维护更为合适。再如，loading 类状态虽然与数据密切相关，但它不是数据本身，应作为描述数据的元数据处理，耦合进去会复杂化。

为了解耦带来的不便，可以借助范式化存储来缓解，例如 redux-toolkit 的 EntityAdapter。如果使用 React，并且大部分状态涉及异步数据管理，可以尝试使用 react-query、rtk-query 等库来简化异步数据管理流程，同时将状态维护在组件中。

最后，当需求紧迫或希望简化时，临时的耦合方案是可以接受的。但为了以后能够迅速理解自己的代码，还是优先考虑解耦。