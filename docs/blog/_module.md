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


协议分层的目的就是为了每一层的协议都可以被替换。
能换呀，IPV4 不是可以换成了 IPV6 么，物理层现在也有光纤双绞线无线甚至其它私有协议呀。[惊喜]

那些带我搞懂了某些概念的博客

复杂度只能转移不能消失 [飙泪笑] 单个微服务是不复杂了，微服务之间的交互变成蜘蛛网了

<!-- 命名 - 让人秒懂
变量 - 使用合理，不多不少
嵌套 - 越少越好
行数 - 合理即可。即不是奇技淫巧的 one-line 怪，又不是像整天操心你安全的妈妈，各种唠叨
原理 - 通俗易懂，最好使用大家都明白的数据结构和算法知识
写法 - 最好是 language-agnostic，即可以方便的迁移到主流编程语言 -->

Euler’s identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.

> 这里存放我的博客

- 个人编码习惯
- 这实际上是我个人编码习惯的一部分，即**对导入语句块的规范整理**。在大型项目中一个文件顶部有几十条导入语句是非常常见的，它们可能来自第三方库、UI 库、项目内工具方法、样式文件、类型，项目内工具方法可能又分成 constants、hooks、utils、config 等等。如果将这些所有类型的导入都混乱地堆放在一起，对于后续的维护无疑是灾难。因此，我通常会将这些导入按照实际意义进行组织，顺序大致是这样：

- 一般最上面会是 React；
- 第三方 UI 组件，然后是项目内封装的其他组件；
- 第三方工具库，然后是项目内封装的工具方法，具体 hooks 和 utils 等分类的顺序可以按照自己偏好来；
- 类型导入，包括第三方库的类型导入、项目内的类型导入等；
- 样式文件，`CSS-IN-JS` 方案的组件应该被放在第二条中其他组件部分。

示例如下：

```typescript
import { useEffect } from 'react'

import { Button, Dialog } from 'ui'
import { ChildComp } from './child'

import { store } from '@/store'
import { useCookie } from '@/hooks/useCookie'
import { SOME_CONSTANTS } from '@/utils/constants'

import type { FC } from 'react'
import type { Foo } from '@/typings/foo'
import type { Shared } from '@/typings/shared'

import styles from './index.module.scss'
```

- 那些困扰过我的概念
  Maybe we don't need a better program，we need a smarter person
- 心里有光，慢食三餐
- 我喜欢奋达为的可乐
- 没必要太多地去纠结这些东西，看不懂代码就去问写这个代码的人。当然现在也可以问 GPT

模仿比自己瞎琢磨高效的多

我吃了一辈子的喜之郎果冻了，心早就在外太空了，但是为了你，我愿意回到地球

唉，我才十几岁，爱情可以来的晚一点，但是外卖不行

今日限定本人全糖去冰~
飞行中，尚未找到降落点。75。再热下去我是红豆抹茶牛奶冰的身份就不保了

我想写一些可以表达心情的代码

持续保冷中……

欢迎光临我的开心

我在煮月亮你想往里面加点什么

月亮和星星会不会互道心事。

如果夜里不能吃东西，那冰箱里为什么会有灯呢？

因为冰箱里住着可乐蛋糕大西瓜、啤酒水饺冰激凌，没有灯的话，它们晚上睡觉会害怕的

可是门一关灯就灭了呀

你关上门之后，冰箱里的小家伙再偷偷开灯

<!-- 因为灯会让食物以为还是白天，不敢过期 -->

夏天

冒泡的汽水

黄昏的落日

经常趴在窗台上睡懒觉的猫咪

可爱的你

世人可爱，世事可戏

今天的心情是开口向上的抛物线，很 okଘ(੭ˊᵕˋ)੭\*

睡觉啦，帮我关一下月亮

6。“你笑起来真像好天气。”

清水煮玉是明月
天地苍生一瓮中？
明月倒映水中，伴着水面上隐隐升起的雾气。就像一块美玉丢进热水里煮一般。

道理在情绪面前一文不值

心里有光，慢食三餐

你啊得清醒得知趣

久违亦如初见，亲切又新鲜

不知所措的年纪，什么都不尽人意
开始考虑值不值得的时候，就是不值的。
自己满身灰暗，还总想给别人一些光。

总是在某个瞬间突然就丧了

像是积攒了几天的热情

拍的一声

就碎掉了

遗憾的是从来没感受过被人坚定选择的感觉。

去吹吹风吧能醒的话感冒也没关系

这世间本就是各自下雪，各人有各人的隐晦和皎洁。

我喜欢风的透彻，像能望穿的快乐。

缘分

可遇不可求

预设的期待

更加自在

四月的天空如果不肯裂帛，

五月的袷衣如何起头？

一定要文采斐然吗，我磕磕绊绊，叙意不清的语句也是爱；一定要娓娓道来吗我词不达意语未由衷的叙述也是爱；一定要妙语连珠吗我支支吾吾含糊其辞的言语也是爱啊。

我喜欢奋达为的可乐

脚下的影子从来不肯试着像谁

影子，投射，类，穿着

​ “我生来就是高山而非溪流，我欲于群峰之巅俯视平庸的沟壑。我生来就是人杰而非草芥，我站在伟人之肩藐视卑微的懦夫！” ​

如果将无意义表现为逻辑颠倒不通的话，那便是哲学上的自杀

明明脑子里面有很好的句子，写到纸上却感到词不达意
