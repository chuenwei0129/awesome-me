---
group:
  title: css
  order: 2
title: Grid 网格布局
toc: content
order: 9
---

## 概述

Grid 网格布局是前端开发的终极布局解决方案，涉及 40+ 个 CSS 属性，覆盖了绝大多数前端布局场景。掌握 Grid 布局等于掌握了前端布局的核心。

### Grid 布局的两大核心

Grid 布局的所有属性分为两大类：

1. **Grid Arrangement（网格排列）**：定义网格如何绘制，控制行列的分布
2. **Item Placement（项目放置）**：控制元素如何放置到网格中，是否跨越多个单元格，以及对齐方式

---

## 实例 1：九宫格布局

### 目标效果

创建一个 3×3 的九宫格，9 个元素均匀排列，带有间距，整体居中显示。

### 演示代码

```jsx
const containerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 100px)',
  gridTemplateRows: 'repeat(3, 100px)',
  gap: '10px',
  justifyContent: 'center',
  alignContent: 'center',
  height: '400px',
  backgroundColor: '#f5f5f5',
};

const itemStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '24px',
  fontWeight: 'bold',
  borderRadius: '4px',
};

export default () => {
  return (
    <div style={containerStyle}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <div key={num} style={itemStyle}>
          {num}
        </div>
      ))}
    </div>
  );
};
```

### 核心知识点

#### 1. 基础网格设置

```css
.container {
  display: grid; /* 将容器转为网格布局 */
  grid-template-columns: 100px 100px 100px; /* 定义 3 列，每列 100px */
  grid-template-rows: 100px 100px 100px; /* 定义 3 行，每行 100px */
}
```

**重要规则**：一旦容器成为网格布局，所有子元素（grid items）会自动变成块级元素，即使设置 `display: inline` 也无效。

#### 2. repeat() 函数

简化重复值的书写：

```css
.container {
  grid-template-columns: repeat(3, 100px); /* 重复 3 次 100px */
  grid-template-rows: repeat(3, 100px);
}
```

`repeat()` 可以灵活混用：

```css
grid-template-columns: 50px repeat(3, 100px) 10%; /* 5 列 */
```

#### 3. 网格间距

```css
.container {
  gap: 10px; /* 行列间距都是 10px */
  /* 或分别设置 */
  row-gap: 10px;
  column-gap: 10px;
}
```

**注意**：`gap` 是简写属性，实际生效的是 `row-gap` 和 `column-gap`。

#### 4. 网格对齐

```css
.container {
  justify-content: center; /* 水平居中 */
  align-content: center; /* 垂直居中 */
}
```

可选值：`start` | `end` | `center` | `space-between` | `space-around` | `space-evenly`

---

## 实例 2：动态响应式布局

### 目标效果

- 前 3 行固定高度 100px
- 后续行最小高度 80px，内容超出时自动扩展
- 列数根据容器宽度自动调整（响应式）

### 演示代码

```jsx
const containerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gridTemplateRows: 'repeat(3, 100px)',
  gridAutoRows: 'minmax(80px, auto)',
  gap: '10px',
  backgroundColor: '#f5f5f5',
  padding: '20px',
};

const getItemStyle = (index) => ({
  backgroundColor: index < 12 ? '#2196F3' : '#FF9800',
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '18px',
  fontWeight: 'bold',
  borderRadius: '4px',
  padding: '10px',
});

const items = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  content:
    i === 19
      ? '这是一个内容较多的元素，用来演示 minmax 函数如何让网格自动扩展高度以容纳更多内容'
      : `${i + 1}`,
}));

export default () => {
  return (
    <div style={containerStyle}>
      {items.map((item, index) => (
        <div key={item.id} style={getItemStyle(index)}>
          {item.content}
        </div>
      ))}
    </div>
  );
};
```

### 核心知识点

#### 1. fr 单位（fraction）

相对单位，按比例分配空间：

```css
grid-template-columns: 1fr 2fr 3fr 4fr; /* 按 1:2:3:4 分配 */
```

**理解要点**：

- `1fr 1fr` = `2fr 2fr` = `3fr 3fr`（都是等比例）
- 当只有一列占 1fr 时，该列会填满整个容器

#### 2. 显式网格 vs 隐式网格

- **显式网格**：通过 `grid-template-rows/columns` 定义的网格
- **隐式网格**：元素超出显式网格时自动创建的网格

控制隐式网格的行高：

```css
.container {
  grid-template-rows: repeat(3, 200px); /* 前 3 行显式定义 */
  grid-auto-rows: 80px; /* 后续行高度 */
}
```

#### 3. minmax() 函数

定义尺寸范围：

```css
grid-auto-rows: minmax(80px, auto); /* 最小 80px，最大自动 */
```

#### 4. 自动填充列数（响应式核心）

```css
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
```

**工作原理**：

1. 尝试以 200px 为最小宽度排列尽可能多的列
2. 如果空间足够，按 200px 排列
3. 排列完成后，剩余空间按 1fr 分配给所有列

**auto-fill vs auto-fit**：

- `auto-fill`：尽可能多地创建列（即使没有内容）
- `auto-fit`：只创建刚好容纳内容的列数

---

## 实例 3：管理系统布局

### 目标效果

典型后台管理系统布局：

- 顶部 Header 横跨整行
- 左侧 Aside 固定宽度
- 右侧包含 Tab 和 Main 区域

### 演示代码

```jsx
const containerStyle = {
  display: 'grid',
  gridTemplateAreas: `
      "header header"
      "aside  tab"
      "aside  main"
    `,
  gridTemplateRows: '60px 50px 1fr',
  gridTemplateColumns: '200px 1fr',
  gap: '10px',
  height: '500px',
  backgroundColor: '#f5f5f5',
  padding: '10px',
};

const headerStyle = {
  gridArea: 'header',
  backgroundColor: '#1976D2',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
  fontWeight: 'bold',
  borderRadius: '4px',
};

const asideStyle = {
  gridArea: 'aside',
  backgroundColor: '#424242',
  color: 'white',
  padding: '20px',
  borderRadius: '4px',
  fontSize: '14px',
};

const tabStyle = {
  gridArea: 'tab',
  backgroundColor: '#E0E0E0',
  display: 'flex',
  alignItems: 'center',
  padding: '0 20px',
  gap: '10px',
  borderRadius: '4px',
};

const mainStyle = {
  gridArea: 'main',
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '4px',
  overflow: 'auto',
};

const tabButtonStyle = {
  padding: '8px 16px',
  backgroundColor: '#1976D2',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default () => {
  return (
    <div style={containerStyle}>
      <div style={headerStyle}>后台管理系统</div>
      <div style={asideStyle}>
        <div style={{ marginBottom: '10px' }}>📊 Dashboard</div>
        <div style={{ marginBottom: '10px' }}>👥 用户管理</div>
        <div style={{ marginBottom: '10px' }}>📝 内容管理</div>
        <div style={{ marginBottom: '10px' }}>⚙️ 系统设置</div>
      </div>
      <div style={tabStyle}>
        <button style={tabButtonStyle}>Tab 1</button>
        <button style={{ ...tabButtonStyle, backgroundColor: '#757575' }}>
          Tab 2
        </button>
        <button style={{ ...tabButtonStyle, backgroundColor: '#757575' }}>
          Tab 3
        </button>
      </div>
      <div style={mainStyle}>
        <h2>主要内容区域</h2>
        <p>这里是主要的内容展示区域，可以放置各种数据表格、图表等内容。</p>
        <p>Grid 布局让这种经典的后台管理系统布局变得非常简单。</p>
      </div>
    </div>
  );
};
```

### 核心知识点

#### 1. 网格线编号

网格由线条划分，编号从 1 开始：

- 正序：1, 2, 3...
- 倒序：-1, -2, -3...

#### 2. 跨越网格

**方法一：使用网格线**

```css
.header {
  grid-column-start: 1;
  grid-column-end: 3; /* 从第 1 线到第 3 线，跨 2 列 */
  grid-row-start: 1;
  grid-row-end: 2;
}
```

**方法二：简写**

```css
.header {
  grid-column: 1 / 3; /* 起始线 / 结束线 */
  grid-row: 1 / 2;
}
```

**方法三：使用 span**

```css
.header {
  grid-column: 1 / span 2; /* 从第 1 线开始，跨 2 列 */
  grid-row: 1; /* 跨 1 行时可省略结束值 */
}
```

**方法四：使用负数**

```css
.header {
  grid-column: 1 / -1; /* 从第一线到最后一线 */
}
```

#### 3. grid-area 简写

最简洁的方式：

```css
.header {
  grid-area: 1 / 1 / 2 / span 2;
  /* 行起始 / 列起始 / 行结束 / 列结束 */
}
```

#### 4. 命名网格区域（推荐）

**定义区域**：

```css
.container {
  grid-template-areas:
    'header header'
    'aside  tab'
    'aside  main';
}
```

**使用区域名**：

```css
.header {
  grid-area: header;
}
.aside {
  grid-area: aside;
}
.tab {
  grid-area: tab;
}
.main {
  grid-area: main;
}
```

**优势**：直观、易维护、修改布局只需调整 `grid-template-areas`

#### 5. grid-template 超级简写

```css
.container {
  grid-template:
    'header header' 50px
    'aside  tab' 50px
    'aside  main' 1fr
    / 150px 1fr;
  /* 每行后跟高度，最后 / 后是列宽 */
}
```

---

## 实例 4：水平滚动布局

### 目标效果

- 前 2 列宽度 200px，每列前 2 个元素跨 2 行
- 后续列自动排列，宽度 100px
- 整体水平滚动

### 演示代码

```jsx
const containerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 200px)',
  gridTemplateRows: 'repeat(3, 100px)',
  gridAutoFlow: 'column',
  gridAutoColumns: '100px',
  gap: '10px',
  backgroundColor: '#f5f5f5',
  padding: '20px',
  overflowX: 'auto',
};

const getItemStyle = (index) => ({
  backgroundColor: index < 2 ? '#E91E63' : '#9C27B0',
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '18px',
  fontWeight: 'bold',
  borderRadius: '4px',
  gridRow: index < 2 ? 'span 2' : 'auto',
});

export default () => {
  return (
    <div style={containerStyle}>
      {Array.from({ length: 20 }, (_, i) => (
        <div key={i + 1} style={getItemStyle(i)}>
          {String.fromCharCode(65 + i)}
        </div>
      ))}
    </div>
  );
};
```

### 核心知识点

#### 1. 改变排列方向

```css
.container {
  grid-auto-flow: column; /* 按列排列（默认 row） */
}
```

#### 2. 控制隐式网格列宽

```css
grid-auto-columns: 100px; /* 隐式列宽度 */
```

#### 3. dense 关键字

解决空白网格问题：

```css
grid-auto-flow: row dense; /* 紧密排列，自动填补空白 */
```

**场景**：当某些元素跨越多列/行导致出现空白时，后续元素会自动填充这些空白。

### dense 关键字演示

```jsx
export default () => {
  const [useDense, setUseDense] = React.useState(false);

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridAutoFlow: useDense ? 'row dense' : 'row',
    gap: '10px',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    marginTop: '10px',
  };

  const getItemStyle = (index) => ({
    backgroundColor: [0, 3, 6].includes(index) ? '#FF5722' : '#03A9F4',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
    borderRadius: '4px',
    padding: '20px',
    gridColumn: [0, 3, 6].includes(index) ? 'span 2' : 'auto',
  });

  return (
    <div>
      <button
        onClick={() => setUseDense(!useDense)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        {useDense ? '关闭 dense' : '开启 dense'}
      </button>
      <div style={containerStyle}>
        {Array.from({ length: 9 }, (_, i) => (
          <div key={i + 1} style={getItemStyle(i)}>
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};
```

#### 4. order 属性

改变元素显示顺序（不改变 DOM 结构）：

```css
.item:last-child {
  order: -1; /* 显示在最前面 */
}
```

### order 属性演示

```jsx
const containerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '10px',
  backgroundColor: '#f5f5f5',
  padding: '20px',
};

const getItemStyle = (index) => ({
  backgroundColor: '#673AB7',
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '18px',
  fontWeight: 'bold',
  borderRadius: '4px',
  padding: '20px',
  order: index === 8 ? -1 : 0, // 最后一个元素显示在最前面
  border: index === 8 ? '3px solid #FFC107' : 'none',
});

export default () => {
  return (
    <div>
      <p style={{ margin: '0 0 10px 0', color: '#666' }}>
        黄色边框的元素（编号 9）在 DOM 中是最后一个，但通过 order: -1
        显示在最前面
      </p>
      <div style={containerStyle}>
        {Array.from({ length: 9 }, (_, i) => (
          <div key={i + 1} style={getItemStyle(i)}>
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};
```

---

## 实例 5：表格样式布局

### 目标效果

类似表格的两列布局：

- 左列（产品名）右对齐
- 右列（库存）左对齐
- 所有元素垂直居中

### 演示代码

```jsx
const containerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridTemplateRows: '100px',
  gridAutoRows: '80px',
  gap: '10px',
  backgroundColor: '#f5f5f5',
  padding: '20px',
  alignItems: 'center',
};

const headerStyle = {
  backgroundColor: '#607D8B',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  padding: '0 20px',
  fontSize: '18px',
  fontWeight: 'bold',
  borderRadius: '4px',
};

const productStyle = {
  backgroundColor: '#E3F2FD',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'end', // 右对齐
  padding: '0 20px',
  fontSize: '16px',
  borderRadius: '4px',
  height: '100%',
};

const stockStyle = {
  backgroundColor: '#FFF3E0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start', // 左对齐
  padding: '0 20px',
  fontSize: '16px',
  borderRadius: '4px',
  height: '100%',
};

const products = [
  { name: 'iPhone 15 Pro', stock: 128 },
  { name: 'MacBook Pro M3', stock: 45 },
  { name: 'iPad Air', stock: 203 },
  { name: 'Apple Watch', stock: 89 },
  { name: 'AirPods Pro', stock: 156 },
];

export default () => {
  return (
    <div style={containerStyle}>
      <div style={headerStyle}>产品名称</div>
      <div style={headerStyle}>库存数量</div>
      {products.map((product, index) => (
        <React.Fragment key={index}>
          <div style={productStyle}>{product.name}</div>
          <div style={stockStyle}>{product.stock} 件</div>
        </React.Fragment>
      ))}
    </div>
  );
};
```

### 核心知识点

#### 1. 网格项对齐（全局控制）

**容器中设置**：

```css
.container {
  justify-items: center; /* 水平对齐 */
  align-items: center; /* 垂直对齐 */
}
```

可选值：`start` | `end` | `center` | `stretch`

#### 2. 网格项对齐（单独控制）

**子元素中设置**：

```css
.product {
  justify-self: end; /* 单独控制水平对齐 */
  align-self: center; /* 单独控制垂直对齐 */
}
```

### 对齐属性对比演示

```jsx
export default () => {
  const [justifyItems, setJustifyItems] = React.useState('center');
  const [alignItems, setAlignItems] = React.useState('center');

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 150px)',
    gridTemplateRows: 'repeat(2, 100px)',
    gap: '10px',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    justifyItems,
    alignItems,
  };

  const itemStyle = {
    backgroundColor: '#00BCD4',
    color: 'white',
    padding: '20px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '4px',
  };

  const buttonGroupStyle = {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px',
    flexWrap: 'wrap',
  };

  const buttonStyle = {
    padding: '8px 16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  };

  return (
    <div>
      <div style={buttonGroupStyle}>
        <span style={{ alignSelf: 'center', fontWeight: 'bold' }}>
          justify-items:
        </span>
        {['start', 'end', 'center', 'stretch'].map((value) => (
          <button
            key={value}
            onClick={() => setJustifyItems(value)}
            style={{
              ...buttonStyle,
              backgroundColor: justifyItems === value ? '#2196F3' : '#4CAF50',
            }}
          >
            {value}
          </button>
        ))}
      </div>
      <div style={buttonGroupStyle}>
        <span style={{ alignSelf: 'center', fontWeight: 'bold' }}>
          align-items:
        </span>
        {['start', 'end', 'center', 'stretch'].map((value) => (
          <button
            key={value}
            onClick={() => setAlignItems(value)}
            style={{
              ...buttonStyle,
              backgroundColor: alignItems === value ? '#2196F3' : '#4CAF50',
            }}
          >
            {value}
          </button>
        ))}
      </div>
      <div style={containerStyle}>
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i + 1} style={itemStyle}>
            Item {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};
```

#### 3. place-items / place-self 简写

```css
/* 容器中 */
place-items: center center; /* 垂直 水平 */

/* 子元素中 */
place-self: center end; /* 垂直 水平 */
```

---

## 核心属性速查

### 容器属性（复数形式）

| 属性                    | 作用           | 常用值                                                |
| ----------------------- | -------------- | ----------------------------------------------------- |
| `grid-template-rows`    | 定义行数和高度 | `100px 200px` / `repeat(3, 1fr)`                      |
| `grid-template-columns` | 定义列数和宽度 | `100px 1fr` / `repeat(auto-fill, minmax(200px, 1fr))` |
| `grid-template-areas`   | 命名网格区域   | `'header header' 'aside main'`                        |
| `grid-auto-rows`        | 隐式行高       | `80px` / `minmax(80px, auto)`                         |
| `grid-auto-columns`     | 隐式列宽       | `100px`                                               |
| `grid-auto-flow`        | 排列方向       | `row` / `column` / `row dense`                        |
| `gap`                   | 间距           | `10px` / `10px 20px`                                  |
| `justify-content`       | 网格水平对齐   | `start` / `end` / `center` / `space-between`          |
| `align-content`         | 网格垂直对齐   | `start` / `end` / `center`                            |
| `justify-items`         | 项目水平对齐   | `start` / `end` / `center` / `stretch`                |
| `align-items`           | 项目垂直对齐   | `start` / `end` / `center` / `stretch`                |

### 项目属性（单数形式）

| 属性           | 作用           | 常用值                                 |
| -------------- | -------------- | -------------------------------------- |
| `grid-column`  | 跨越列         | `1 / 3` / `span 2` / `1 / -1`          |
| `grid-row`     | 跨越行         | `1 / 3` / `span 2`                     |
| `grid-area`    | 指定区域或跨越 | `header` / `1 / 1 / 2 / 3`             |
| `justify-self` | 单独水平对齐   | `start` / `end` / `center` / `stretch` |
| `align-self`   | 单独垂直对齐   | `start` / `end` / `center` / `stretch` |
| `order`        | 显示顺序       | `-1` / `0` / `1`                       |

---

## 技巧与最佳实践

1. **属性命名规律**：

   - 复数形式（items/rows/columns/areas）→ 写在容器
   - 单数形式（item/row/column/area）→ 写在子元素

2. **调试技巧**：

   - Chrome DevTools 中点击 `display: grid` 旁的图标可视化网格
   - 使用网格编辑器快速调整 `justify-content`、`align-content` 等属性

3. **简写属性使用建议**：

   - 简单场景使用简写（如 `gap`、`grid-column`）
   - 复杂场景分开写更清晰（避免过度简写降低可读性）

4. **响应式布局推荐写法**：

   ```css
   grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
   ```

5. **命名区域的优势**：
   - 语义化强，代码可读性高
   - 修改布局时只需调整 `grid-template-areas`

---

## 总结

CSS Grid 是迄今为止最强大的布局系统，掌握以下要点即可应对 99% 的布局需求：

1. ✅ 理解显式网格 vs 隐式网格
2. ✅ 熟练使用 `fr` 单位和 `minmax()` 函数
3. ✅ 掌握 `grid-area` 和命名网格区域
4. ✅ 理解 `auto-fill` 实现响应式布局
5. ✅ 区分容器属性（复数）和项目属性（单数）

配合 Flexbox 处理一维布局，Grid 处理二维布局，你将完全掌握 CSS 布局！
