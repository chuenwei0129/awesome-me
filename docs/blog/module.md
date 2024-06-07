怎么看都是 Node.js 的覆盖范围呀。所以在 CommonJS 发布之后，它就一直被 Node.js 所使用，沿用至今。回到本章的标题上，**CommonJS 缩写就是 CJS**。所以，这个就是 Node.js 一直以来的模块规范。

CommonJS 中定义了其需包含三项必选项和一些可选项。

##### 必选项

[](https://github.com/chuenwei0129/demos/blob/main/%E8%B6%A3%E5%AD%A6%20Node.js/3-%E6%A8%A1%E5%9D%97%E6%9C%BA%E5%88%B6%E8%AF%A6%E8%A7%A3%EF%BC%9ACJS%20%E4%B8%8E%20ESM%EF%BC%88%E4%B8%8A%EF%BC%89.md#必选项)

在一个符合 CommonJS 的 JavaScript 模块中，需包含三个必选项。

**第一个，`require`**。`require` 是一个函数，这个函数有一个参数代表模块标识，它的返回值就是其所引用的外部模块所暴露的 API。

讲得直白一点，就是能通过代码 `const biu = require('boom_shakalaka')` 的形式引入 boom_shakalaka 这个模块并赋给 biu。

**第二个，模块上下文**。在一个 CommonJS 的模块上下文中，需要有满足如下条件的一些事项存在：

1.  `require` 函数，即前面提到的那个“倒霉鬼”；
2.  `exports` 对象，这是一个用于导出模块内容的通道，对应前面胰腺的“主胰管”；
3.  `module` 对象，内含该模块元信息，比如一个制度的 `id` 字段；实际上，Node.js 中的 `module` 下还含了初始的 `exports` 对象。

**第三个，模块标识**。模块标识其实就是一个字符串，用于传给 `require` 函数。

##### 可选项

[](https://github.com/chuenwei0129/demos/blob/main/%E8%B6%A3%E5%AD%A6%20Node.js/3-%E6%A8%A1%E5%9D%97%E6%9C%BA%E5%88%B6%E8%AF%A6%E8%A7%A3%EF%BC%9ACJS%20%E4%B8%8E%20ESM%EF%BC%88%E4%B8%8A%EF%BC%89.md#可选项)

可选项中，有两个未指定的约定。在必选项符合 CommonJS 规范的情况下，下面两项无论是什么都可。

1.  模块的存储方案未指定，一个模块的内容可以存在于数据库、文件系统、工厂函数，甚至于一个链接库中；
2.  实现 CommonJS 规范的模块加载器可以支持 PATH 环境变量用以加载时的寻径，但是也可以不支持。

##### 看一眼

[](https://github.com/chuenwei0129/demos/blob/main/%E8%B6%A3%E5%AD%A6%20Node.js/3-%E6%A8%A1%E5%9D%97%E6%9C%BA%E5%88%B6%E8%AF%A6%E8%A7%A3%EF%BC%9ACJS%20%E4%B8%8E%20ESM%EF%BC%88%E4%B8%8A%EF%BC%89.md#看一眼)

上面我只是用通俗的方式来讲述 CommonJS 的规范，并不严谨。若需要严谨的解释，大家可自行前往 CommonJS 的 Wiki 获取官方资料。

[wiki.commonjs.org/wiki/Module…](https://wiki.commonjs.org/wiki/Modules/1.1.1 'https://wiki.commonjs.org/wiki/Modules/1.1.1')

这里给出一个遵循 CommonJS 规范的简单样例代码，同样来自 CommonJS 的 Wiki。其是遵循 CommonJS 规范的模块，但并不代表它就是 Node.js 的模块。

```
// math.js
exports.add = function() {
    var sum = 0, i = 0, args = arguments, l = args.length;
    while (i &lt; l) {
        sum += args[i++];
    }
    return sum;
};

// increment.js
var add = require('math').add;
exports.increment = function(val) {
    return add(val, 1);
};

// program.js
var inc = require('increment').increment;
var a = 1;
inc(a); // 2

module.id == "program";
```

我们可以看到，在 `increment.js` 模块中，其加载了 `math.js` 模块（类比胰腺），`math.js` 又通过 `exports`（主胰管）将 `add`（胰液）输送到了 `increment.js`（十二指肠）中。

它的设计非常“精简”与“官方”，从语法层面就完成了对模块的定义。像 CommonJS 也好，AMD、CMD 等也罢，都是通过三方实现函数和对象来模拟模块，而 ESM 则直接通过 import 与 export 语法来导入和导出模块。只要宿主支持，那么该语法就直接能用。事实上，大多数现代浏览器都已经支持这种语法了，最新的几个大版本 Node.js 中也有了 ESM 的支持。

CommonJS 是运行时做的模块加载和运行，它可以在代码执行一半的时候以动态的方式加载，这种方法在一些静态分析的时候会造成阻碍。而 ESM 则是在模块顶部以语法的形式加载模块，完全可以做静态分析。
