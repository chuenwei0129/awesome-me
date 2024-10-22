// 编写一个深度克隆函数，满足以下需求（此题考察面较广，注意细节）
function deepClone(obj) {
  Object.entries(obj).map(([key, val]) => {
    console.log(typeof val);
    return key;
  });
}

// deepClone 函数测试效果
const objA = {
  name: 'jack',
  birthday: new Date(),
  pattern: /jack/g,
  // body: document.body,
  others: [123, 'coding', new Date(), /abc/gim],
};

const objB = deepClone(objA);
console.log(objA === objB); // 打印 false
console.log(objA, objB); // 对象内容一样
