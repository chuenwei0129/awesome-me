// 输出变量
export const foo = 'foo'
export function bar() {}
export class baz {}

// 输出接口
const x = 'x'
function y() {}
class z {}

export { x, y, z }
export { a, b, c }

// 输出 default
// 本质是输出变量为 default 的值
const q = 'x'
function w() {}
class e {}
const r = 'r'

// 一个模块只能有一个 default
// 相当于导出值为 r 的变量 default
// export default r
// 相当于导出变量 为 default 的对象
export default {
  q,
  w,
  e
}

// 转发 export + import
const a = 'a'
function b() {}
class c {}
