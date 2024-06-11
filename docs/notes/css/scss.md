---
title: scss
toc: content
group:
  title: 工程化
---

## 什么是预处理器？

> **CSS** 预处理器是一种工具或语言，它扩展了原生 **CSS** 的功能并增加了一些额外的功能和语法，以提高样式表的编写效率、可读性和可维护性。其工作`基本原理`是：**编写使用预处理器的特定语法的样式文件，然后将其编译为普通的 CSS 文件，供浏览器解析和渲染**。

以下是市面上流行的三种 **CSS** 预处理器：

1. **Sass**：一种成熟且广泛使用的 CSS 预处理器。它扩展了 **CSS** 并引入了变量、嵌套、混合、继承等功能。**Sass** 有两个语法风格：**Sass** 风格使用类似于 Ruby 的缩进语法，而 **Scss** 风格的语法则采用更类似于 **CSS** 的大括号语法。

2. **Less**：另一种流行的 **CSS** 预处理器。它与原生 **CSS** 非常相似，提供了类似于 **Sass** 的功能，如变量、嵌套、混合等。**Less** 使用 **JavaScript** 在客户端或服务端进行编译。

3. **Stylus**：一个高度灵活和简洁的 **CSS** 预处理器。它采用类似于 **Sass** 的缩进语法，具有简洁的语法和强大的功能。**Stylus** 可以直接编写一行样式，而无需添加分号和大括号，使得样式表更加简洁。

这些预处理器提供的功能包括变量、嵌套、混合、继承、运算、条件判断、模块化等，可以帮助开发人员提高 **CSS** 代码的可维护性和重用性。它们通常具有`更好的组织结构`、`更少的代码重复`和`更清晰的语法`，使得在大型项目中管理和编写 CSS 变得更加方便和高效。

## 为什么 Sass 文件要以 scss 为后缀呢？

Sass 最初是由 `Hampton Catlin` 开发的，它基于 `Haml（一种用于快速制作 XHTML 的模板语言）`的缩进风格，并于 **2006** 年推出。最初的 **Sass** 不向后兼容 **CSS**，它引入了许多新的语法和概念，如嵌套和混合等。

最初的 **Sass** 语法格式如下：

```sass
.container
  background-color: red
  p
    color: white
```

可以发现与现在 **CSS** 不同的地方：

1. 缩进表示嵌套：**Sass** 使用缩进来表示样式规则和声明之间的嵌套关系。
1. 无需分号：在 **Sass** 的初始语法中，我们不需要在每个声明的末尾添加分号，**Sass** 会根据换行符来确定声明的结束。

这样虽然可以让我们在平时的开发中少写几个字符，但是突如其来的改变让人一时很难接受，所以后来 **Sass** 开发者们又推出了**类 CSS** 语法格式，也就是 **Scss** 语法格式。

**Sass 3** 于 **2010** 年发布，此版本引入了 **SCSS** 语法作为 **Sass** 的一种新的语法格式。**SCSS** 采用了类似于普通 **CSS** 的语法，使开发者更容易向现有的 **CSS** 代码过渡并使用 **Sass** 的功能。

```scss
.container {
  background-color: red;
  p {
    color: white;
  }
}
```

## Sass 编译器的发展历程

以下是主要的发展过程：

1. 最初的 **Ruby Sass**：最初的 **Sass** 编译器是使用 **Ruby** 语言开发的，它是第一个版本的 **Sass** 编译器。这个版本使用了一种全新的语法，引入了许多新的特性和概念，如嵌套规则、变量和混合器等。这个版本的 **Sass** 编译器由 **Ruby** 实现，需要通过 **Ruby** 的命令行接口或其他工具来编译 **Sass** 文件。

2. **LibSass** 和 **Node-sass**：随着 **Sass** 的流行，为了提高 **Sass** 编译的性能和扩展性，**Sass** 团队开发了 **LibSass** 和基于 **LibSass** 的 **Node-sass** 编译器。**LibSass** 是一个用 `C/C++`编写的 **Sass** 编译器库，可以在多个平台和编程语言中使用。**Node-sass** 是一个使用 **LibSass** 的 **Node.js** 二进制绑定库，它通过将 **Sass** 文件编译为 **CSS**，提供了更快速和高效的 **Sass** 编译能力。

3. **Dart Sass**：为了提供更出色的性能和更好的兼容性，**Sass** 团队决定基于 **Dart** 语言重新实现 **Sass** 编译器。**Dart Sass** 是一个用 **Dart** 语言编写的全新 **Sass** 编译器，它通过 **JavaScript** 实现的 **Dart** 运行时运行。**Dart Sass** 保持了与 **Ruby Sass** 和 **LibSass** 兼容的语法和功能，但在性能和准确性方面有所提升。

总的来说，**Sass** 编译器的发展经历了从最初的 **Ruby Sass** 到 **LibSass** 和 **Node-sass**，再到 **Dart Sass** 的过程。每个阶段都带来了性能和功能上的改进，以满足不同开发者的需求。无论选择哪个版本的 **Sass** 编译器，它们都可以将 **Sass** 文件编译为普通的 **CSS** 文件，提供更灵活、可维护的样式表编写和维护体验。

如果你是早期的 **Sass** 使用者，那么你一定使用过 **Node-sass**，它给开发者带来的体验真是让人非常…………其原因还是 **Node** 版本和 **Node-sass** 版本对应不起来，有的时候我们升级了 **Node**，项目却运行不起来了；有的时候同事的电脑能运行起项目，自己的电脑却运行不了，其本质原因还是两者的版本不对应，故而导致出现的很多问题。

不过好在我们目前使用的是 **Dart Sass** 版本，体验还是非常好的。

以上便是 **Sass** 大体的发展过程，了解了这些发展过程对以后的项目是有一定帮助的，因为有些较老的项目还是采用 **Node-sass** 编译器进行开发的，会时常出一些问题，明白了这些发展过程才能知道出现问题的时候我们该如何去查阅资料进而解决问题。

## 变量

**Sass** 让人们受益的一个重要特性就是它为 **CSS** 引入了变量。

我们可以把反复使用的 **CSS** 属性值定义成变量，然后通过变量名来引用它们，而无需重复书写这一属性值。或者，对于仅使用过一次的属性值，我们可以赋予其一个易懂的变量名，让人一眼就知道这个属性值的用途。

### 声明

**Sass** 变量的声明和 **CSS** 属性的声明很像，变量以美元符号开头，如下所示：

```scss
// 定义一个名字为 highlight-color 的 Sass 变量
$highlight-color: #f90;
```

### 变量命名规则

在 **Sass** 中，变量的命名规则遵循一些通用的规范，以提高代码的可读性和可维护性。

以下是几个常见的变量命名规则：

1. **使用有意义的名称**：为了使代码易于理解和维护，变量的命名应该具有描述性，能清晰地表达其目的和含义。避免使用晦涩难懂的名称，尽量选择有意义的单词或短语来描述变量。

2. **使用小写字母和连接符**：变量的名称应该使用小写字母，并使用连接符（短横线或下划线）来分隔单词，以增加可读性。这使得变量名称更容易识别和理解。

3. **避免使用缩写和简写**：为了减少代码的歧义和误解，应该避免过多使用缩写和简写。尽量使用完整的单词来描述变量的含义，以提高代码的可读性和可维护性。

4. **采用一致的命名规范**：在整个项目或团队中，应该遵循一致的命名规范，以确保整个代码库的一致性。这可以减少混淆和错误，并提高多人合作开发的效率。

### 变量使用

变量使用非常简单，我们直接在规则集使用变量，注意还是以 **`$`** 开头：

```scss
// 声明变量
$primary-color: #ff0000;

// 使用变量
h1 {
  color: $primary-color;
}
```

### 变量数据类型

与其他编程语言相似，在 **Sass** 中，我们也可以定义不同的数据类型的变量，以满足不同的需求，以下是 **Sass** 中常见的数据类型。

1. **数字（Numbers）**：表示数值，可以是整数或浮点数。

   ```scss
   $font-size: 14px;
   $opacity: 0.5;
   ```

2. **字符串（Strings）**：表示一串文本，可以使用引号（单引号或双引号）来定义。

   ```scss
   $font-family: 'Arial', sans-serif;
   $class-prefix: 'prefix-';
   ```

3. **颜色（Colors）**：表示颜色值，可以使用十六进制、RGB、RGBA、HSL 或关键字表示。

   ```scss
   $body-color: #333;
   $primary-color: rgb(255, 0, 0);
   $background-color: rgba(0, 0, 0, 0.5);
   $link-color: hsl(240, 100%, 50%);
   ```

4. **布尔值（Booleans）**：表示真或假。

   ```scss
   $is-active: true;
   $has-border: false;
   ```

5. **列表（Lists）**：表示一组以逗号分隔的值。

   ```scss
   $font-stack: Arial, sans-serif;
   $breakpoints: (640px, 768px, 1024px);
   ```

6. **映射（Maps）**：表示键值对的集合。

   ```scss
   $colors: (
     'primary': #f00,
     'secondary': #0f0,
     'accent': #00f,
   );
   ```

7. **空（Null）**：表示无值或未定义。

   ```scss
   $no-value: null;
   ```

### 变量插值

在 **Sass** 中，变量的插值使用和上面说的变量直接使用有点类似，不同的是使用变量插值可以将变量值嵌入到选择器名、属性或值中，不单单只是在值中使用。

变量插值可以用于选择器、属性和字符串值中，使用 `#{}` 将变量的值嵌入到字符串中。例如：

```scss
// 变量插值用于选择器
$class-name: 'my-element';
$color: red;

.#{$class-name} {
  color: $color;
}

// 变量插值用于字符串值中
$hello: 'hello';
$world: 'world';
$hello-world: $hello + '-' + $world;
$world-hello: '#{$world}-#{$hello}';

.#{$world-hello} {
  color: $color;
}

.#{$hello-world} {
  color: $color;
}
```

### 作用域

**Sass** 变量具有作用域的概念，它们的可见范围取决于变量在代码中的声明位置。

以下是 **Sass** 中的变量作用域的几个关键点。

#### 局部作用域

默认情况下，变量在声明它们的规则块（例如选择器或函数）的范围内可见。这意味着如果我们在某个规则块中声明一个变量，它只能在该规则块及其内部嵌套规则块中使用。

```scss
.text {
  $color: red; // 局部变量
  color: $color;

  .highlight {
    background-color: $color; // 可以在嵌套规则内部访问
  }
}
// 以上代码可以正确编译成 CSS 文件
// 如果再加上下面代码：
.bg {
  background-color: $color;
}
// 编译就会报错
```

在上面的示例中，`$color` 是一个局部变量，只能在 `.text` 规则块及其嵌套规则中使用。

#### 全局作用域

有时候，我们希望在整个样式表中都可以访问和使用某个变量。这可以通过在变量声明时使用 `!global` 标志来实现。

```scss
.text {
  $color: red !global; // 全局变量
  color: $color;
}

.highlight {
  background-color: $color;
}
```

在上面的示例中，`$color` 被声明为全局变量，因此可以在整个样式表中的任何地方使用。

**虽然早期的 Sass 编译器确实可以这样做，但在 `Dart Sass 2.0.0` 之后，这样做已经不可行。这样代码可读性会降低，导致出现问题的时候不好排查。所以我们不会考虑使用这种方式定义一个全局的变量，而是会在文件顶部定义好全局作用域的变量。**

如下：

```scss
$color: red; // 全局变量

.text {
  color: $color;

  .highlight {
    background-color: $color; // 可以在嵌套规则内部访问
  }
}

.bg {
  background-color: $color;
}
```

通过合理使用变量的作用域，我们可以更好地控制样式表中的变量访问和影响范围，提高样式表的可维护性和可复用性。

### 变量值更改

在 **Sass** 中，我们可以在样式表中的任何位置更改变量的值。这意味着我们可以根据需要动态地更新变量的值，从而改变相应样式的外观和行为。

我们可以为变量赋予一个新的值来更新它：

```scss
$primary-color: red;

.container {
  background-color: $primary-color;
}

$primary-color: blue; // 更新变量的值

.another-element {
  background-color: $primary-color; // 使用更新后的变量值
}
```

在上面的示例中，开始时 `$primary-color` 的值是 `red`，但在后面的代码中，它被更新为 `blue`，并相应地改变了 `.container` 和 `.another-element` 的背景色。

通过以上方式，我们可以在 **Sass** 中更改变量的值，以适应不同的需求和场景。这种灵活性使样式表更具可扩展性和维护性。

### 变量运算

在了解了上面提到的变量的基本概念，那么接下来我们就通过这些变量去做一些事，那自然而然就离不了数据运算。

#### 数字运算

在 **Sass** 中，我们可以对数字进行各种算术运算，包括加法、减法、乘法和除法。

以下是几种常见的数字运算示例。

**加法**：

```scss
$width: 100px + 20px;
```

上述代码将把变量 `$width` 的值设置为 **120px**。

**减法**：

```scss
$height: 200px - 50px;
```

上述代码将把变量 `$height` 的值设置为 **150px**。

**乘法**：

```scss
$font-size: 16px * 1.5;
```

上述代码将把变量 `$font-size` 的值设置为 **24px**。

**除法**：

```scss
$container-width: 800px / 2;
```

上述代码将把变量 `$container-width` 的值设置为 **400px**。

对于早期的除法运算上述代码确实可以，但从 `Dart Sass 2.0.0` 之后这种做法已经被废除，对于上述代码会编译报错。

现在推荐使用 `math.div()函数` 或者 `calc()` 函数，对于`math.div()函数`是 **Sass** 自带的函数，如果我们使用这种方式需要引入第三方模块，如下：

```scss
// 通过 @use 指令引入 math 模块，才可以正常使用 math.div 函数
@use 'sass:math';
$width: 400px;

.container {
  border-radius: math.div($width, 2);
}
```

对于 `calc()函数`是 **CSS** 自带的，所以我们无需引入其他第三方模块即可使用，如下：

```scss
$width: 400px;

.container {
  border-radius: calc($width / 2);
}
```

更推荐使用这种方式进行除法运算。

**复杂运算**：

```scss
$final-width: (100px + 20px) * 2 - 50px;
```

上述代码将先计算括号中的加法和乘法，然后减去 50px，最终将结果赋值给 `$final-width`。

#### 颜色运算

在 **Sass** 中，我们可以借助 **Sass** 本身提供的各种函数对颜色进行各种运算操作。

1. Lighten（变亮）和 Darken（变暗）：

   - `lighten($color, $amount)`：将颜色变亮，`$amount` 参数表示变亮的程度。
   - `darken($color, $amount)`：将颜色变暗，`$amount` 参数表示变暗的程度。

1. Saturate（饱和度增加）和 Desaturate（饱和度减少）：

   - `saturate($color, $amount)`：增加颜色的饱和度，`$amount` 参数表示增加的程度。
   - `desaturate($color, $amount)`：减少颜色的饱和度，`$amount` 参数表示减少的程度。

1. Adjust Hue（调整色调）：

   - `adjust-hue($color, $degrees)`：调整颜色的色调，`$degrees` 参数表示调整的角度。

1. Mix（混合颜色）：

   - `mix($color1, $color2, $weight)`：将两个颜色按给定的权重混合在一起，`$weight` 参数表示混合的权重。

1. Opacity（透明度）：

   - `rgba($color, $alpha)`：设置颜色的透明度，`$alpha` 参数表示透明度值。

下面我们来看一个比较综合的案例，感受一下函数是如何使用的：

```scss
$color: #336699;

$lightened: lighten($color, 20%);
$darkened: darken($color, 20%);

$saturated: saturate($color, 30%);
$desaturated: desaturate($color, 30%);

$adjustedHue: adjust-hue($color, 60deg);

$mixed: mix($color, #99ccff, 50%);

$transparent: rgba($color, 0.5);

.test {
  color1: $lightened;
  color2: $darkened;
  color3: $saturated;
  color4: $desaturated;
  color5: $adjustedHue;
  color6: $mixed;
  color7: $transparent;
}
```

最终编译输出为：

```css
.test {
  color1: #6699cc;
  color2: #1a334d;
  color3: #1466b8;
  color4: #52667a;
  color5: rebeccapurple;
  color6: #6699cc;
  color7: rgba(51, 102, 153, 0.5);
}
```

#### 字符串运算

在 **Sass** 中，我们可以对字符串进行一些基本的操作和运算，包括`字符串连接`和`字符串插值`。

我们可以使用 `+` 操作符来连接两个字符串：

```scss
$greeting: 'Hello';
$name: 'John';

$message: $greeting + ' ' + $name;
```

上述代码将把变量 `$message` 的值设置为 "Hello John"，将两个字符串连接起来。

在 **Sass** 中，我们可以在字符串中插入变量的值，使用 `#{}` 语法。

```scss
$name: 'John';

$message: 'Hello, #{$name}!';
```

上述代码将把变量 `$message` 的值设置为 "Hello, John!"，其中 `#{$name}` 会被变量 `$name` 的值替代。

## 嵌套规则

在 **Sass** 中，嵌套规则是一种将选择器和样式规则嵌套在其他选择器或父级元素内部的方法。这种嵌套结构的优势是：更清晰的样式层级关系和减少重复代码，让 **CSS** 代码更易读和维护。

### 基本嵌套

使用 Sass 的基本嵌套规则，我们可以在样式表中将选择器和样式规则嵌套到其他选择器内部。这样，就可以显式地表示样式规则的层次关系。

```scss
.container {
  width: 100%;

  .title {
    font-size: 24px;
    color: #333;
  }
}
```

在这个示例中，`.title`选择器嵌套在`.container`选择器内部，表示`.title`是`.container`的子元素。这样，它们之间的层次关系更加清晰。

### 伪类和伪元素嵌套

伪类和伪元素可以与嵌套规则结合使用，进一步简化样式规则的书写。

```scss
.container {
  width: 100%;

  &:hover {
    background-color: gray;

    &::after {
      content: '';
      display: block;
      width: 10px;
      height: 10px;
      background-color: red;
    }
  }
}
```

在这个示例中，`.container`元素在悬停状态下，背景颜色将变为灰色，并且还会添加一个红色的伪元素`::after`。嵌套规则使得在悬停状态下的样式规则更加清晰易读。

### 注意事项

需要注意以下几点：

- 避免过于深层次的嵌套，以避免生成过于复杂和具有冗余的 **CSS** 规则。
- 优先使用**类选择器**，而不是 **ID 选择器**进行嵌套。**ID 选择器**的特殊性很高，不适合用于嵌套结构。
- 虽然 **Sass** 允许嵌套，但仍然需要通过适当的层次规划和命名来组织样式，以保持代码的可维护性。

使用嵌套规则可以让 **Sass** 样式表的结构更加清晰、减少冗余代码，并提高代码的可读性和可维护性。但需要注意合理使用嵌套，避免过度嵌套和选择器特殊性的问题。

### 父级选择器 `&`

在 Sass 中，`&`符号是一个特殊的字符，用于引用父级选择器。它在嵌套规则中使用，以便在生成的 CSS 中正确地引用父级选择器的上下文。

#### 父级选择器引用

`&`用于引用父级选择器，以在嵌套规则中使用父级选择器的上下文。通过`&`符号，我们可以从嵌套的样式规则中生成正确的 CSS 选择器。

```scss
.btn {
  background-color: blue;

  &:hover {
    background-color: red;
  }
}
```

#### `&` 不只是代表最近的一层父级

`&` 代表的是所有父层级，而不是仅仅代表最近的一级。

我们来看一段代码：

```scss
.main {
  .page {
    .container {
      .title {
        color: red;
        &::after {
          content: '|';
          color: #000;
        }
      }
    }
  }
}
```

`&` 代表的是 `.main .page .container .title`，输出的代码为：

```css
.main .page .container .title {
  color: red;
}
.main .page .container .title::after {
  content: '|';
  color: #000;
}
```

#### 多个 `&`

在有些情况下，我们可能会使用到多个 `&` 的情形，比如，`& + &`，我们再通过代码来感受一下：

```scss
.list {
  .item {
    color: red;
    & + & {
      margin-top: 10px;
      margin-left: 10px;
    }
  }
}
```

上述代码中 `& + &` 应该代表的是 `.list .item + .list .item`，我们看一下最终输出：

```css
.list .item {
  color: red;
}
.list .item + .list .item {
  margin-top: 10px;
  margin-left: 10px;
}
.list .item,
.list .item {
  margin-top: 10px;
  margin-left: 10px;
}
```

## 指令

当我们要使用 `Math.div() 函数`的时候，就必须先要通过 `@use 'sass:math'` 引入相关的模块。这里的 `@use` 就是一个指令。

指令可以说是 **Sass** 核心中的核心，大部分功能都是由其完成实现。指令大体分为了以下几类：

1. **控制指令（Control Directives）**：这类指令用于控制样式代码的执行流程和条件。常见的控制指令包括 `@if`、`@else if`、`@else`、`@for`、`@each`、`@while`，它们可以根据条件或循环来选择性地执行或重复样式代码。

2. **引入指令（Import Directives）**：这类指令用于引入外部文件或模块。`@import`是最常用的引入指令，它可以导入其他 **Sass** 或 **CSS** 文件，也可以使用相对路径或绝对路径导入。

3. **混合指令（Mixin Directives）**：这类指令用于定义可重用的样式块，以及在需要时将它们应用到选择器上。`@mixin`用于定义混合器，`@include`用于在选择器中使用混合器。

4. **函数指令（Function Directives）**：这类指令用于定义和使用函数，用于处理复杂的样式计算或生成动态的样式。`@function`用于定义函数，`@return`用于从函数中返回值，`call`函数用于调用函数。

5. **输出指令（Output Directives）**：这类指令用于控制编译后的输出。常见的输出指令包括 `@debug`、`@warn`、`@error`，用于在编译过程中输出调试信息或错误信息。

6. **命名空间指令（Namespace Directives）**：这类指令用于在样式选择器中创建命名空间，以避免选择器冲突。`@namespace`可以创建命名空间并将样式代码放在命名空间内。

除了以上分类的指令，**Sass** 还有一些其他的特殊指令和注释语法，用于实现更高级的功能和增强开发体验。比如，`@extend`用于选择器的继承，`@content`用于定义可插入内容的占位符选择器。

### 流程控制指令

#### 条件判断 @if

在 Sass 中，`if`是一个条件语句，用于根据条件来进行选择性地应用样式。它的语法如下：

```scss
@if <condition> {
  // 如果条件为真，则执行此处的样式
} @else if <condition> {
  // 如果前面的条件不满足，但此条件为真，则执行此处的样式
} @else {
  // 如果前面的条件都不满足，则执行此处的样式
}
```

在条件语句中，`<condition>`可以是任何布尔表达式，可以使用比较运算符（如`==`、`!=`、`>`、`<`等）和逻辑运算符（如`and`、`or`、`not`）来构建条件。

下面是一个简单示例，演示如何在 Sass 中使用`if`语句：

```scss
$button-color: green;

.button {
  @if $button-color == green {
    background-color: $button-color;
  } @else if $button-color == red {
    background-color: $button-color;
  } @else {
    background-color: blue;
  }
}
```

最终输出为：

```css
.button {
  background-color: green;
}
```

在这个示例中，根据`$button-color`变量的值，选择性地应用不同的背景颜色。如果`$button-color`的值为绿色，那么`.button`元素的背景颜色将为绿色；如果为红色，则为红色；否则为蓝色。

通过使用`if`语句，我们可以根据条件来动态地控制样式的应用，使得 Sass 更加灵活和可维护。

#### 循环：@for 、@each 和 @while

> **@for**：在 Sass 中，`for`是一个循环控制语句，用于重复执行一段样式代码。它的语法如下：

```scss
@for $variable from <start> through <end> {
  // 循环体，可以包含样式代码
}
```

在循环体内，`$variable`是循环变量，用于迭代循环中的操作。`<start>`和`<end>`是起始值和结束值，决定了循环的次数，循环会从起始值递增或递减到结束值。

```scss
@for $var from <start> to <end> ;
```

区别在于 `through` 与 `to` 的含义：当使用 `through` 时，条件范围包含 `<start>` 与 `<end>` 的值，而使用 `to` 时条件范围只包含 `<start>` 的值不包含 `<end>` 的值。另外，`$var` 可以是任何变量，比如 `$i`；`<start>` 和 `<end>` 必须是整数值。

下面是一个简单示例，演示如何在 Sass 中使用`for`循环：

```scss
@for $i from 1 through 3 {
  .box-#{$i} {
    width: 100px * $i;
  }
}
```

在这个示例中，通过`@for $i from 1 through 3`创建了一个循环，循环变量`$i`从 1 递增到 3。在每次循环中，会生成一个类名为`.box-#{$i}`的选择器，并设置其宽度为`100px * $i`。这样就会生成三个具有不同宽度的样式。

生成的 CSS 代码如下：

```css
.box-1 {
  width: 100px;
}

.box-2 {
  width: 200px;
}

.box-3 {
  width: 300px;
}
```

通过使用`for`循环，我们可以便捷地在 Sass 中生成重复的样式，减少代码的冗余和重复编写，提高开发效率。

> **@each**：在 **Sass** 中，`@each`是一个用于循环遍历列表或映射的指令。它的语法如下：

```scss
@each $variable in <list or map> {
  // 循环体，可以包含样式代码
}
```

`$variable`是循环变量，用于在每次循环中代表当前遍历到的元素。`<list or map>`可以是一个列表（用空格或逗号分隔的值集合）或一个映射（类似 JavaScript 对象的键值对集合）。

下面是一个简单示例，演示如何在 Sass 中使用`@each`指令：

```scss
$colors: red, green, blue;
@each $color in $colors {
  .box-#{$color} {
    background-color: $color;
  }
}
```

在这个示例中，定义了一个存储颜色值的列表`$colors`，然后使用`@each`遍历该列表。在每次循环中，`$color`代表当前遍历到的颜色值，并生成一个类名为`.box-#{$color}`的选择器，设置其背景颜色为`$color`的值。

除了遍历列表，`@each`指令还可以用来遍历映射。例如：

```scss
$fonts: (
  heading: 'Arial',
  paragraph: 'Helvetica',
  button: 'Verdana',
);
@each $key, $value in $fonts {
  .#{$key}-text {
    font-family: $value;
  }
}
```

在这个示例中，定义了一个存储字体映射`$fonts`，其中键表示元素的用途，值表示对应的字体。通过使用`@each`指令遍历映射，可以根据映射的键值来生成对应的选择器和样式。

除此之外，@each 还可以使用多个变量，如：`$var1,$var2,...in`。

```scss
@each $animal, $color, $cursor in (puma, black, default), (
    sea-slug,
    blue,
    pointer
  ), (egret, white, move)
{
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
    border: 2px solid $color;
    cursor: $cursor;
  }
}
```

编译输出的结果：

```css
.puma-icon {
  background-image: url('/images/puma.png');
  border: 2px solid black;
  cursor: default;
}

.sea-slug-icon {
  background-image: url('/images/sea-slug.png');
  border: 2px solid blue;
  cursor: pointer;
}

.egret-icon {
  background-image: url('/images/egret.png');
  border: 2px solid white;
  cursor: move;
}
```

通过使用`@each`指令，我们可以在 Sass 中轻松进行列表和映射的遍历，减少重复的样式代码，增强可维护性和可扩展性。

> **@while**：在 Sass 中，`@while`是一个用于创建基于条件的循环的指令。它的语法如下：

```scss
@while <condition> {
  // 循环体，可以包含样式代码
}
```

`<condition>`是一个布尔表达式，表示循环的条件。只要条件为真，循环就会一直执行。循环体内可以包含任何样式代码或其他 Sass 指令，直到条件不满足时，循环结束。

下面是一个简单示例，演示如何在 Sass 中使用`@while`指令：

```scss
$i: 1;
@while $i <= 5 {
  .box-#{$i} {
    width: 100px * $i;
  }
  $i: $i + 1;
}
```

在这个示例中，通过使用`@while $i <= 5`创建了一个循环。循环从`$i`的初始值为 1 开始，每次循环`$i`的值增加 1，直到`$i`的值不再小于等于 5。在每次循环中，会生成一个类名为`.box-#{$i}`的选择器，并设置其宽度为`100px * $i`。

生成的 CSS 代码如下：

```css
.box-1 {
  width: 100px;
}

.box-2 {
  width: 200px;
}

.box-3 {
  width: 300px;
}

.box-4 {
  width: 400px;
}

.box-5 {
  width: 500px;
}
```

通过使用`@while`指令，我们可以根据条件来控制循环的执行，这样就可以实现更加灵活的循环结构，用于生成重复的样式或处理其他复杂的逻辑。但要注意，要确保循环能够在某个点终止，否则可能会导致无限循环。

### 引入指令

**Sass** 的引入指令有以下几种用法：

1. `@import "filename"`：用于导入相对路径下的 **Sass** 或 **CSS** 文件，可以省略文件扩展名。例如：

   ```scss
   @import 'common';
   ```

   这里的`common`可以是一个 **Sass** 文件（如`common.scss`），也可以是一个 **CSS** 文件（如`common.css`）。

1. `@import "folder/filename"`：用于导入相对路径中的子文件夹下的 **Sass** 或 **CSS** 文件。例如：

   ```scss
   @import 'components/buttons';
   ```

   这里的`buttons`可以是一个 **Sass** 文件或 **CSS** 文件，位于`components`文件夹下。

1. `@import url("http://example.com/filename")`：用于导入远程路径中的 **CSS** 文件。例如：

   ```scss
   @import url('http://xxxxx');
   ```

   这里的`http://xxxxx`是一个远程 **CSS** 文件的 **URL** 。

1. 使用文件名通配符：可以使用通配符 `*` 导入多个文件。例如：

   ```scss
   @import 'variables/*';
   ```

   这会导入`variables`文件夹下的所有 **Sass** 文件。

1. 导入多个文件：可以在一条`@import`指令中导入多个文件。例如：

   ```scss
   @import 'reset', 'buttons', 'forms';
   ```

   这里会依次导入`reset`、`buttons`和`forms`三个文件。

在引入指令中，**Sass** 会根据导入顺序将各个文件的内容合并到当前文件中，创建一个单一的输出文件。可以根据需要嵌套使用引入指令，以形成更复杂的文件结构和模块化样式。

需要注意的是，在 **Sass 3.8.x** 版本后，`@import`指令不再推荐使用，并且在 **Sass 6.x** 版本中将被完全移除，取而代之的是使用`@use`和`@forward`指令结合模块系统进行模块化开发和导入。这样可以更好地控制依赖关系、减少样式污染和提高编译效率。但在目前较旧的 **Sass** 版本中，`@import`仍然是一种常见且有效的导入样式文件的方式。

### 混合指令

混合指令（Mixin Directives）是 **Sass** 提供的一个功能强大的特性，用于定义可重用的样式块，并在需要的地方进行调用。混合指令允许我们在样式表中创建一组样式属性的代码块，然后通过`@include`指令将这些代码块插入到其他选择器或样式块中。

混合指令的使用有一些关键点和用法：

1. **定义混合器（Mixin）**：使用`@mixin`关键字定义混合器，并给它一个名称。

   ```scss
   @mixin button {
     background-color: blue;
     color: white;
     border: none;
     padding: 10px 20px;
     border-radius: 4px;
   }
   ```

   在这个示例中，我们定义了一个名为`button`的混合器，它包含了一组用于按钮样式的属性。

1. **调用混合器**：使用`@include`关键字调用混合器，并在需要的地方插入混合器的代码块。

   ```scss
   .primary-button {
     @include button;
     font-weight: bold;
   }
   ```

   在这个示例中，我们将`button`混合器应用到`.primary-button`选择器中。调用时，混合器的代码块会被插入到`.primary-button`中，使其具有按钮样式。

1. **参数化混合器**：混合器可以接收参数，通过传递不同的参数值，可以在调用混合器时生成不同的样式。

   ```scss
   @mixin button($bg-color, $text-color) {
     background-color: $bg-color;
     color: $text-color;
     border: none;
     padding: 10px 20px;
     border-radius: 4px;
   }
   ```

   在这个示例中，我们修改了`button`混合器，使其接收两个参数`$bg-color`和`$text-color`，用于定制按钮的背景色和文字颜色。

   ```scss
   .primary-button {
     @include button(blue, white);
     font-weight: bold;
   }
   .secondary-button {
     @include button(red, black);
   }
   ```

   在这个示例中，我们通过传递不同的参数值调用`button`混合器，在`.primary-button`和`.secondary-button`选择器中分别生成不同样式的按钮。

通过混合指令，我们可以将常用的样式块抽象成混合器，并在需要的地方进行调用，提高样式代码的可维护性和可重用性。混合器也可以接收参数，可以根据不同的参数值生成不同的样式，使得代码更加灵活。混合指令使得 Sass 可以实现样式的模块化和重用，从而简化样式表的编写和维护。

需要注意的是：`@import` 和 `@include` 两者的区别，不要用混了。

### 函数指令

在 **Sass** 中，函数指令用于创建和使用可重复使用的计算和转换样式值的功能。函数指令允许我们定义自定义的函数，以及使用内置函数来处理样式的属性值。

以下是关于函数指令用法的详细介绍：

1. **自定义函数**：使用 `@function` 关键字定义一个自定义函数。

   ```scss
   @function calculate-width($container-width, $column-count) {
     @return $container-width / $column-count;
   }
   ```

   在这个示例中，我们定义了一个名为 `calculate-width` 的函数，它接收两个参数 `$container-width` 和 `$column-count`，并返回宽度的计算结果。

1. **使用函数**：在需要使用函数的地方调用它，可以将函数的返回值赋给变量，或直接在样式属性中使用。

   ```scss
   .column {
     width: calculate-width(800px, 4);
   }
   ```

   在这个示例中，我们调用了 `calculate-width` 函数，并将它的返回值应用到 `.column` 类的 `width` 属性。

1. **内置函数**：Sass 提供了一些内置函数来处理常见的样式值和运算，例如颜色操作、字符串处理、数学计算等。可以直接在样式表中使用这些内置函数，不需要自己定义。

   ```scss
   .box {
     background-color: lighten(#3498db, 20%);
     font-family: unquote('Arial, sans-serif');
     margin-top: percentage(0.5);
   }
   ```

   在这个示例中，我们使用了内置函数 `lighten()` 来将颜色值进行亮度调整，`unquote()` 函数来移除双引号，`percentage()` 函数来将数值转换为百分比。

函数指令使得 Sass 具有了更强大的样式操作能力，可以进行计算、转换和处理样式属性值，使样式表更具动态性和可扩展性。通过自定义函数和使用内置函数，我们能够编写更加灵活和功能丰富的样式表，提高开发效率和代码可读性。

**函数指令**和**混合指令**在某种程度上看着有点类似，但是**函数指令**侧重于产生一个值，多用在样式属性值上，如：`width: getWidth()`；而**混合指令**它类似于一个代码片段或模板，可以在需要的地方进行调用。混合器可以接收参数，以便在调用时生成不同的样式块，它们主要用于生成样式规则。

### 继承指令

> **@extend**：`@extend`是 **Sass** 中一个功能强大的指令，它允许样式规则继承另一个样式规则的属性，以便在编写样式时实现代码的重用和减少重复。

使用`@extend`指令，可以将一个选择器的样式规则扩展（继承）到另一个选择器上，从而将被继承选择器中的样式属性应用到目标选择器中，减少重复的样式定义。

下面是`@extend`指令的使用方法和一些关键点。

1. 基本用法：使用`@extend`将一个选择器的样式规则继承到另一个选择器上。语法为 `@extend 选择器;`。

   ```scss
   .btn {
     background-color: blue;
     color: white;
   }

   .primary-btn {
     @extend .btn;
     font-weight: bold;
   }
   ```

   在这个示例中，`.primary-btn`选择器使用了`@extend .btn;`，即将`.btn`选择器的样式规则继承到`.primary-btn`上。这样，`.primary-btn`将拥有`.btn`的所有样式属性。

1. 多个继承： `@extend`指令支持多个选择器的继承，只需逐个指定要继承的选择器即可。

   ```scss
   .highlight {
     background-color: yellow;
   }

   .warning {
     border: 2px solid red;
   }

   .error {
     @extend .highlight, .warning;
     color: white;
   }
   ```

   在这个示例中，`.error`选择器继承了`.highlight`和`.warning`选择器的样式规则，从而拥有了它们的样式属性。同时，`.error`添加了自己的`color`属性。

1. 继承限制： 虽然`@extend`指令非常有用，但要谨慎使用，因为它会生成更复杂的 CSS 结构和选择器嵌套。在使用`@extend`时，需要遵循以下几个原则：

   - 尽量在基本选择器上使用`@extend`，避免在复杂的选择器上使用，以免生成过于庞大的选择器。
   - 仅继承具有相似用途和样式的选择器，避免继承不相关的选择器。
   - 将具有公共样式的选择器提取出来，定义为基本样式，供其他选择器继承。

`@extend`指令是 Sass 中一个非常有用的功能，可以使样式表更加模块化和可维护，减少重复的样式定义。但需要注意合理使用，以避免生成过于复杂的 CSS 结构和选择器嵌套。

### 媒体查询

> **@media**：在 **Sass** 中，`@media`指令是用于创建响应式样式的条件语句，它可以根据设备的特性和屏幕条件来应用不同的样式规则。`@media`指令可以嵌套在 Sass 样式表中，让我们能够更灵活地管理和组织样式。

以下是关于 **Sass** 中`@media`指令的详细介绍：

1. 基本语法：在 **Sass** 中，使用`@media`指令的语法与在普通 **CSS** 中一样。可以通过嵌套方式将`@media`指令与其他样式规则结合在一起。

   ```scss
   .container {
     width: 100%;

     @media (min-width: 768px) {
       width: 80%;
     }
   }
   ```

   编译输出结果：

   ```scss
   .container {
     width: 100%;
   }
   @media (min-width: 768px) {
     .container {
       width: 80%;
     }
   }
   ```

   在这个示例中，`.container`选择器的样式规则嵌套在`@media (min-width: 768px)`条件下，表示当视口宽度大于等于 **768px** 时，应用更改后的样式。

1. 嵌套规则：`@media`指令可以嵌套其他样式规则，以便在特定条件下应用不同的样式。

   ```scss
   .container {
     width: 100%;

     @media (min-width: 768px) {
       width: 80%;

       .inner {
         font-size: 16px;
       }
     }
   }
   ```

   在这个示例中，`.inner`选择器的样式规则嵌套在`@media`指令的条件下。这意味着当视口宽度大于等于 **768px** 时，`.inner`的样式规则将适用。

1. 媒体查询变量：**Sass** 允许我们将媒体查询条件定义为变量，以便在多个地方重复使用，增加代码的可维护性。

   ```scss
   $small-screen: '(max-width: 767px)';
   $medium-screen: '(min-width: 768px) and (max-width: 1023px)';

   @media #{$small-screen} {
     /* 样式规则 */
   }

   @media #{$medium-screen} {
     /* 样式规则 */
   }
   ```

   在这个示例中，通过定义变量 `$small-screen` 和 `$medium-screen` ，我们可以在后续的`@media`指令中重复使用它们。

1. 嵌套规则和变量结合使用：我们可以将嵌套规则和媒体查询变量结合使用，以创建更复杂的媒体查询条件和样式规则。

   ```scss
   $small-screen: '(max-width: 767px)';

   .container {
     width: 100%;

     @media #{$small-screen} {
       width: 80%;

       .inner {
         font-size: 16px;
       }
     }
   }
   ```

   在这个示例中，`$small-screen`变量定义了一个媒体查询条件，然后在`@media`指令中使用它。

`@media`指令是 **Sass** 中用于创建响应式样式的重要工具，可以根据设备的特性和屏幕条件应用不同的样式规则。结合嵌套规则、变量和其他 Sass 功能，我们能够更灵活地管理和组织响应式样式。
