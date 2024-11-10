// 隐式推导类型守卫
class Toast {
  travel() {}
}

class Dog {
  bark() {}
}

// 这里没有显式类型守卫！
function isToast(toast: unknown) {
  return toast instanceof Toast;
}

declare let input: Toast | Dog;

if (isToast(input)) {
  input.travel(); // error before 5.5
} else {
  input.bark(); // error before 5.5
}

declare const arr: (string | null)[];
// before 5.5: (string | null)[]
// after 5.5: string[]
const result = arr.filter((item) => item !== null);

declare const obj: Record<string, unknown>;
declare const key: string;

if (typeof obj[key] === 'string') {
  obj[key].at(0); // error before 5.5
}

function foo(x: unknown) {
  // 推导类型是 unknown
  return typeof x === 'string' ? x.length : x;
}

let x: string;
function bar() {
  // Error，x 不是一个导出的变量
  return x;
}

export let y: string;
function baz() {
  // OK，y 是一个导出的变量，类型对外界可知
  return y;
}
