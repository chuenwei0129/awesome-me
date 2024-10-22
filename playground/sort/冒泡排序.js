function bubbleSort(arr) {
  // 缓存数组长度
  const len = arr.length;
  // 外层循环用于控制从头到尾的比较+交换到底有多少轮
  for (let i = 0; i < len; i++) {
    // 内层循环用于完成每一轮遍历过程中的重复比较+交换
    for (let j = 0; j < len - 1; j++) {
      // 若相邻元素前面的数比后面的大
      if (arr[j] > arr[j + 1]) {
        // 交换两者
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  // 返回数组
  return arr;
}

console.log(bubbleSort([2, 3, 4, 5, 1, 2, 6, 7]));

// 优化
const sort = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    // 区别在这里，我们加了一个标志位
    let flag = false;
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        // 只要发生了一次交换，就修改标志位
        flag = true;
      }
    }
    // 若一次交换也没发生，则说明数组有序，直接放过
    if (flag === false) return arr;
  }
  return arr;
};

console.log(sort([1, 2, 3]));
