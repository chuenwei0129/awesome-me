---
title: Flex
toc: content
group:
  title: 基础
---

## 基本概念

flex 布局有 12 个属性，分为父容器和子容器各 6 个。你可以随时通过下图进行回顾。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-23.webp)

flex 的核心的概念就是**容器**和**轴**。容器包括外层的**父容器**和内层的**子项**，轴包括**主轴**和**交叉轴**。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_1.webp)

flex 容器具有这样的特点：父容器可以统一设置子项的排列方式，子项也可以单独设置自身的排列方式，**如果两者同时设置，以子项的设置为准**。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_2.webp)

## 父容器

### justify-content

`justify-content` 属性用于**定义如何沿着主轴方向排列子容器**。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_3.webp)

**值：**

- `flex-start`：起始端对齐。
- `flex-end`：末尾段对齐。
- `center`：居中对齐。
- `space-around`：子容器沿主轴均匀分布，位于首尾两端的子容器到父容器的距离是子容器间距的一半。
- `space-between`：子容器沿主轴均匀分布，位于首尾两端的子容器与父容器相切。

**可视化：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_4.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_5.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_6.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_7.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_8.webp)

#### align-items

`align-items` 属性用于**定义如何沿着交叉轴方向分配子容器的间距**。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_9.webp)

**值：**

- `flex-start`：起始端对齐。
- `flex-end`：末尾段对齐。
- `center`：居中对齐。
- `baseline`：基线对齐，这里的 baseline 默认是指首行文字，即 `first baseline`，所有子容器向基线对齐，交叉轴起点到元素基线距离最大的子容器将会与交叉轴起始端相切以确定基线。
- `stretch`：子容器沿交叉轴方向的尺寸拉伸至与父容器一致。

**可视化：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_10.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8zOTI1MDYyLTFiOWQwZjRlMzJhNmM1OTgucG5nP2ltYWdlTW9ncjIvYXV0by1vcmllbnQvc3RyaXAlN0NpbWFnZVZpZXcyLzIvdy81MTAvZm9ybWF0L3dlYnA.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_11.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_12.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_13.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_14.webp)

## 子项

### 单独设置子容器如何沿交叉轴排列：align-self

每个子容器也可以单独定义沿交叉轴排列的方式，此属性的可选值与父容器 `align-items` 属性完全一致，**如果两者同时设置则以子容器的 `align-self` 属性为准**。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_16.webp)

**值：**

- `flex-start`：起始端对齐。
- `flex-end`：末尾段对齐。
- `center`：居中对齐。
- `baseline`：基线对齐。
- `stretch`：拉伸对齐。

**可视化：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_17.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_18.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_19.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_20.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_21.webp)

### 在主轴上如何伸缩：flex

子容器是有弹性的 (flex 即弹性)，它们会自动填充剩余空间，**子容器的伸缩比例由 `flex` 属性确定。**

`flex` 的值可以是无单位数字 (如：1，2，3)，也可以是有单位数字 (如：15px，30px，60px)，还可以是 `none` 关键字。子容器会按照 `flex` 定义的尺寸比例自动伸缩，如果取值为 `none` 则不伸缩。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_15.webp)

**设置基准大小：`flex-basis`**

`flex-basis` 表示在不伸缩的情况下子容器的原始尺寸。**主轴为横向时代表宽度，主轴为纵向时代表高度。**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-16.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-17.webp)

**设置扩展比例：`flex-grow`**

子容器弹性伸展的比例。如图，剩余空间按 `1:2` 的比例分配给子容器。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-18.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-19.webp)

**设置收缩比例：`flex-shrink`**

子容器弹性收缩的比例。如图，超出的部分按 `1:2` 的比例从给子容器中减去。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-20.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-21.webp)

**注意事项：**

- 属性 `flex` 规定了弹性元素如何伸长或缩短以适应 `flex` 容器中的可用空间。这是一个简写属性，可以同时设置 `flex-grow`，`flex-shrink` 与 `flex-basis`。
  - 值 `auto` 相当于将属性设置为 `"flex: 1 1 auto"`
  - 默认值 `initial` 相当于将属性设置为 `"flex: 0 1 auto"`
  - 值 `none` 相当于将属性设置为 `"flex: 0 0 auto"`
- `flex-grow` 初始值为 0，即如果存在剩余空间，也不放大。负值是不被允许的。
- `flex-shrink` 元素**仅在默认宽度之和大于容器的时候才会发生收缩**，其收缩的大小是依据 `flex-shrink` 的值。初始值为 1，即如果空间不足，将缩小。负值是不被允许的。
- `flex-basis` 给上面两个属性分配多余空间之前，计算项目是否有多余空间，默认值为 auto，即项目本身的大小。
- **如果任何 `flex` 元素的侧轴方向 `margin` 值设置为 `auto`，则会忽略 `align-self` (个体设置)。**

### 设置排列顺序：order

改变子容器的排列顺序，覆盖 `HTML` 代码中的顺序，默认值为 `0`，可以为负值，数值越小排列越靠前。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-22.webp)

## 轴

轴包括主轴和交叉轴，`justify-content` 属性决定子容器沿主轴的排列方式，`align-items` 属性决定子容器沿着交叉轴的排列方式。在 `flex` 布局中，`flex-direction` 属性决定主轴的方向，交叉轴的方向由主轴确定。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_22.webp)

主轴的起始端由 `flex-start` 表示，末尾段由 `flex-end` 表示。不同的主轴方向对应的起始端、末尾段的位置也不相同。

**主轴方向：**

- 向右：`flex-direction: row`
- 向下：`flex-direction: column`
- 向左：`flex-direction: row-reverse`
- 向上：`flex-direction: column-reverse`

**可视化：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-1.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-2.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-3.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-4.webp)

**交叉轴：**

主轴沿逆时针方向旋转 `90°` 就得到了交叉轴，交叉轴的起始端和末尾段也由 `flex-start` 和 `flex-end` 表示。

## 换行

### 父容器设置换行方式：flex-wrap

`flex-wrap` 属性决定子容器是否换行排列，不仅可以顺序换行而且支持逆序换行。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-5.webp)

**值：**

- `nowrap`：不换行 (默认值)。
- `wrap`：换行。
- `wrap-reverse`：逆序换行，逆序换行是指沿着交叉轴的反方向换行。

**可视化：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-6.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-7.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-8.webp)

### 多行沿交叉轴对齐：align-content

当子容器多行排列时，设置行与行之间的对齐方式。

**值：**

- `flex-start`：起始端对齐。
- `flex-end`：末尾段对齐。
- `center`：居中对齐。
- `space-around`：等边距均匀分布。
- `space-between`：等间距均匀分布。
- `stretch`：拉伸对齐。

**可视化：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-10.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-11.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-12.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-13.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-14.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-15.webp)

### 轴向与换行组合设置：flex-flow

`flow` 即流向，也就是子容器沿着哪个方向流动，流动到终点是否允许换行，比如 `flex-flow: row wrap`，**`flex-flow` 是一个复合属性**，相当于 `flex-direction` 与 `flex-wrap` 的组合，可选的取值如下：

- `row`、`column` 等，可单独设置主轴方向。
- `wrap`、`nowrap` 等，可单独设置换行方式。
- `row nowrap`、`column wrap` 等，也可两者同时设置。

## 补充：`flex-shrink` 的计算规则

要理解 `flex-shrink` 的计算规则，我们需要先了解一些基本概念：

1. **`flex-shrink`**：定义了当容器空间不足时，项目的收缩比例。默认值是 `1`。
2. **`basis`**：定义了元素的初始主轴尺寸。

假如，我们有一个容器和两个子元素，分别设置了不同的 `flex-shrink` 和 `basis` 属性：

```jsx | pure
<div className="flex w-[400px] h-[50px]">
  <div className="flex-shrink basis-[230px] bg-red-600"></div>
  <div className="flex-shrink-[2] basis-[230px] bg-blue-600"></div>
</div>
```

### 分析

1. **容器宽度**：`400px`
2. **子元素初始宽度**：
   - 第一个子元素：`basis = 230px`
   - 第二个子元素：`basis = 230px`

初始情况下，两者的总宽度为 `230px + 230px = 460px`，这已经超过了容器宽度 `400px`。所以需要根据 `flex-shrink` 进行收缩。

### 计算步骤

1. **计算总的 `flex-shrink` 值**：

   - 第一个子元素的 `flex-shrink` 值是默认的 `1`。
   - 第二个子元素的 `flex-shrink` 值是 `2`。

   总的 `flex-shrink` 值是 `1 + 2 = 3`。

2. **计算每个子元素需要收缩的宽度**：

   - 容器宽度不足部分是 `460px - 400px = 60px`。
   - 第一个子元素的收缩比例是 `1 / 3`，所以它需要收缩的宽度是 `60px * (1 / 3) = 20px`。
   - 第二个子元素的收缩比例是 `2 / 3`，所以它需要收缩的宽度是 `60px * (2 / 3) = 40px`。

3. **计算每个子元素最终的宽度**：
   - 第一个子元素最终宽度：`230px - 20px = 210px`。
   - 第二个子元素最终宽度：`230px - 40px = 190px`。

### 最终结果

- 第一个子元素的宽度是 `210px`。
- 第二个子元素的宽度是 `190px`。

所以，**当容器宽度不足时，`flex-shrink` 的值越大，元素收缩的越多**。通过这种方式，两个子元素的宽度调整为总宽度不超过容器的宽度。

## 补充：`flex-grow` 的计算规则

我们来看一个例子：

```jsx | pure
<div className="flex w-[500px] h-[50px]">
  <div className="flex-grow basis-[100px] bg-red-600"></div>
  <div className="flex-grow-[2] basis-[100px] bg-blue-600"></div>
</div>
```

### 代码解释

- **第一个子元素**：

  - `flex-grow`：默认值为 1 (因为没有指定具体的值)。
  - `basis-[100px]`：设置基础宽度为 100 像素。
  - `bg-red-600`：背景颜色为红色。

- **第二个子元素**：
  - `flex-grow-[2]`：设置增长因子为 2。
  - `basis-[100px]`：设置基础宽度为 100 像素。
  - `bg-blue-600`：背景颜色为蓝色。

### 计算规则

1. **确定基础宽度**：

   - 第一个子元素的基础宽度 (`flex-basis`) 为 100 像素。
   - 第二个子元素的基础宽度 (`flex-basis`) 为 100 像素。

2. **计算总基础宽度**：

   - 总基础宽度 = 100px (第一个子元素) + 100px (第二个子元素) = 200px。

3. **计算可用空间**：

   - 父容器的总宽度为 500px。
   - 可用空间 = 父容器宽度 - 总基础宽度 = 500px - 200px = 300px。

4. **分配可用空间**：

   - 第一个子元素的 `flex-grow` 值为 1。
   - 第二个子元素的 `flex-grow` 值为 2。
   - 总增长因子 = 1 + 2 = 3。
   - 每个增长因子的空间 = 可用空间 / 总增长因子 = 300px / 3 = 100px。

5. **计算最终宽度**：
   - 第一个子元素的最终宽度 = 基础宽度 + 分配的增长空间 = 100px + (1 \* 100px) = 200px。
   - 第二个子元素的最终宽度 = 基础宽度 + 分配的增长空间 = 100px + (2 \* 100px) = 300px。

### 结果

- 第一个子元素的最终宽度为 200 像素，背景颜色为红色。
- 第二个子元素的最终宽度为 300 像素，背景颜色为蓝色。

通过这种方式，`flex-grow` 属性帮助我们在父容器中按比例分配多余的可用空间，使得两个子元素的宽度根据它们的增长因子进行调整。

## 补充：`flex-basis` 的计算规则

为了解释 `flex-basis` 的计算规则，我们需要理解 `flex-basis`、`flex-grow` 和元素的宽度属性是如何相互作用的。下面我们详细分析两个例子：

### 第一个例子

```jsx | pure
<div className="flex w-[600px] h-[50px]">
  <div className="w-[150px] flex-grow basis-0 bg-red-600"></div>
  <div className="w-[150px] flex-grow-[2] basis-0 bg-blue-600"></div>
</div>
```

- **容器宽度**：`600px`
- **第一个子元素**：
  - `width`: `150px`
  - `flex-grow`: `1`
  - `flex-basis`: `0`
- **第二个子元素**：
  - `width`: `150px`
  - `flex-grow`: `2`
  - `flex-basis`: `0`

在这个例子中，`flex-basis` 被设置为 `0`，这意味着在计算可分配空间时，将忽略元素的初始宽度 (即 `width` 属性)。所有可用空间 (即容器的宽度减去所有元素的 `margin`、`padding` 和 `border`) 将根据 `flex-grow` 的比例进行分配。

1. 总可用空间为 `600px`。
2. 因为 `flex-basis` 是 `0`，初始宽度被忽略。
3. `flex-grow` 比例为 `1:2`，所以总的 `flex-grow` 为 `3`。
4. 每个 `flex-grow` 单位分配的空间为 `600px / 3 = 200px`。

因此：

- 第一个子元素分配到 `1 * 200px = 200px`。
- 第二个子元素分配到 `2 * 200px = 400px`。

### 第二个例子

```jsx | pure
<div className="flex w-[600px] h-[50px]">
  <div className="w-[150px] basis-auto flex-grow bg-red-600"></div>
  <div className="w-[150px] basis-auto flex-grow-[2] bg-blue-600"></div>
</div>
```

- **容器宽度**：`600px`
- **第一个子元素**：
  - `width`: `150px`
  - `flex-grow`: `1`
  - `flex-basis`: `auto`
- **第二个子元素**：
  - `width`: `150px`
  - `flex-grow`: `2`
  - `flex-basis`: `auto`

在这个例子中，`flex-basis` 被设置为 `auto`，这意味着在计算可分配空间时，将使用元素的初始宽度 (即 `width` 属性)。

1. 第一个子元素的初始宽度为 `150px`。
2. 第二个子元素的初始宽度也为 `150px`。
3. 因此，初始总宽度为 `150px + 150px = 300px`。
4. 总可用空间为容器宽度减去初始总宽度：`600px - 300px = 300px`。
5. `flex-grow` 比例为 `1:2`，所以总的 `flex-grow` 为 `3`。
6. 每个 `flex-grow` 单位分配的空间为 `300px / 3 = 100px`。

因此：

- 第一个子元素初始宽度为 `150px`，再加上 `1 * 100px = 100px`，总宽度为 `250px`。
- 第二个子元素初始宽度为 `150px`，再加上 `2 * 100px = 200px`，总宽度为 `350px`。

### 总结

- 在第一个例子中，`flex-basis` 为 `0`，忽略初始宽度，所有空间按照 `flex-grow` 比例分配。
- 在第二个例子中，`flex-basis` 为 `auto`，初始宽度由 `width` 属性决定，剩余空间按照 `flex-grow` 比例分配。

## flex 布局中的换行

> TODO
