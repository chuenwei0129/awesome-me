---
group:
  title: browser
  order: 7
title: Range API
toc: content
---

## 一道"简单题"：反转子节点？

一道面试题：

> 给定一个元素 A，它的子节点是：`1 2 3 4 5`
> 现在，请你把它反转成：`5 4 3 2 1`。

乍一看，这不过是"数组反转"的 DOM 版本：把子节点拿出来，倒过来插回去就完了。很多人也是这么做的，甚至在面试里想都不用想就写完，然后心满意足地放下键盘。

但有趣的是，同样是"反转子节点"，不同开发者写出的代码，暴露出的却是完全不同的思维层级。有的人只会把 DOM 当成"可以塞数据的盒子"；有的人已经学会借力 DOM 本身的特性；而再往上，还有少数人，会把这个问题当成一个操控"文档区间"的机会，顺手用上强大的 Range API 和 DocumentFragment，优雅地解决问题的同时，彻底重构自己看待 DOM 的方式。

## 从数组到 innerHTML：入门写法为什么只算"能用"？

先看最常见的入门实现。很多新人会非常自然地写出类似这样的代码：

```javascript
function reverseChildren(element) {
  // 1. 把子节点转成数组
  const children = Array.from(element.childNodes);

  // 2. 清空原来内容
  element.innerHTML = '';

  // 3. 反转数组后重新插入 DOM
  children.reverse().forEach((child) => {
    element.appendChild(child);
  });
}
```

:::info{title=功能正确但代价高昂}
这段代码毫无疑问是"正确"的：如果元素 A 里原本是 `1 2 3 4 5`，执行之后就会变成 `5 4 3 2 1`。从算法的视角看，它的时间复杂度是 O(n)，逻辑一清二楚——拿出来、倒过来、再插回去。
:::

但当你站在 DOM 的视角看，就会发现它的问题远不止"看起来有点啰嗦"这么简单。

首先，`element.innerHTML = ''` 这一行相当于把原来的所有子节点全部销毁，强制重建 DOM 结构；紧接着，再通过 `appendChild` 把原来的节点一个个重新挂上去。整个过程至少包含三类成本：解析与序列化的成本、布局与渲染的成本、以及一连串多余的 DOM 操作。

其次，这个写法暴露出一个更深层的问题：它把 DOM 当成"数据容器"，而不是一棵有自己行为规则的文档树。开发者脑中仍然是"数组式"的思维：先把东西全部转成数组，再用熟悉的数组方法处理，最后粗暴地砸回去。代码是能运行的，但几乎没有利用到 DOM 自身的任何特性。

所以，这种实现可以评为"功能及格"，却很难说体现了什么工程能力。它告诉你的只是：这个人会操作 DOM，但并不理解 DOM。

要走出这层，第一步是学会尊重 DOM 自己的规则。

## 利用 Live Collection：从"操作数据"到"理解结构"

要理解更优雅的写法，需要先掌握一个很多人忽略的事实：DOM 中的子节点集合并不是"静态快照"，而是一种会随着 DOM 变化而实时更新的"实时集合（Live Collection）"。

以 `childNodes` 为例，它返回的是一个实时更新的集合：当你对 DOM 做插入、删除、移动操作时，这个集合会在同一时刻反映最新的结构。而当你用 `Array.from()` 或扩展运算符把它转换成数组时，得到的才是某个瞬间的静态拷贝。

```javascript
function demonstrateLivingCollection() {
  const parent = document.createElement('div');
  parent.innerHTML = '<span>1</span><span>2</span><span>3</span>';

  const children = parent.children; // HTMLCollection，实时集合
  const childrenArray = [...parent.children]; // Array，静态拷贝

  console.log(children.length); // 3
  console.log(childrenArray.length); // 3

  parent.appendChild(document.createElement('span'));

  console.log(children.length); // 4，自动更新
  console.log(childrenArray.length); // 仍然是 3
}
```

这意味着，如果你愿意信任这个"实时集合"，就可以写出完全不一样的"反转子节点"实现：

```javascript
function reverseChildren(element) {
  const children = element.childNodes;
  let l = children.length; // 获取初始长度

  // 利用 Live Collection 特性，从后往前遍历并追加
  // 每次 appendChild 都会实时更新 children，但因为我们是从末尾开始，索引 l 始终指向需要移动的下一个节点
  while (l--) {
    element.appendChild(children[l]);
  }
}
```

表面上看，这段代码只是省掉了把节点拷贝到数组、再清空 innerHTML 的步骤。实质上，它深度利用了两个关键事实。

第一，`childNodes` 是实时更新的。每次你调用 `appendChild(children[l])` 时，那个被插入的节点已经在 DOM 树里了。浏览器会先把它从原来的位置移除，然后再插入到新的位置。整个过程中，`children` 始终保持着最新状态，而我们用 `l--` 从末尾往前遍历，就可以在"集合边界不断变化"的情况下，从容完成整体反转。

第二，对一个已经在 DOM 树上的节点再次调用 `appendChild`，浏览器会自动执行"先移除，再插入"的逻辑，不需要你显式调用 `removeChild`。换句话说，移动节点也是插入节点的一种，只是起点和终点都在同一棵树上。

【:::info{title=思维层次的跃升}:::】
相比起入门写法，这个解法有几个显而易见的优势：不需要额外数组，不需要暴力清空，再插入的次数也是最小化的 n 次。更重要的是，它背后是一种对 DOM 行为规则的理解，而不是"把 DOM 当数组玩"的惯性思维。

如果说第一种写法只是证明你"会写 JavaScript 操作 DOM"，那么这种写法至少说明：你已经开始理解 DOM 自己的世界观。
:::

然而，故事并没有到此为止。你越是深入前端，就越会意识到：仅仅把节点当作"一个个元素"来移动，远远不够。你真正需要掌握的，是对"文档区间"的精细控制。

## 当 DOM 变成一段"可选中文本"：走进 Range 的世界

要理解 Range API，最简单的比喻是：把它想象成你平时用鼠标在页面上框选的一段内容——从某个起点，到某个终点，中间的一切文本、节点、结构，都被视为一个整体的"选区（Range）"。

Range 正是浏览器在内部表示"文档中一段连续区域"的抽象。它不是某个具体的 DOM 节点，而是一对"边界点"：一个起点（start），一个终点（end）。只要你能精确地描述这两个点，就能指向任何你想要操作的那段内容。

创建一个 Range 并不复杂。常见的方式有两种：

```javascript
const range1 = document.createRange();
const range2 = new Range(); // 较新的浏览器也支持这种写法
```

真正重要的，是如何给它设定边界。Range 的两个核心方法是：

```javascript
range.setStart(startNode, startOffset);
range.setEnd(endNode, endOffset);
```

这里的 `startNode` 和 `endNode` 决定了起点和终点"落在谁身上"，而 `startOffset` 与 `endOffset` 则定义了它们"落在什么位置"。

Offset 的含义取决于节点的类型：如果是元素节点，它表示"第几个子节点"；如果是文本节点，它表示"第几个字符"。

可以用一个小例子来感受这种差异。假设 DOM 是这样的：

```html
<div id="example">
  Hello
  <span>World</span>
  !
</div>
```

在脚本中，我们可以写：

```javascript
const div = document.getElementById('example');
const range = document.createRange();

// 选择 "Hello" 的前三个字符
range.setStart(div.childNodes[0], 0); // 第一个子节点是文本 "Hello"
range.setEnd(div.childNodes[0], 3); // offset=3，对应 "Hel"
```

此时，Range 覆盖的是 `"Hel"` 这一段文本。而如果我们改用方便的方法：

```javascript
range.selectNode(div.childNodes[1]); // 第二个子节点是 <span>World</span>
```

那么整个 `<span>World</span>` 元素及其内部内容，就会统统落入 Range 的范围中。

在日常使用中，为了避免自己手动计算 offset，Range 还提供了一组更语义化的边界设置方法，比如 `setStartBefore`、`setStartAfter`、`setEndBefore`、`setEndAfter`，以及两个极为实用的快捷方式：

```javascript
range.selectNode(referenceNode); // 选中整个节点
range.selectNodeContents(parentNode); // 选中某节点内部的所有内容
```

后者在我们要操作"一个节点内部所有子内容"时，几乎是完美契合的工具。

此外，浏览器中的"用户选区"也可以反向拿来转成 Range，例如：

```javascript
const selection = window.getSelection();
const selectedRange = selection.getRangeAt(0);
```

这样一来，你可以对用户框选的那段内容执行各种结构化操作，而不仅仅是读取它的文本。

【:::info{title=从节点操作到区间操作}:::】
当你把 Range 当成一种"指向文档区域的手柄"来对待时，接下来的一系列 API 就变得非常自然：提取、克隆、插入、删除、包裹——本质上都是对"这段区域"的一次操作。
:::

## 操作"区间"，而非"节点"：Range 的五种核心能力

只要你已经有了一个设置好的 Range，就等于握住了一段文档区域的"句柄"。针对这段区域，Range 提供了几种极具威力的操作方式。

第一种，是"整体摘取"：`extractContents()`。它会把 Range 覆盖的内容一次性从 DOM 中剪下来，并返回一个 `DocumentFragment（文档片段）`：

```javascript
const range = document.createRange();
range.selectNodeContents(element);

const fragment = range.extractContents();
// 此时 element 的内容已经被清空，原来那部分内容全部进入 fragment
```

与此相对的，是"只做拷贝不动原件"：`cloneContents()`。它会克隆出一份与 Range 所选区域结构相同的 Fragment，但不会改变现有 DOM：

```javascript
const range = document.createRange();
range.selectNodeContents(element);

const fragment = range.cloneContents();
// element 保持不变，fragment 拿到的是完整拷贝
```

如果说这两者更像是"剪切"和"复制"，那么 `insertNode()` 则是对应的"粘贴"。它可以在 Range 的起始位置插入一个节点：

```javascript
const range = document.createRange();
range.selectNodeContents(element);

const newNode = document.createElement('div');
newNode.textContent = '插入的内容';

range.insertNode(newNode);
```

还有更为直接的"删除"：`deleteContents()`，会把 Range 覆盖的内容直接从 DOM 中抹掉：

```javascript
const range = document.createRange();
range.selectNodeContents(element);

range.deleteContents();
```

最后，`surroundContents()` 则提供了一种极具表达力的操作：用一个新的元素，把 Range 选中的所有内容整体包裹起来，相当于给这段区域外面再套一层：

```javascript
const range = document.createRange();
range.selectNodeContents(element);

const wrapper = document.createElement('div');
wrapper.className = 'highlight';

range.surroundContents(wrapper);
```

从某种意义上说，掌握 Range 之后，你不再只是"一个个搬动节点"的工人，而像是拿到了操作整块文档区域的手术刀。你可以把一段复杂结构整体剪下，在内存中随意重排，再无缝地贴回去。要做到这一点，还需要另一个重要角色登场：`DocumentFragment（文档片段）`。

## DocumentFragment：在内存里搭建一座"隐形工地"

`DocumentFragment` 是一个常被忽视、却极其实用的概念。可以把它想象成 DOM 世界中的"离线工作台"：你可以在上面构建各种复杂结构，增删改查都不会影响真实页面，直到你心满意足地把整个 Fragment 一次性挂回文档树。

创建一个 Fragment 非常直接：

```javascript
const fragment = document.createDocumentFragment();

for (let i = 0; i < 100; i++) {
  const li = document.createElement('li');
  li.textContent = `项目 ${i}`;
  fragment.appendChild(li);
}

document.getElementById('list').appendChild(fragment);
```

在这段代码中，前面那一百次 `appendChild` 操作，全部发生在 Fragment 这个"隐形工地"上，并不会让真实页面产生反复重排、重绘；直到最后一行把 Fragment 插入到真实 DOM 中，整个结构才以一次操作的姿态出现在页面上。

【:::info{title=性能优化的利器}:::】
这正是 `DocumentFragment` 的独特价值所在：在逻辑上，它是一棵完整的小树；在表现上，它却不会直接参与布局，也不会让浏览器为它单独计算样式和位置。对于任何需要批量构建、重排 DOM 的场景，它几乎都是性能友好、结构清晰的首选载体。
:::

当 Range 的"选区能力"和 Fragment 的"离线工地"结合在一起时，我们就得到了那种真正让人拍案叫绝的"高手解法"。

## Range + Fragment：在内存里完成一场无声的"逆转"

现在回到最初的面试题：反转一个元素的所有子节点。

如果把 Range 当成"选刀"，把 `extractContents()` 当成"整体切下"，把 `DocumentFragment` 当成"离线工地"，那么整个操作就可以被重新叙述为这样一个过程：

1. 用 Range 选中元素内部的所有内容。
2. 把这整块内容从 DOM 中剪下，放到 Fragment 里。
3. 在 Fragment 这个内存世界中完成子节点的反转。
4. 最后，一次性把整个 Fragment 再插回原来的元素中。

对应到代码，就是这样：

```javascript
function reverseChildrenWithRange(element) {
  // 1. 创建一个 Range，并让其覆盖元素内的所有内容
  const range = document.createRange();
  range.selectNodeContents(element);

  // 2. 把内容整体从 DOM 中摘下，得到一个 Fragment
  const fragment = range.extractContents();

  // 3. 在 Fragment 内部完成反转（全部发生在内存中）
  const nodes = [...fragment.childNodes];
  nodes.reverse().forEach((node) => fragment.appendChild(node));

  // 4. 一次性把反转后的内容插回 DOM
  element.appendChild(fragment);
}
```

【:::info{title=极致的性能与优雅}:::】
如果从 DOM 变更次数来衡量，这个方案有一个令人印象深刻的特点：

第二步，`extractContents()` 只进行了一次 DOM 结构变更：把原元素中的所有内容剪下。第三步的反转完全发生在 Fragment 内存里，不会触发任何真正的重排和重绘。第四步，再通过一次 `appendChild(fragment)`，把已经排好序的内容整体挂回去。

整个过程，一共只对真实 DOM 做了两次结构修改。与之相比，利用 Live Collection 的那种"从后往前挪动子节点"的写法，需要对每个子节点各进行一次移动，总共是 n 次 DOM 操作。

当元素的子节点很多、页面结构较复杂时，这种从"多次小操作"到"两次整体操作"的转变，就会变成极实在的性能差异。
:::

更重要的是，这种写法背后体现的是一种"先整体选区，后离线重排"的思维范式，而不仅仅是把 API 背熟了。

从"数组式"的入门写法，到利用 Live Collection 的正常解法，再到 Range + Fragment 的高手实现，看起来只是多写了几行代码，实际却是思维方式的一次抽象升级。

## "节点思维""结构思维""区间思维"：反转子节点背后的三层认知阶梯

如果把这三种解法抽象出来，你会发现它们分别代表着对 DOM 的三种不同认识层次。

**最底层的是"节点思维"**。在这一层的开发者眼中，DOM 不过是一堆可以取出、修改、塞回去的节点。所有操作都围绕着"取数据—处理—回写"这套逻辑展开。反转子节点时，他们会本能地先把节点收集成数组，调用数组的 `reverse()`，再把节点一口气塞回去。代码能跑，功能也对，但对 DOM 本身的特性几乎没有利用。

**再往上一层，是"结构思维"**。这个阶段的开发者开始意识到：DOM 集合是实时更新的；移动一个已经在 DOM 上的节点，可以直接通过 `appendChild` 完成，不需要显式移除；`childNodes` 或 `children` 并不是快照，而是始终反映当前状态的视图。因此，他们会写出利用 Live Collection 的简洁实现，用更少、也更自然的 DOM 操作完成同样的效果。在这一层，开发者不再把 DOM 当成黑盒，而是开始顺着它的规则做事。

**最高的一层，可以称为"区间思维"**。在这一层，开发者不再局限于对单个节点的增删改，而是习惯于先确定"我要操作的是哪一段文档区域"，然后通过 Range 把这段区域抽出，再配合 DocumentFragment 在内存中完成重构，最后整体回挂。这种思维方式的核心，不在于背会多少个 Range API，而在于一种更抽象的视角：面对复杂 DOM 结构时，优先思考"如何优雅地选中这段区域"，以及"如何在离线环境中重排它"。

【:::info{title=思维层次决定代码质量}:::】
当你开始用这样的方式审视自己的代码时，那道简单的"反转子节点"面试题，就不再只是一个考察语法的陷阱，而会变成一个暴露思维上限的小窗口：你到底停留在哪一层？你是被 DOM 驯服的人，还是能够驾驭文档结构的人？
:::

## 从一行 DOM 操作开始，建立你的"文档思维"

回到最初的问题：反转一个元素的所有子节点，哪种解法最好？

如果只看功能，三种写法当然都能完成任务。如果只看代码行数，利用 Live Collection 的实现也许最简洁。如果再把性能与抽象能力考虑进去，Range + DocumentFragment 的方案则显得格外优雅。

但真正重要的，从来不是"记住哪个 API 更高级"，而是你是否愿意在这样看似简单的题目上，多问自己一句：这背后还有没有更深一层的结构规律？有没有更抽象的方式来思考 DOM？有没有可能先选中一段区域，再在内存中重建，而不是一遍遍地敲打真实页面？

当你把 DOM 当成一棵可以被"选区"与"片段"灵活操控的文档树，而不是一堆随取随用的节点集合，你对前端的理解也会悄悄改变：页面不再只是标签的堆砌，而是一块可以被精细切割、重组、编排的结构化空间。

也许下一次，当有人再问你那道面试题——"如何反转一个元素的所有子节点？"——你给出的，不只是一段正确的代码，而是一整套关于 DOM、Range、DocumentFragment 以及"如何优雅地操控文档"的思维方式。

【:::info{title=构建文档思维}:::】
而真正决定你上限的，从来不是你写的那几行 JavaScript，而是你在面对问题时，选择停留在"节点思维"的舒适区，还是勇敢地迈向"区间思维"的广阔天地。下一次，当你需要对 DOM 进行任何复杂的结构操作时，不妨先问自己一句：**"我能否用一个 Range 来选中它，用一个 Fragment 来重构它？"** 这，或许就是你构建"文档思维"的第一步。
:::
