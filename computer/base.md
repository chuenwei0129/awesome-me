# 计算机知识图谱（一）<!-- omit in toc -->

***👀 TIPS: 二级标题可返回目录***

<!-- 没有银弹，不要想要用一句话描述整个世界。 -->
---

> ## 目录

- [图灵机](#图灵机)
  - [参考资料](#参考资料)
  - [读书笔记](#读书笔记)
  - [总结](#总结)
  - [拓展：罗素悖论](#拓展罗素悖论)
  - [拓展：停机问题](#拓展停机问题)
- [CPU 的工作原理是什么？](#cpu-的工作原理是什么)
- [计算机编程语言](#计算机编程语言)
- [计算机系统 64 位 32 位指的是什么？](#计算机系统-64-位-32-位指的是什么)
- [复杂指令集 CISC 和精简指令集 RISC](#复杂指令集-cisc-和精简指令集-risc)
- [多核 CPU 和多个 CPU 有何区别？](#多核-cpu-和多个-cpu-有何区别)
- [CPU 的 4 核 8 线程什么意思？](#cpu-的-4-核-8-线程什么意思)
- [CPU 核数与线程数有什么关系？](#cpu-核数与线程数有什么关系)
- [CPU 空闲时在干嘛？](#cpu-空闲时在干嘛)
- [计算机是如何启动的？](#计算机是如何启动的)
- [数据结构是如何装入 CPU 寄存器的？](#数据结构是如何装入-cpu-寄存器的)
- [不懂 CPU 如何读写内存还敢说自己是程序员？](#不懂-cpu-如何读写内存还敢说自己是程序员)
- [CPU内部各个部件的时延大概是多少？（皮秒，纳秒）?](#cpu内部各个部件的时延大概是多少皮秒纳秒)
- [函数调用带来的 cache miss 会对 cpu 性能带来多大的影响？](#函数调用带来的-cache-miss-会对-cpu-性能带来多大的影响)
- [shell、操作系统、内核是一个东西吗？](#shell操作系统内核是一个东西吗)
- [内核态是指一个特殊的进程，还是指进程的一种特殊状态？](#内核态是指一个特殊的进程还是指进程的一种特殊状态)
- [程序？进程？傻傻分不清](#程序进程傻傻分不清)
- [线程和进程的区别是什么？](#线程和进程的区别是什么)
- [如何评价「线程的本质就是一个正在运行的函数」?](#如何评价线程的本质就是一个正在运行的函数)
- [线程间到底共享了哪些进程资源](#线程间到底共享了哪些进程资源)
- [进程切换与线程切换的区别？](#进程切换与线程切换的区别)
- [线程崩溃是否会造成进程崩溃？](#线程崩溃是否会造成进程崩溃)
- [有了线程，为什么还要有协程？](#有了线程为什么还要有协程)
- [协程的好处有哪些？](#协程的好处有哪些)
- [函数运行时在内存中是什么样子？](#函数运行时在内存中是什么样子)
- [既然每个程序占用的内存都是操作系统管理的，为什么内存泄漏还是个问题？](#既然每个程序占用的内存都是操作系统管理的为什么内存泄漏还是个问题)
- [100% 弄明白 5 种 IO 模型](#100-弄明白-5-种-io-模型)
- [编译器是如何工作的](#编译器是如何工作的)
- [回调函数（callback）是什么？](#回调函数callback是什么)
- [基于 IEEE 754 标准的双精度 64 位的浮点数](#基于-ieee-754-标准的双精度-64-位的浮点数)
- [位运算](#位运算)
  - [进制转换](#进制转换)
  - [原码、反码、补码](#原码反码补码)
- [计算机为什么需要十六进制？](#计算机为什么需要十六进制)

## [图灵机](#目录)

### 参考资料

- [图灵机的解释](https://mp.weixin.qq.com/s/oKrsznBAumrNvz4_xtktXw)
- [什么是图灵完备？](https://www.zhihu.com/question/20115374/answer/288346717)
- [为什么所有编程语言都是数据+指令?](https://www.bilibili.com/video/BV1Za411t7c6)

### 读书笔记

> **数学运算的本质特征**：

1. 在每一步中，只需要关注少数符号。
2. 每一步采取的行动，仅仅取决于当前的运算符号、计算人当前的记忆状态。

**运算行为过程中的人，是完全可以由机器取代的**。这就是图灵最初给出的，自动运算机器的抽象逻辑归纳，也是用来证明判定问题不存在算法的方法：**如果一个问题无法用图灵机来完成，那么可以说，没有任何算法程序可以解决这个问题。也就是说，凡是能用算法方法解决的问题，也一定能用图灵机解决。**

> **图灵完备**

在可计算性理论，如果一系列操作数据的规则（如指令集、编程语言、细胞自动机）可以用来模拟任何图灵机，那么它是图灵完备的。———— 维基百科

> **Brainfuck is fully Turing-complete.**

`Brainfuck` 的工作机制与图灵机高度一致。

首先它存储数据的方式是一个不限长的一维整数数组，里面的数值全部初始化为 0。此外，有一数据指针，每一时刻都指向数组的某一任意元素。指针可以向左/右移动，也可以读取/修改当前值。

语言里的 8 个有效字符分别是：

- `>` 指针向右移动一格
- `<` 指针向左移动一格
- `+` 使指针当前格数值加一
- `-` 使指针当前格数值减一
- `.` 把当前格数值按 ASCII 表输出到终端
- `,` 从终端接受一 byte 的数据，存储其 ASCII 数值到当前格
- `[` 当指针当前值为 0 时，程序跳转至与之对应的 `]` 之后；否则程序正常执行
- `]` 程序跳转回与之对应的 `[` 处

有了这些工具，我们可以很快做出一个计算乘法的程序。因为 ASCII 表中 'A' 对应的值为 65，可以使用 `5 * 13` 算出 65 并输出得到字符 'A'。

```bf
+++++

[
>+++++++++++++
<-
]

>.
```

**👟 解释：** 把指针初始处的格子命名为 `cell 0`，`cell 0` 右边的那个格子命名为 `cell 1`。那么第一句将其递增 5 次变为 5。然后，循环执行“右移指针，递增 13 次， 左移指针，递减 1 次”。当 `cell 0` 的值最终被递减为 0 的时候，循环结束。此时 `cell 1` 的值执行了 5 次“递增 13 次”的操作，即 65。指针右移至 `cell 1`，输出此格子，则在终端会看到 'A'。

**🐟 拓展：** *brainfuck 还有一个用处，一门新语言功能语法很复杂，要用数学证明的方式确定性说明它图灵完备会很麻烦，但只要用这门新语言实现一个 brainfuck 的解释器，那么就必然证明了是图灵完备的*

### 总结

图灵机解决了几个问题：

1. **可计算性问题**。一个数是否是可计算的，称为可计算数。可计算数只是实数的一部分，大多数实数都是不可计算的。（通用计算机）
2. **可判定性问题**。是否存在通用的过程，判断某个公式是可以证明的。（停机问题）
3. **人类计算者与计算机等价**。通过图灵测试判定计算机的智能。（人工智能）

### 拓展：罗素悖论

理发师悖论由哲学家罗素在 1903 年提出，也称为罗素悖论。有一个理发师打广告，说：“我只给本城所有不给自己刮脸的人刮脸。”

问题是：理发师能不能给他自己刮脸呢？如果他不给自己刮脸，他就属于“不给自己刮脸的人”；如果他给自己刮脸，他就属于“给自己刮脸的人”，他就不该给自己刮脸。

在理发师悖论的基础上，罗素构建了一个“集合” S： S 由一切不是自身元素的集合组成。然后，罗素问：S 是否属于 S 呢？根据排中律，一个元素或者属于某个集合，或者不属于某个集合。因此，对于一个给定的集合，某个元素或者属于该集合，或者不属于该集合。

但对罗素提出的这个“集合” S 是否属于 S，却没有那么容易判断：如果 S 属于 S，根据 S 的定义，S 就不属于 S；反之，如果 S 不属于 S，同样根据定义，S 就属于 S。

### 拓展：停机问题

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/SCR-20220412-h59.png)

## [CPU 的工作原理是什么？](#目录)

- [你管这破玩意叫 CPU ？](https://zhuanlan.zhihu.com/p/367927405)
- [CPU 的工作原理是什么？](https://www.zhihu.com/question/40571490)

## [计算机编程语言](#目录)

> [你管这破玩意叫编程语言？](https://zhuanlan.zhihu.com/p/359941312)

## [计算机系统 64 位 32 位指的是什么？](#目录)

<https://www.youtube.com/watch?v=Wu2A4fpFzgs>

## [复杂指令集 CISC 和精简指令集 RISC](#目录)

我们可以继续举个例子，比如说我们要命令一个人吃饭，那么我们应该怎么命令呢？我们可以直接对他下达“吃饭”的命令，也可以命令他“先拿勺子，然后舀起一勺饭，然后张嘴，然后送到嘴里，最后咽下去”。

从这里可以看到，对于命令别人做事这样一件事情，不同的人有不同的理解，有人认为，如果我首先给接受命令的人以足够的训练，让他掌握各种复杂技能（即在硬件中实现对应的复杂功能），那么以后就可以用非常简单的命令让他去做很复杂的事情——比如只要说一句“吃饭”，他就会吃饭。

但是也有人认为这样会让事情变的太复杂，毕竟接受命令的人要做的事情很复杂，如果你这时候想让他吃菜怎么办？难道继续训练他吃菜的方法？我们为什么不可以把事情分为许多非常基本的步骤，这样只需要接受命令的人懂得很少的基本技能，就可以完成同样的工作，无非是下达命令的人稍微累一点——比如现在我要他吃菜，只需要把刚刚吃饭命令里的“舀起一勺饭”改成“舀起一勺菜”，问题就解决了，多么简单。这就是“复杂指令集”和“精简指令集”的逻辑区别。

- [分不清ARM和X86架构，别跟我说你懂CPU！](https://zhuanlan.zhihu.com/p/21266987)
- [你管这破玩意叫精简指令集？](https://zhuanlan.zhihu.com/p/384606064)
- [你管这破玩意叫复杂指令集？](https://zhuanlan.zhihu.com/p/375844125)

## [多核 CPU 和多个 CPU 有何区别？](#目录)

多核 CPU 和多 Die 乃至多路 CPU，**对操作系统等来看，区别不大，BIOS 都报告了同样多的很多 CPU 供他们调度。** 区别主要在于性能上面，**多核 CPU 性能最好**，但成本最高；多 CPU 成本小，便宜，但性能相对较差。

> <https://zhuanlan.zhihu.com/p/85819786>

## [CPU 的 4 核 8 线程什么意思？](#目录)

那是 CPU 说你可以把我认为有 8 个独立工作的单核 CPU 的意思，4 核代表我真的由 4 个可以实际独立工作的单核 CPU 组成，8 线程代表 CPU 说你可以把我认为我是由 8 个可以独立工作的单核 CPU，但是实际上多出来 4 个是我一个人干两个人的活，用的时候小心一点。

## [CPU 核数与线程数有什么关系？](#目录)

CPU 的核心数和线程个数没有什么必然的关系。

**“线程是为那些不懂状态机的人准备的”**，这句话在单核时代有它的道理，因为在单核时代，所有的任务都不是在同时向前推进，而是“交错”前进，A 前进一点，然后 B 前进一点，线程并不是实现这种“伪并行”唯一的方法，状态机也可以。

但在多核时代，这句话就不再适用了，**对于大多数程序员来说多进程多线程几乎是充分利用多核资源的唯一方法。**

> <https://zhuanlan.zhihu.com/p/391588682>

## [CPU 空闲时在干嘛？](#目录)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/SCR-20220418-eaz.png)

> <https://zhuanlan.zhihu.com/p/356447262>

## [计算机是如何启动的？](#目录)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/SCR-20220412-g4a.png)

> <https://www.zhihu.com/question/40831686>

## [数据结构是如何装入 CPU 寄存器的？](#目录)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/SCR-20220418-ef4.png)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/SCR-20220418-eft.png)

- <https://zhuanlan.zhihu.com/p/401956825>
- [程序员应如何理解CPU：上篇](https://mp.weixin.qq.com/s?__biz=Mzg4OTYzODM4Mw==&mid=2247485656&idx=1&sn=1d5659355934d6ad5d4ea0a5be8b6573&chksm=cfe99458f89e1d4e14201dee281ef71c971cae46ea7e2e68bbc06a64fb22f962daa6aabc4988&scene=178&cur_album_id=1923404049802985480#rd)
- [程序员应如何理解CPU：下篇](https://mp.weixin.qq.com/s?__biz=Mzg4OTYzODM4Mw==&mid=2247485657&idx=1&sn=16189b162f7bbc49934cb5561c34920f&chksm=cfe99459f89e1d4fb92ea732f8e9c2b4cf7e88ad2d5650d174266247a798bd622ae1461cda3d&scene=178&cur_album_id=1923404049802985480#rd)

## [不懂 CPU 如何读写内存还敢说自己是程序员？](#目录)

> <https://zhuanlan.zhihu.com/p/390117048>

## [CPU内部各个部件的时延大概是多少？（皮秒，纳秒）?](#目录)

> <https://www.zhihu.com/question/488790905>

## [函数调用带来的 cache miss 会对 cpu 性能带来多大的影响？](#目录)

> <https://www.zhihu.com/question/30595783>

## [shell、操作系统、内核是一个东西吗？](#目录)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/SCR-20220418-eno.png)

> <https://www.zhihu.com/question/37695460>

## [内核态是指一个特殊的进程，还是指进程的一种特殊状态？](#目录)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/SCR-20220418-est.png)

> <https://www.zhihu.com/question/40147261>

## [程序？进程？傻傻分不清](#目录)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/SCR-20220418-fb1.png)

> <https://mp.weixin.qq.com/s?__biz=Mzg4OTYzODM4Mw==&mid=2247485647&idx=1&sn=3336b441482736b4e9a2b32f9d272a5b&source=41#wechat_redirect>

## [线程和进程的区别是什么？](#目录)

> **进程是资源分配的最小单位，线程是 CPU 调度的最小单位**

进程和线程都是一个时间段的描述，是 CPU 工作时间段的描述。是运行中的程序指令的一种描述，这需要与程序中的代码区别开来。

> <https://www.zhihu.com/question/25532384>

## [如何评价「线程的本质就是一个正在运行的函数」?](#目录)

> <https://www.zhihu.com/question/469947035>

## [线程间到底共享了哪些进程资源](#目录)

> <https://zhuanlan.zhihu.com/p/352707156>

## [进程切换与线程切换的区别？](#目录)

> <https://mp.weixin.qq.com/s?__biz=Mzg4OTYzODM4Mw==&mid=2247485646&idx=1&sn=ab57d6e2e66affefc104e04740356b39&chksm=cfe9944ef89e1d58a87c295cf1c54f78c39238214405b446c8bf4f4371fc29e0fd8d2b3cf9a6&cur_album_id=1923404049802985480&scene=190#rd>

## [线程崩溃是否会造成进程崩溃？](#目录)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/SCR-20220418-fgh.png)

> <https://www.zhihu.com/question/22397613>

## [有了线程，为什么还要有协程？](#目录)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/SCR-20220418-fq3.png)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/SCR-20220418-fks.png)

> <https://www.zhihu.com/question/504791946>

## [协程的好处有哪些？](#目录)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/SCR-20220418-fwh.png)

> <https://www.zhihu.com/question/20511233>

## [函数运行时在内存中是什么样子？](#目录)

> <https://zhuanlan.zhihu.com/p/339866296>

## [既然每个程序占用的内存都是操作系统管理的，为什么内存泄漏还是个问题？](#目录)

- [既然每个程序占用的内存都是操作系统管理的，为什么内存泄漏还是个问题？](https://www.zhihu.com/question/400104113)
- [程序员应如何理解内存：上篇](https://mp.weixin.qq.com/s?__biz=Mzg4OTYzODM4Mw==&mid=2247485653&idx=1&sn=24a27455af32fdf97f6787e4a29e856a&chksm=cfe99455f89e1d439f17ad9861e37ed9e908cde24a4e96b50a3fefd72f252ef790b7718a75b6&cur_album_id=1923404049802985480&scene=189#wechat_redirect)
- [程序员应如何理解内存：中篇](https://mp.weixin.qq.com/s?__biz=Mzg4OTYzODM4Mw==&mid=2247485654&idx=1&sn=78f9b5ab2de0bcafac16d377914ce32a&source=41#wechat_redirect)
- [程序员应如何理解内存：下篇](https://mp.weixin.qq.com/s?__biz=Mzg4OTYzODM4Mw==&mid=2247485655&idx=1&sn=5d757e85565fdd61c58321eccf2dfb83&source=41#wechat_redirect)
- [你管这破玩意叫 mmap？](https://zhuanlan.zhihu.com/p/402835493)

## [100% 弄明白 5 种 IO 模型](#目录)

- [100% 弄明白 5 种 IO 模型](https://zhuanlan.zhihu.com/p/115912936)
- [彻底理解零拷贝](https://zhuanlan.zhihu.com/p/410391372)
- [读取文件时，程序经历了什么？](https://zhuanlan.zhihu.com/p/260375849)

## [编译器是如何工作的](#目录)

> <https://zhuanlan.zhihu.com/p/188747765>

## [回调函数（callback）是什么？](#目录)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/SCR-20220418-g6h.png)

> <https://www.zhihu.com/question/19801131>

## [基于 IEEE 754 标准的双精度 64 位的浮点数](#目录)

> **微信：**[从科学记数法到浮点数标准 IEEE 754](https://mp.weixin.qq.com/s/mf1mH-aGWgcC6v2R8ijE8A)

## [位运算](#目录)

### 进制转换

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/computer/SCR-20220408-acz.png)

### 原码、反码、补码

> 参考

- [JavaScript 中的位运算和权限设计](https://juejin.cn/post/6844903988945485837)
- [一文搞明白位运算、补码、反码、原码](https://juejin.cn/post/6844903912425259022)

## [计算机为什么需要十六进制？](#目录)

**内存是按照字节粒度来寻址的**，因此采用的数字系统必须很好的表达一个字节，也就是 8 比特，从这个角度上看 256 进制 (2^8) 是最好的，因为一个 256 进制就是表达一个字节，但还是基于可读性的原因，256 进制对于人类来说记忆负担过重，而 16 进制则刚刚好，**一个 16 进制数字表示一个字节的一半( 4 个比特)**，两个 16 进制数字正好表示一个字节。

那为什么一个字节有 8 比特而不是 7 比特或者 9 比特呢？其实答案很简单：**历史原因**
