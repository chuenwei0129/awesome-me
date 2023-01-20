# VSCode 内置插件 Emmet

> 这条笔记创建于: 2022 年 10 月 24 日，星期一，22: 36。

## `^` 返回上层

使用 `^` 运算符，可以爬上树的一个层次，并更改上下文

```perl
div+div>p>span+em^b
```

表现为：

```html
<div></div>
<div>
  <p><span></span><em></em></p>
  <b></b>
</div>
```

当然了，`^` 也可以多个并用，有几个 `^` 就返回几层

```perl
div+div>p>span+em^^bq
```

表现为：

```html
<div></div>
<div>
    <p><span></span><em></em></p>
</div>
<blockquote></blockquote>
```

这里要注意，最多返回到跟第一个元素同级的，以上面的例子，`^^` 已经返回到了最外层，跟 `^^^` 的效果是一样的。

## `()` 分组

`()` 操作符对复杂的子元素进行分组，简而言之，每个 `()` 中都是一个独立的子元素

适用于某个子元素比较复杂的情况

```perl
(div>dl>(dt+dd)*3)+footer>p
```

表现为：

```html
<div>
    <dl>
        <dt></dt>
        <dd></dd>
        <dt></dt>
        <dd></dd>
        <dt></dt>
        <dd></dd>
    </dl>
</div>
<footer>
    <p></p>
</footer>
```

使用分组后，可以用一个缩写来生成整个页面，不过不建议这么做。

## 自定义属性(Custom attributes)

可以使用类似 `CSS` 中的符号 `[attr="xxx"]` 向元素添加自定义属性

```perl
div[title="Hello world!" colspan=3]
```

表现为：

```html
<div title="Hello world!" colspan="3"></div>
```

需要说明的是：

方括号内的属性数量不限，如果你喜欢，可以一直加

如果不是默认属性值的话会生成插入占位 比如：`div[title colspan]` 会变成 `<div title="" colspan="">` 前提是编辑器支持这样的写法

属性值可以使用单引号或者双引号都可以，属性值如果不包含空格可以省去引号

## `$` 编号(Item numbering)

操作符可以生成重复元素，而 `$` 可以去元素进行编号。需要将 `$` 放在元素名、属性名或者属性值里

```js
ul>li.item$*5
```

表现为：

```html
<ul>
  <li class="item1"></li>
  <li class="item2"></li>
  <li class="item3"></li>
  <li class="item4"></li>
  <li class="item5"></li>
</ul>
```

如果想实现 `00x` 的格式，该怎么办呢？

可以连写多个 `$` 就可以生成带有前导的编号了

```js
ul>li.item$$$*5
```

表现为：

```html
<ul>
  <li class="item001"></li>
  <li class="item002"></li>
  <li class="item003"></li>
  <li class="item004"></li>
  <li class="item005"></li>
</ul>
```

那如果我想实现降序呢？

使用 `@` 修饰符，可以改变编号的方向以及起点

```js
ul>li.item$@-*5
```

理论上，应该表现为：

```html
<ul>
  <li class="item5"></li>
  <li class="item4"></li>
  <li class="item3"></li>
  <li class="item2"></li>
  <li class="item1"></li>
</ul>
```

如果想改变起点，不从 1 开始，可以使用 `@N` 放在 `$` 后面

```js
ul>li.item$@3*5
```

表现为：

```html
<ul>
  <li class="item3"></li>
  <li class="item4"></li>
  <li class="item5"></li>
  <li class="item6"></li>
  <li class="item7"></li>
</ul>
```

## 注意事项

> 以上所有的语法，都不能出现空格，除非是在特定的括号中。因为 Emmet 在遇到空格时，就认为已经结束，会停止解析。

更多语法：<https://docs.emmet.io/cheat-sheet/>
