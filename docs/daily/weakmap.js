// 创建一个 WeakSet
const set = new WeakSet();

let a = { foo: 'hello' };
set.add(a); // 把对象 a 添加到 set 中

function test() {
  let b = { bar: 'world' };
  set.add(b); // 把局部变量 b 放入 set 中
}

test(); // 调用函数

console.log(set); // 打印 set 的值
