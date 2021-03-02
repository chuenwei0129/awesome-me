# JavaScript 基础知识梳理(下)

## 目录

1. **[数值的扩展](#数值的相关方法)**
1. **[字符串的扩展](#字符串的相关方法)**
1. **[数组的扩展](#数组的相关方法)**
1. **[对象的扩展](#对象的相关方法)**
1. **[this, call, apply 和 bind](#this-call-apply-和-bind)**
1. **[面向对象编程](#面向对象编程)**
1. **[浅拷贝与深拷贝](#浅拷贝与深拷贝)**
1. **[异步](#异步)**

## 声明

const 命令：声明常量
var 命令：声明变量（存在变量提升）
let 命令：声明变量

const 可以改变
类似于引用类型

const 命令和 let 命令不允许重复声明
未定义就使用会报错：const 命令和 let 命令不存在变量提升
暂时性死区：在代码块内使用 const 命令和 let 命令声明变量之前，该变量都不可用
字符串解构：const [a, b, c, d, e] = "hello"
对象解构

形式：const { x, y } = { x: 1, y: 2 }
默认：const { x, y = 2 } = { x: 1 }
改名：const { x, y: z } = { x: 1, y: 2 }

数组解构

规则：数据结构具有 Iterator 接口可采用数组形式的解构赋值
形式：const [x, y] = [1, 2]
默认：const [x, y = 2] = [1]

函数参数解构

数组解构：function Func([x = 0, y = 1]) {}
对象解构：function Func({ x = 0, y = 1 } = {}) {}

应用场景

交换变量值：[x, y] = [y, x]
返回函数多个值：const [x, y, z] = Func()
定义函数参数：Func([1, 2])
提取 JSON 数据：const { name, version } = packageJson
定义函数参数默认值：function Func({ x = 1, y = 2 } = {}) {}
遍历 Map 结构：for (let [k, v] of Map) {}
输入模块指定属性和方法：const { readFile, writeFile } = require("fs")

重点难点

匹配模式：只要等号两边的模式相同，左边的变量就会被赋予对应的值
解构赋值规则：只要等号右边的值不是对象或数组，就先将其转为对象
解构默认值生效条件：属性值严格等于 undefined
解构遵循匹配模式
解构不成功时变量的值等于 undefined
undefined 和 null 无法转为对象，因此无法进行解构
字符串遍历：可通过 for-of 遍历字符串
repeat()：把字符串重复 n 次，返回新字符串
matchAll()：返回正则表达式在字符串的所有匹配
includes()：是否存在指定字符串
startsWith()：是否存在字符串头部指定字符串
endsWith()：是否存在字符串尾部指定字符串
Number.parseInt()：返回转换值的整数部分
Number.parseFloat()：返回转换值的浮点数部分
Number.isFinite()：是否为有限数值
Number.isNaN()：是否为 NaN
Number.isInteger()：是否为整数
简洁表示法：直接写入变量和函数作为对象的属性和方法({ prop, method() {} })
属性名表达式：字面量定义对象时使用[]定义键([prop]，不能与上同时使用)
方法的 name 属性：返回方法函数名

取值函数(getter)和存值函数(setter)：get/set 函数名(属性的描述对象在 get 和 set 上)
bind 返回的函数：bound 函数名
Function 构造函数返回的函数实例：anonymous

属性的可枚举性和遍历：描述对象的 enumerable
super 关键字：指向当前对象的原型对象(只能用在对象的简写方法中 method() {})
Object.is()：对比两值是否相等
Object.assign()：合并对象(浅拷贝)，返回原对象
Object.getPrototypeOf()：返回对象的原型对象
Object.setPrototypeOf()：设置对象的原型对象
**proto**：返回或设置对象的原型对象

扩展运算符(...)：转换数组为用逗号分隔的参数序列([...arr]，相当于 rest/spread 参数的逆运算)
Array.from()：转换具有 Iterator 接口的数据结构为真正数组，返回新数组

类数组对象：包含 length 的对象、Arguments 对象、NodeList 对象
可遍历对象：String、Set 结构、Map 结构、Generator 函数

Array.of()：转换一组值为真正数组，返回新数组
copyWithin()：把指定位置的成员复制到其他位置，返回原数组
find()：返回第一个符合条件的成员
findIndex()：返回第一个符合条件的成员索引值
fill()：根据指定值填充整个数组，返回原数组
keys()：返回以索引值为遍历器的对象
values()：返回以属性值为遍历器的对象
entries()：返回以索引值和属性值为遍历器的对象
数组空位：ES6 明确将数组空位转为 undefined(空位处理规不一，建议避免出现)

作者：JowayYoung
链接：https://juejin.im/post/6844903959283367950
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
计算 Unicode 字符长度：Array.from("hello").length => [..."hello"].length
使用 keys()、values()、entries()返回的遍历器对象，可用 for-of 自动遍历或 next()手动遍历

length：返回没有指定默认值的参数个数
将参数默认值设为 undefined，表明此参数可省略：Func(undefined, 1)

无参数：() => {}
单个参数：x => {}
多个参数：(x, y) => {}
解构参数：({x, y}) => {}
嵌套使用：部署管道机制
this 指向固定化

并非因为内部有绑定 this 的机制，而是根本没有自己的 this，导致内部的 this 就是外层代码块的 this
因为没有 this，因此不能用作构造函数

作者：JowayYoung
链接：https://juejin.im/post/6844903959283367950
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。函数体内的 this 是定义时所在的对象而不是使用时所在的对象
可让 this 指向固定化，这种特性很有利于封装回调函数
不可当作构造函数，因此箭头函数不可使用 new 命令
不可使用 yield 命令，因此箭头函数不能用作 Generator 函数
不可使用 Arguments 对象，此对象在函数体内不存在(可用 rest/spread 参数代替)
返回对象时必须在对象外面加上括号

作者：JowayYoung
链接：https://juejin.im/post/6844903959283367950
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。 正则方法调用变更：字符串对象的 match()、replace()、search()、split()内部调用转为调用 RegExp 实例对应的 RegExp.prototype[Symbol.方法]
定义：独一无二的值
声明：const set = Symbol(str)
入参：字符串(可选)
方法

Symbol()：创建以参数作为描述的 Symbol 值(不登记在全局环境)
Symbol.for()：创建以参数作为描述的 Symbol 值，如存在此参数则返回原有的 Symbol 值(先搜索后创建，登记在全局环境)
Symbol.keyFor()：返回已登记的 Symbol 值的描述(只能返回 Symbol.for()的 key)
Object.getOwnPropertySymbols()：返回对象中所有用作属性名的 Symbol 值的数组

内置

Symbol.hasInstance：指向一个内部方法，当其他对象使用 instanceof 运算符判断是否为此对象的实例时会调用此方法
Symbol.isConcatSpreadable：指向一个布尔，定义对象用于 Array.prototype.concat()时是否可展开
Symbol.species：指向一个构造函数，当实例对象使用自身构造函数时会调用指定的构造函数
Symbol.match：指向一个函数，当实例对象被 String.prototype.match()调用时会重新定义 match()的行为
Symbol.replace：指向一个函数，当实例对象被 String.prototype.replace()调用时会重新定义 replace()的行为
Symbol.search：指向一个函数，当实例对象被 String.prototype.search()调用时会重新定义 search()的行为
Symbol.split：指向一个函数，当实例对象被 String.prototype.split()调用时会重新定义 split()的行为
Symbol.iterator：指向一个默认遍历器方法，当实例对象执行 for-of 时会调用指定的默认遍历器
Symbol.toPrimitive：指向一个函数，当实例对象被转为原始类型的值时会返回此对象对应的原始类型值
Symbol.toStringTag：指向一个函数，当实例对象被 Object.prototype.toString()调用时其返回值会出现在 toString()返回的字符串之中表示对象的类型
Symbol.unscopables：指向一个对象，指定使用 with 时哪些属性会被 with 环境排除

作者：JowayYoung
链接：https://juejin.im/post/6844903959283367950
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。Symbol 值可通过 String()或 toString()显式转为字符串 Set
Set

定义：类似于数组的数据结构，成员值都是唯一且没有重复的值
声明：const set = new Set(arr)
入参：具有 Iterator 接口的数据结构
属性

constructor：构造函数，返回 Set
size：返回实例成员总数

方法

add()：添加值，返回实例
delete()：删除值，返回布尔
has()：检查值，返回布尔
clear()：清除所有成员
keys()：返回以属性值为遍历器的对象
values()：返回以属性值为遍历器的对象
entries()：返回以属性值和属性值为遍历器的对象
forEach()：使用回调函数遍历每个成员

作者：JowayYoung
链接：https://juejin.im/post/6844903959283367950
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。去重字符串：[...new Set(str)].join("")
去重数组：[...new Set(arr)]或 Array.from(new Set(arr))
集合数组

声明：const a = new Set(arr1)、const b = new Set(arr2)
并集：new Set([...a, ...b])
交集：new Set([...a].filter(v => b.has(v)))
差集：new Set([...a].filter(v => !b.has(v)))

映射集合

声明：let set = new Set(arr)
映射：set = new Set([...set].map(v => v _ 2))或 set = new Set(Array.from(set, v => v _ 2))

作者：JowayYoung
链接：https://juejin.im/post/6844903959283367950
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。遍历顺序：插入顺序
没有键只有值，可认为键和值两值相等
添加多个 NaN 时，只会存在一个 NaN
添加相同的对象时，会认为是不同的对象
添加值时不会发生类型转换(5 !== "5")
keys()和 values()的行为完全一致，entries()返回的遍历器同时包括键和值且两值相等

作者：JowayYoung
链接：https://juejin.im/post/6844903959283367950
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。WeakSet 成员不适合引用，它会随时消失，因此 ES6 规定 WeakSet 结构不可遍历
定义：类似于对象的数据结构，成员键是任何类型的值
声明：const set = new Map(arr)
入参：具有 Iterator 接口且每个成员都是一个双元素数组的数据结构
属性

constructor：构造函数，返回 Map
size：返回实例成员总数

方法

get()：返回键值对
set()：添加键值对，返回实例
delete()：删除键值对，返回布尔
has()：检查键值对，返回布尔
clear()：清除所有成员
keys()：返回以键为遍历器的对象
values()：返回以值为遍历器的对象
entries()：返回以键和值为遍历器的对象
forEach()：使用回调函数遍历每个成员

作者：JowayYoung
链接：https://juejin.im/post/6844903959283367950
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。遍历顺序：插入顺序
对同一个键多次赋值，后面的值将覆盖前面的值
对同一个对象的引用，被视为一个键
对同样值的两个实例，被视为两个键
键跟内存地址绑定，只要内存地址不一样就视为两个键
添加多个以 NaN 作为键时，只会存在一个以 NaN 作为键的值
Object 结构提供字符串—值的对应，Map 结构提供值—值的对应

作者：JowayYoung
链接：https://juejin.im/post/6844903959283367950
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。定义：和 Map 结构类似，成员键只能是对象
声明：const set = new WeakMap(arr)
入参：具有 Iterator 接口且每个成员都是一个双元素数组的数据结构成员键不适合引用，它会随时消失，因此 ES6 规定 WeakMap 结构不可遍历 Proxy

定义：修改某些操作的默认行为
声明：const proxy = new Proxy(target, handler)
入参

target：拦截的目标对象
handler：定制拦截行为

方法

Proxy.revocable()：返回可取消的 Proxy 实例(返回{ proxy, revoke }，通过 revoke()取消代理)

拦截方式

get()：拦截对象属性读取
set()：拦截对象属性设置，返回布尔
has()：拦截对象属性检查 k in obj，返回布尔
deleteProperty()：拦截对象属性删除 delete obj[k]，返回布尔
defineProperty()：拦截对象属性定义 Object.defineProperty()、Object.defineProperties()，返回布尔
ownKeys()：拦截对象属性遍历 for-in、Object.keys()、Object.getOwnPropertyNames()、Object.getOwnPropertySymbols()，返回数组
getOwnPropertyDescriptor()：拦截对象属性描述读取 Object.getOwnPropertyDescriptor()，返回对象
getPrototypeOf()：拦截对象原型读取 instanceof、Object.getPrototypeOf()、Object.prototype.**proto**、Object.prototype.isPrototypeOf()、Reflect.getPrototypeOf()，返回对象
setPrototypeOf()：拦截对象原型设置 Object.setPrototypeOf()，返回布尔
isExtensible()：拦截对象是否可扩展读取 Object.isExtensible()，返回布尔
preventExtensions()：拦截对象不可扩展设置 Object.preventExtensions()，返回布尔
apply()：拦截 Proxy 实例作为函数调用 proxy()、proxy.apply()、proxy.call()
construct()：拦截 Proxy 实例作为构造函数调用 new proxy()

应用场景

Proxy.revocable()：不允许直接访问对象，必须通过代理访问，一旦访问结束就收回代理权不允许再次访问
get()：读取未知属性报错、读取数组负数索引的值、封装链式操作、生成 DOM 嵌套节点
set()：数据绑定(Vue 数据绑定实现原理)、确保属性值设置符合要求、防止内部属性被外部读写
has()：隐藏内部属性不被发现、排除不符合属性条件的对象
deleteProperty()：保护内部属性不被删除
defineProperty()：阻止属性被外部定义
ownKeys()：保护内部属性不被遍历

重点难点

要使 Proxy 起作用，必须针对实例进行操作，而不是针对目标对象进行操作
没有设置任何拦截时，等同于直接通向原对象
属性被定义为不可读写/扩展/配置/枚举时，使用拦截方法会报错
代理下的目标对象，内部 this 指向 Proxy 代理

作者：JowayYoung
链接：https://juejin.im/post/6844903959283367950
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。继承
实质
ES5 实质：先创造子类实例的 this，再将父类的属性方法添加到 this 上(Parent.apply(this))
ES6 实质：先将父类实例的属性方法加到 this 上(调用 super())，再用子类构造函数修改 this 作为函数调用：只能在构造函数中调用 super()，内部 this 指向继承的当前子类(super()调用后才可在构造函数中使用 this)
作为对象调用：在普通方法中指向父类的原型对象，在静态方法中指向父类

命令

export：规定模块对外接口

默认导出：export default Person(导入时可指定模块任意名称，无需知晓内部真实名称)
单独导出：export const name = "Bruce"
按需导出：export { age, name, sex }(推荐)
改名导出：export { name as newName }

import：导入模块内部功能

默认导入：import Person from "person"
整体导入：import \* as Person from "person"
按需导入：import { age, name, sex } from "person"
改名导入：import { name as newName } from "person"
自执导入：import "person"
复合导入：import Person, { name } from "person"

复合模式：export 命令和 import 命令结合在一起写成一行，变量实质没有被导入当前模块，相当于对外转发接口，导致当前模块无法直接使用其导入变量

默认导入导出：export { default } from "person"
整体导入导出：export \* from "person"
按需导入导出：export { age, name, sex } from "person"
改名导入导出：export { name as newName } from "person"
具名改默认导入导出：export { name as default } from "person"
默认改具名导入导出：export { default as name } from "person"

作者：JowayYoung
链接：https://juejin.im/post/6844903959283367950
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。定义：整体加载模块生成一个对象，再从对象上获取需要的属性和方法进行加载(全部加载)
影响：只有运行时才能得到这个对象，导致无法在编译时做静态优化
传统加载：通过<script>进行同步或异步加载脚本

同步加载：<script src=""></script>
Defer 异步加载：<script src="" defer></script>(顺序加载，渲染完再执行)
Async 异步加载：<script src="" async></script>(乱序加载，下载完就执行)

模块加载：<script type="module" src=""></script>(默认是 Defer 异步加载)

作者：JowayYoung
链接：https://juejin.im/post/6844903959283367950
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。CommonJS 输出值的拷贝，ESM 输出值的引用

CommonJS 一旦输出一个值，模块内部的变化就影响不到这个值
ESM 是动态引用且不会缓存值，模块里的变量绑定其所在的模块，等到脚本真正执行时，再根据这个只读引用到被加载的那个模块里去取值

CommonJS 是运行时加载，ESM 是编译时加载

CommonJS 加载模块是对象(即 module.exports)，该对象只有在脚本运行完才会生成
ESM 加载模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成

作者：JowayYoung
链接：https://juejin.im/post/6844903959283367950
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。Promise

定义：包含异步操作结果的对象
状态

进行中：pending
已成功：resolved
已失败：rejected

特点

对象的状态不受外界影响
一旦状态改变就不会再变，任何时候都可得到这个结果

声明：new Promise((resolve, reject) => {})
出参

resolve：将状态从未完成变为成功，在异步操作成功时调用，并将异步操作的结果作为参数传递出去
reject：将状态从未完成变为失败，在异步操作失败时调用，并将异步操作的错误作为参数传递出去

方法

then()：分别指定 resolved 状态和 rejected 状态的回调函数

第一参数：状态变为 resolved 时调用
第二参数：状态变为 rejected 时调用(可选)

catch()：指定发生错误时的回调函数
Promise.all()：将多个实例包装成一个新实例，返回全部实例状态变更后的结果数组(齐变更再返回)

入参：具有 Iterator 接口的数据结构
成功：只有全部实例状态变成 fulfilled，最终状态才会变成 fulfilled
失败：其中一个实例状态变成 rejected，最终状态就会变成 rejected

Promise.race()：将多个实例包装成一个新实例，返回全部实例状态优先变更后的结果(先变更先返回)

入参：具有 Iterator 接口的数据结构
成功失败：哪个实例率先改变状态就返回哪个实例的状态

Promise.resolve()：将对象转为 Promise 对象(等价于 new Promise(resolve => resolve()))

Promise 实例：原封不动地返回入参
Thenable 对象：将此对象转为 Promise 对象并返回(Thenable 为包含 then()的对象，执行 then()相当于执行此对象的 then())
不具有 then()的对象：将此对象转为 Promise 对象并返回，状态为 resolved
不带参数：返回 Promise 对象，状态为 resolved

Promise.reject()：将对象转为状态为 rejected 的 Promise 对象(等价于 new Promise((resolve, reject) => reject()))

应用场景

加载图片
AJAX 转 Promise 对象

重点难点

只有异步操作的结果可决定当前状态是哪一种，其他操作都无法改变这个状态
状态改变只有两种可能：从 pending 变为 resolved、从 pending 变为 rejected
一旦新建 Promise 对象就会立即执行，无法中途取消
不设置回调函数，内部抛错不会反应到外部
当处于 pending 时，无法得知目前进展到哪一个阶段
实例状态变为 resolved 或 rejected 时，会触发 then()绑定的回调函数
resolve()和 reject()的执行总是晚于本轮循环的同步任务
then()返回新实例，其后可再调用另一个 then()
then()运行中抛出错误会被 catch()捕获
reject()的作用等同于抛出错误
实例状态已变成 resolved 时，再抛出错误是无效的，不会被捕获，等于没有抛出
实例状态的错误具有冒泡性质，会一直向后传递直到被捕获为止，错误总是会被下一个 catch()捕获
不要在 then()里定义 rejected 状态的回调函数(不使用其第二参数)
建议使用 catch()捕获错误，不要使用 then()第二个参数捕获
没有使用 catch()捕获错误，实例抛错不会传递到外层代码，即不会有任何反应
作为参数的实例定义了 catch()，一旦被 rejected 并不会触发 Promise.all()的 catch()
Promise.reject()的参数会原封不动地作为 rejected 的理由，变成后续方法的参数

作者：JowayYoung
链接：https://juejin.im/post/6844903959283367950
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。错误处理：将 await 命令 Promise 对象放到 try-catch 中(可放多个)任何一个 await 命令 Promise 对象变为 rejected 状态，整个 Async 函数都会中断执行克隆对象：const obj = { **proto**: Object.getPrototypeOf(obj1), ...obj1 }
合并对象：const obj = { ...obj1, ...obj2 }
转换字符串为对象：{ ..."hello" }
转换数组为对象：{ ...[1, 2] }
与对象解构赋值结合：const { x, ...rest/spread } = { x: 1, y: 2, z: 3 }(不能复制继承自原型对象的属性)
修改现有对象部分属性：const obj = { x: 1, ...{ x: 2 } }

作者：JowayYoung
链接：https://juejin.im/post/6844903959283367950
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。后行断言：x 只有在 y 后才匹配
后行否定断言：x 只有不在 y 后才匹配
异步迭代器(for-await-of)：循环等待每个 Promise 对象变为 resolved 状态才进入下一步 Object.fromEntries()：返回以键和值组成的对象(Object.entries()的逆操作)mport()：动态导入(返回 Promise)

背景：import 命令被 JS 引擎静态分析，先于模块内的其他语句执行，无法取代 require()的动态加载功能，提案建议引入 import()来代替 require()
位置：可在任何地方使用
区别：require()是同步加载，import()是异步加载
场景：按需加载、条件加载、模块路径动态化

Iterator

for-in 遍历顺序：不同的引擎已就如何迭代属性达成一致，从而使行为标准化

Promise

Promise.allSettled()：将多个实例包装成一个新实例，返回全部实例状态变更后的状态数组(齐变更再返回)

入参：具有 Iterator 接口的数据结构
成功：成员包含 status 和 value，status 为 fulfilled，value 为返回值
失败：成员包含 status 和 reason，status 为 rejected，value 为错误原因

作者：JowayYoung
链接：https://juejin.im/post/6844903959283367950
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。 globalThis：作为顶层对象，指向全局环境下的 this
Browser：顶层对象是 window
Node：顶层对象是 global
WebWorker：顶层对象是 self
以上三者：通用顶层对象是 globalThis
