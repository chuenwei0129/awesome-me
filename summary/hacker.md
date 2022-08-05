一个偶发的无限循环
重要程度: 4
这是一个无限循环。它永远不会结束。为什么？

let i = 0;
while (i != 10) {
  i += 0.2;
}
解决方案
那是因为 i 永远不会等于 10。

运行下面这段代码来查看 i 的 实际 值：

let i = 0;
while (i < 11) {
  i += 0.2;
  if (i > 9.8 && i < 10.2) alert( i );
}
它们中没有一个恰好是 10。

之所以发生这种情况，是因为对 0.2 这样的小数时进行加法运算时出现了精度损失。

结论：在处理小数时避免相等性检查。

为什么 6.35.toFixed(1) == 6.3？
重要程度: 4
根据文档，Math.round 和 toFixed 都将数字舍入到最接近的数字：0..4 会被舍去，而 5..9 会进一位。

例如：

alert( 1.35.toFixed(1) ); // 1.4
在下面这个类似的示例中，为什么 6.35 被舍入为 6.3 而不是 6.4？

alert( 6.35.toFixed(1) ); // 6.3
如何以正确的方式来对 6.35 进行舍入？

从 min 到 max 的随机整数
重要程度: 2
创建一个函数 randomInteger(min, max)，该函数会生成一个范围在 min 到 max 中的随机整数，包括 min 和 max。

在 min..max 范围中的所有数字的出现概率必须相同。

运行示例：

alert( randomInteger(1, 5) ); // 1
alert( randomInteger(1, 5) ); // 3
alert( randomInteger(1, 5) ); // 5
你可以使用 上一个任务 的解决方案作为基础。

解决方案
简单但错误的解决方案
最简单但错误的解决方案是生成一个范围在 min 到 max 的值，并取对其进行四舍五入后的值：

function randomInteger(min, max) {
  let rand = min + Math.random() * (max - min);
  return Math.round(rand);
}

alert( randomInteger(1, 3) );
这个函数是能起作用的，但不正确。获得边缘值 min 和 max 的概率比其他值低两倍。

如果你将上面这个例子运行多次，你会很容易看到 2 出现的频率最高。

发生这种情况是因为 Math.round() 从范围 1..3 中获得随机数，并按如下所示进行四舍五入：

values from 1    ... to 1.4999999999  become 1
values from 1.5  ... to 2.4999999999  become 2
values from 2.5  ... to 2.9999999999  become 3
现在我们可以清楚地看到 1 的值比 2 少两倍。和 3 一样。

正确的解决方案
这个题目有很多正确的解决方案。其中之一是调整取值范围的边界。为了确保相同的取值范围，我们可以生成从 0.5 到 3.5 的值，从而将所需的概率添加到取值范围的边界：

function randomInteger(min, max) {
  // 现在范围是从  (min-0.5) 到 (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

alert( randomInteger(1, 3) );
另一种方法是使用 Math.floor 来取范围从 min 到 max+1 的随机数：

function randomInteger(min, max) {
  // here rand is from min to (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

alert( randomInteger(1, 3) );
现在所有间隔都以这种方式映射：

values from 1  ... to 1.9999999999  become 1
values from 2  ... to 2.9999999999  become 2
values from 3  ... to 3.9999999999  become 3
所有间隔的长度相同，从而使最终能够均匀分配。
