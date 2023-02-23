function a() {
  console.log('函数 a 开始执行')
  throw 'exn'
  console.log('函数 a 永远不会输出的内容')
}

function b() {
  console.log('函数 b 开始执行')
  a()
  console.log('函数 b 永远不会输出的内容')
}

function c() {
  console.log('函数 c 开始执行')
  b()
  console.log('函数 c 永远不会输出的内容')
}

try {
  c()
} catch (exn) {
  console.log('捕获到 throw 内容', exn)
}
