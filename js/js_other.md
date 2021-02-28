3.単例设计模式命名的出来
>每一个命名空/问部是JS中の bject这个内置基类的实例,而实例之
是相互独立互不开的,所以我们称它为”例:単独的实例

在単例设计模型中,OBU不仅仅是象名,它称为”命名空
Name Space",把描述事务的属性存放到命名空间中,多个命名空间是
独立分开的,互不冲突
2.作用
大=>把描述同一件事务的属性和特征遊行"分组、归类"(存信在同一个雄 内存空同中),因此避免了全局变量之间的冲突和污染

1. 使用 const 声明的对象是可以被修改的
2. 计算属性
3. 属性值简写
4. 属性名称限制
5. 属性存在性测试，“in” 操作符
对象赋值 undefined 与 in操作符的对比 ，in 可以便利圆形脸
它们存储属性（键值对），其中：

属性的键必须是字符串或者 symbol（通常是字符串）。
值可以是任何类型。
我们可以用下面的方法访问属性：

点符号: obj.property。
方括号 obj["property"]，方括号允许从变量中获取键，例如 obj[varWithKey]。
其他操作：

删除属性：delete obj.prop。
检查是否存在给定键的属性："key" in obj。
遍历对象：for(let key in obj) 循环。

对象引用和复制
let a = {};
let b = a; // 复制引用

alert( a == b ); // true，都引用同一对象
alert( a === b ); // true

function User() {
  alert(new.target);
}

// 不带 "new"：
User(); // undefined

// 带 "new"：
new User(); // function User { ... }

function User(name) {
  if (!new.target) { // 如果你没有通过 new 运行我
    return new User(name); // ……我会给你添加 new
  }

  this.name = name;
}

let john = User("John"); // 将调用重定向到新用户
alert(john.name); // John

构造器的 return

带有对象的 return 返回该对象，在所有其他情况下返回 this。

省略括号
顺便说一下，如果没有参数，我们可以省略 new 后的括号：

let user = new User; // <-- 没有参数
// 等同于
let user = new User();
这里省略括号不被认为是一种“好风格”，但是规范允许使用该语法

可选链 "?."

可选链 ?. 语法有三种形式：

obj?.prop —— 如果 obj 存在则返回 obj.prop，否则返回 undefined。
obj?.[prop] —— 如果 obj 存在则返回 obj[prop]，否则返回 undefined。
变量
obj.method?.() —— 如果 obj.method 存在则调用 obj.method()，否则返回 undefined。


let id = Symbol("id");

let user = {
  name: "John",
  [id]: 123 // 而不是 "id"：123
};

Object.assign 会同时复制字符串和 symbol 属性

Symbol 是唯一标识符的基本类型

Symbol 是使用带有可选描述（name）的 Symbol() 调用创建的。

Symbol 总是不同的值，即使它们有相同的名字。如果我们希望同名的 Symbol 相等，那么我们应该使用全局注册表：Symbol.for(key) 返回（如果需要的话则创建）一个以 key 作为名字的全局 Symbol。使用 Symbol.for 多次调用 key 相同的 Symbol 时，返回的就是同一个 Symbol。

Symbol 有两个主要的使用场景：

“隐藏” 对象属性。 如果我们想要向“属于”另一个脚本或者库的对象添加一个属性，我们可以创建一个 Symbol 并使用它作为属性的键。Symbol 属性不会出现在 for..in 中，因此它不会意外地被与其他属性一起处理。并且，它不会被直接访问，因为另一个脚本没有我们的 symbol。因此，该属性将受到保护，防止被意外使用或重写。

因此我们可以使用 Symbol 属性“秘密地”将一些东西隐藏到我们需要的对象中，但其他地方看不到它。

JavaScript 使用了许多系统 Symbol，这些 Symbol 可以作为 Symbol.* 访问。我们可以使用它们来改变一些内置行为。例如，在本教程的后面部分，我们将使用 Symbol.iterator 来进行 迭代 操作，使用 Symbol.toPrimitive 来设置 对象原始值的转换 等等。

let str = "Hello";

str.test = 5;

alert(str.test);

为什么？让我们看看在 (*) 那一行到底发生了什么：

当访问 str 的属性时，一个“对象包装器”被创建了。
在严格模式下，向其写入内容会报错。
否则，将继续执行带有属性的操作，该对象将获得 test 属性，但是此后，“对象包装器”将消失，因此在最后一行，str 并没有该属性的踪迹。

字符串
数字

会向上或向下舍入到最接近的值，类似于 Math.round

数字
num.toFixed(precision)
math.round


Math.random()
返回一个从 0 到 1 的随机数（不包括 1）

alert( Math.random() ); // 0.1234567894322
alert( Math.random() ); // 0.5435252343232
alert( Math.random() ); // ... (任何随机数)
Math.max(a, b, c...) / Math.min(a, b, c...)
从任意数量的参数中返回最大/最小值。

alert( Math.max(3, 5, -10, 0, 1) ); // 5
alert( Math.min(1, 2) ); // 1
Math.pow(n, power)
math.random

测试：isFinite 和 isNaN

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

function random(min, max) {
  return min + Math.random() * (max - min);
}

alert( random(1, 5) );
alert( random(1, 5) );
alert( random(1, 5) );

从 min 到 max 的随机整数

按位（bitwise）NOT 技巧

实际上，这意味着一件很简单的事儿：对于 32-bit 整数，~n 等于 -(n+1)。

有 3 种类型的引号。反引号允许字符串跨越多行并可以使用 ${…} 在字符串中嵌入表达式。
JavaScript 中的字符串使用的是 UTF-16 编码。
我们可以使用像 \n 这样的特殊字符或通过使用 \u... 来操作它们的 unicode 进行字符插入。
获取字符时，使用 []。
获取子字符串，使用 slice 或 substring。
字符串的大/小写转换，使用：toLowerCase/toUpperCase。
查找子字符串时，使用 indexOf 或 includes/startsWith/endsWith 进行简单检查。
根据语言比较字符串时使用 localeCompare，否则将按字符代码进行比较。

JavaScript 中的数组既可以用作队列，也可以用作栈。它们允许你从首端/末端来添加/删除元素。

这在计算机科学中，允许这样的操作的数据结构被称为 双端队列（deque）。

push 和 unshift 方法都可以一次添加多个元素

push/pop 方法运行的比较快，而 shift/unshift 比较慢

for..in 循环适用于普通对象，并且做了对应的优化。但是不适用于数组，因此速度要慢 10-100 倍。当然即使是这样也依然非常快。只有在遇到瓶颈时可能会有问题。但是我们仍然应该了解这其中的不同

数组是一种特殊的对象，适用于存储和管理有序的数据项。

声明:

// 方括号 (常见用法)
let arr = [item1, item2...];

// new Array (极其少见)
let arr = new Array(item1, item2...);
调用 new Array(number) 会创建一个给定长度的数组，但不含有任何项。

length 属性是数组的长度，准确地说，它是数组最后一个数字索引值加一。它由数组方法自动调整。

如果我们手动缩短 length，那么数组就会被截断。

我们可以通过下列操作以双端队列的方式使用数组：

push(...items) 在末端添加 items 项。
pop() 从末端移除并返回该元素。
shift() 从首端移除并返回该元素。
unshift(...items) 从首端添加 items 项。
遍历数组的元素：

for (let i=0; i<arr.length; i++) — 运行得最快，可兼容旧版本浏览器。
for (let item of arr) — 现代语法，只能访问 items。
for (let i in arr) — 永远不要用这个。
比较数组时，不要使用 == 运算符（当然也不要使用 > 和 < 等运算符），因为它们不会对数组进行特殊处理。它们通常会像处理任意对象那样处理数组，这通常不是我们想要的。

但是，我们可以使用 for..of 循环来逐项比较数组。

在下一章 数组方法 中，我们将继续学习数组，学习更多添加、移除、提取元素和数组排序的方法。

最大子数组

reduce
数组方法备忘单：

添加/删除元素：

push(...items) —— 向尾端添加元素，
pop() —— 从尾端提取一个元素，
shift() —— 从首端提取一个元素，
unshift(...items) —— 向首端添加元素，
splice(pos, deleteCount, ...items) —— 从 pos 开始删除 deleteCount 个元素，并插入 items。
slice(start, end) —— 创建一个新数组，将从索引 start 到索引 end（但不包括 end）的元素复制进去。
concat(...items) —— 返回一个新数组：复制当前数组的所有元素，并向其中添加 items。如果 items 中的任意一项是一个数组，那么就取其元素。
搜索元素：

indexOf/lastIndexOf(item, pos) —— 从索引 pos 开始搜索 item，搜索到则返回该项的索引，否则返回 -1。
includes(value) —— 如果数组有 value，则返回 true，否则返回 false。
find/filter(func) —— 通过 func 过滤元素，返回使 func 返回 true 的第一个值/所有值。
findIndex 和 find 类似，但返回索引而不是值。
遍历元素：

forEach(func) —— 对每个元素都调用 func，不返回任何内容。
转换数组：

map(func) —— 根据对每个元素调用 func 的结果创建一个新数组。
sort(func) —— 对数组进行原位（in-place）排序，然后返回它。
reverse() —— 原位（in-place）反转数组，然后返回它。
split/join —— 将字符串转换为数组并返回。
reduce/reduceRight(func, initial) —— 通过对每个元素调用 func 计算数组上的单个值，并在调用之间传递中间结果。
其他：

Array.isArray(arr) 检查 arr 是否是一个数组。
请注意，sort，reverse 和 splice 方法修改的是数组本身。

这些是最常用的方法，它们覆盖 99％ 的用例。但是还有其他几个：

arr.some(fn)/arr.every(fn) 检查数组。

与 map 类似，对数组的每个元素调用函数 fn。如果任何/所有结果为 true，则返回 true，否则返回 false。

这两个方法的行为类似于 || 和 && 运算符：如果 fn 返回一个真值，arr.some() 立即返回 true 并停止迭代其余数组项；如果 fn 返回一个假值，arr.every() 立即返回 false 并停止对其余数组项的迭代。

我们可以使用 every 来比较数组：

function arraysEqual(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
}

alert( arraysEqual([1, 2], [1, 2])); // true
arr.fill(value, start, end) —— 从索引 start 到 end，用重复的 value 填充数组。

arr.copyWithin(target, start, end) —— 将从位置 start 到 end 的所有元素复制到 自身 的 target 位置（覆盖现有元素）。

arr.flat(depth)/arr.flatMap(fn) 从多维数组创建一个新的扁平数组。

arr.of(element0[, element1[, …[, elementN]]]) 基于可变数量的参数创建一个新的 Array 实例，而不需要考虑参数的数量或类型。

可迭代（Iterable） 对象是数组的泛化。这个概念是说任何对象都可以被定制为可在 for..of 循环中使用的对象。

可迭代（iterable）和类数组（array-like）
有两个看起来很相似，但又有很大不同的正式术语。请你确保正确地掌握它们，以免造成混淆。

Iterable 如上所述，是实现了 Symbol.iterator 方法的对象。
Array-like 是有索引和 length 属性的对象，所以它们看起来很像数组。

Array.from
有一个全局方法 Array.from 可以接受一个可迭代或类数组的值，并从中获取一个“真正的”数组。然后我们就可以对其调用数组方法了。

可以应用 for..of 的对象被称为 可迭代的。

技术上来说，可迭代对象必须实现 Symbol.iterator 方法。
obj[Symbol.iterator]() 的结果被称为 迭代器（iterator）。由它处理进一步的迭代过程。
一个迭代器必须有 next() 方法，它返回一个 {done: Boolean, value: any} 对象，这里 done:true 表明迭代结束，否则 value 就是下一个值。
Symbol.iterator 方法会被 for..of 自动调用，但我们也可以直接调用它。
内置的可迭代对象例如字符串和数组，都实现了 Symbol.iterator。
字符串迭代器能够识别代理对（surrogate pair）。（译注：代理对也就是 UTF-16 扩展字符。）

map
Map 是一个带键的数据项的集合，就像一个 Object 一样。 但是它们最大的差别是 Map 允许任何类型的键（key）。

它的方法和属性如下：

new Map() —— 创建 map。
map.set(key, value) —— 根据键存储值。
map.get(key) —— 根据键来返回值，如果 map 中不存在对应的 key，则返回 undefined。
map.has(key) —— 如果 key 存在则返回 true，否则返回 false。
map.delete(key) —— 删除指定键的值。
map.clear() —— 清空 map。
map.size —— 返回当前元素个数。


每一次 map.set 调用都会返回 map 本身，所以我们可以进行“链式”调用

如果要在 map 里使用循环，可以使用以下三个方法：

map.keys() —— 遍历并返回所有的键（returns an iterable for keys），
map.values() —— 遍历并返回所有的值（returns an iterable for values），
map.entries() —— 遍历并返回所有的实体（returns an iterable for entries）[key, value]，for..of 在默认情况下使用的就是这个

Object.entries：从对象创建 Map

Set —— 是一组唯一值的集合。

方法和属性：

new Set([iterable]) —— 创建 set，可选择带有 iterable（例如数组）来进行初始化。
set.add(value) —— 添加一个值（如果 value 存在则不做任何修改），返回 set 本身。
set.delete(value) —— 删除值，如果 value 在这个方法调用的时候存在则返回 true ，否则返回 false。
set.has(value) —— 如果 value 在 set 中，返回 true，否则返回 false。
set.clear() —— 清空 set。
set.size —— 元素的个数。
在 Map 和 Set 中迭代总是按照值插入的顺序进行的，所以我们不能说这些集合是无序的，但是我们不能对元素进行重新排序，也不能直接按其编号来获取元素。

后是目标对象。没错，同一个值在参数里出现了两次。

forEach 的回调函数有三个参数，是为了与 Map 兼容。当然，这看起来确实有些奇怪。但是这对在特定情况下轻松地用 Set 代替 Map 很有帮助，反之亦然。

Map 中用于迭代的方法在 Set 中也同样支持：

set.keys() —— 遍历并返回所有的值（returns an iterable object for values），
set.values() —— 与 set.keys() 作用相同，这是为了兼容 Map，
set.entries() —— 遍历并返回所有的实体（returns an iterable object for entries）[value, value]，它的存在也是为了兼容 Map

WeakMap 和 Map 的第一个不同点就是，WeakMap 的键必须是对象，不能是原始值：
如果把一个对象放入到数组中，那么只要这个数组存在，那么这个对象也就存在，即使没有其他对该对象的引用。

当一个函数的结果需要被记住（“缓存”），这样在后续的对同一个对象的调用时，就可以重用这个被缓存的结果

Object.keys，values，entries

结构赋值

new Date();
getTime()
Date.now()

json toJSON
JSON 是语言无关的纯数据规范，因此一些特定于 JavaScript 的对象属性会被 JSON.stringify 跳过。

即：

函数属性（方法）。
Symbol 类型的属性。
存储 undefined 的属性。

连标
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

我们可以在 next 之外，再添加 prev 属性来引用前一个元素，以便轻松地往回移动。
我们还可以添加一个名为 tail 的变量，该变量引用链表的最后一个元素（并在从末尾添加/删除元素时对该引用进行更新）。
……数据结构可能会根据我们的需求而变化。

属性 “length” 默认值

属性 数组 包装对象区别

let sayHi = function func(who) {
  alert(`Hello, ${who}`);
};
外部读不到

但是如果我们使用 new Function 创建一个函数，那么该函数的 [[Environment]] 并不指向当前的词法环境，而是指向全局环境。

setTimeout 和 setInterval

箭头函数：

没有 this
没有 arguments
不能使用 new 进行调用
它们也没有 super，但目前我们还没有学到它。我们将在 类继承 一章中学习它

类细节

