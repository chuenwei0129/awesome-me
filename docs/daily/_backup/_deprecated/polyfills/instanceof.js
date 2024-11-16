const $instanceof = (left, right) => {
  // 第一次查找原型
  let leftProtoType = Object.getPrototypeOf(left)
  while (1) {
    if (leftProtoType === right.prototype) return true
    if (leftProtoType === null) return false
    // 查找 leftProtoType 的原型
    leftProtoType = Object.getPrototypeOf(leftProtoType)
  }
}

console.log(Object instanceof Function) // true
console.log($instanceof(Object, Function)) // true
