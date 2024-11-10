const selectSort = (arr) => {
  let minIndex;
  for (let i = 0; i < arr.length - 1; i++) {
    minIndex = i;
    // 每一轮缩小 1 格循环区间
    for (let j = i; j < arr.length; j++) {
      if (arr[minIndex] > arr[j]) minIndex = j;
    }
    // 如果 minIndex 对应元素不是目前的头部元素，则交换两者
    if (minIndex !== i) {
      [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
    }
  }
  return arr;
};

console.log(selectSort([2, 1, 3, 2, 3, 4]));
