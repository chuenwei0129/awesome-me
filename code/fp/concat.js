// 映射到函数式编程来看的话，运算数可以理解为**函数的入参**，运算符则可以被抽象为**一个 concat() 函数**。
// 接下来我们就以加法运算为例，演示一下这个从数学映射到代码的过程：
// **`concat()`接口宛如一条【线】，它能够将链式调用中前后相邻的两个【点】（也就是“盒子”）串联起来，进行盒子间的二元运算
const Box = (val) => ({
  val,
  concat: (box) => Box(val + box.val),
});

// 1 + 2
console.log(Box(1).concat(Box(2)));

// 2 + 3
console.log(Box(100).concat(Box(99)));

// 加法单位元
Box.empty = () => Box(0);

// 也就是说，Monoid = Semigroup + `empty()` 函数。
// concat() `**接口是对数学中的二元运算符的抽象。** `concat()`接口宛如一条【线】，它能够将链式调用中前后相邻的两个【点】（也就是“盒子”）串联起来，进行盒子间的二元运算。
// 定义一个类型为 Add 的 Monoid 盒子
const Add = (value) => ({
  value,
  // concat 接收一个类型为 Add 的 Monoid 盒子作为入参
  concat: (box) => Add(value + box.value),
});

Add.empty = () => Add(0);

// 把 Add 盒子放进 reduce 的 callback 里去
console.log(
  [1, 2, 3, 4].reduce((monoid, num) => monoid.concat(Add(num)), Add(0)),
);

// 定义一个类型为 Multi 的 Monoid 盒子
const Multi = (value) => ({
  value,
  // concat 接收一个类型为 Multi Monoid 盒子作为入参
  concat: (box) => Multi(value * box.value),
});
Multi.empty = () => Multi(1);

// n 元运算的计算起点是单位元函数 empty()
console.log(
  [1, 2, 3, 4].reduce(
    (monoid, num) => monoid.concat(Multi(num)),
    Multi.empty(),
  ),
);

// 到这里，`empty()`在实践中的作用就非常清晰了——当二元运算被拓展为 n 元运算时，我们需要 `Monoid.empty()`作为计算起点，进而规避空值的问题。
// 这两种函数消化的入参类型不同，函数体的编码实现不同，但它们的逻辑特征却高度一致：**通过多次执行二元运算，将有限的二元运算拓展为无限的 n 元运算。**

// 两两结合，循环往复，聚沙成塔——这，就是“组合”过程。
