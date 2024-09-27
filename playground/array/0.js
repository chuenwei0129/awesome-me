const test = [1, 2, 3, 4, 5];

// 将数组 [ 1, 2, 3, 4, 5 ] 转换为 [ 'a1', 'a2', 'a3', 'a4', 'a5' ]；
const result = test.map((item) => `a${item}`);
console.log(result);

// 将数组 [ 1, 2, 3, 4, 5 ] 转换为 [ 'a1', 'b2', 'c3', 'd4', 'e5' ]；
const result2 = test.map(
  (item, index) => String.fromCharCode(97 + index) + item,
);
console.log(result2);

// 将数组 [ 0, 0, 0, 0, 0 ] 转换为 [ 'A', 'B', 'C', 'D', 'E' ]
const result3 = test.map((_, index) => String.fromCharCode(65 + index));
console.log(result3);

// 提取数组 [ 1, 2, 3, 4, 5 ] 中的 [ 2, 3, 4 ]。
const result4 = test.slice(1, 4);
console.log(result4);

// 实现平均值的计算
const result5 = test.reduce((acc, curr) => acc + curr, 0) / test.length;
console.log(result5);

// 设某次投票结果为如下 [ 1, 2, 3, 2, 2, 3, 1, 4, 4, 1, 2, 1, 1, 3, 4 ]，请统计投票结果并找出票数最多的选项；
const arr = [1, 2, 3, 2, 2, 3, 1, 4, 4, 1, 2, 1, 1, 3, 4];
const map = new Map();
arr.forEach((item) => {
  if (map.has(item)) {
    map.set(item, map.get(item) + 1);
  } else {
    map.set(item, 1);
  }
});

console.log(
  Array.from(map)
    .sort((a, b) => b.at(-1) - a.at(-1))
    .at(0)
    .at(0),
);

// 假设某一时间记录软件记录下一个人一天 24 小时中每一个小时的工作状态，其中分别以范围为 1 ~ 8 的自然数标识，1 为生产力最差的程度，而 8 则为生产力最佳的状态。而该软件记录了某人一天的数据为 [ 1, 1, 1, 1, 1, 1, 1, 1, 6, 7, 8, 4, 3, 7, 8, 8, 6, 6, 4, 3, 3, 3, 1, 1 ]。假设区间 1 ~ 3 为生产力较低，4 ~ 5 为生产力一般，6 ~ 8 为生产力较高。请统计并分析这份数据中一天的工作状态。
const productivityData = [
  1, 1, 1, 1, 1, 1, 1, 1, 6, 7, 8, 4, 3, 7, 8, 8, 6, 6, 4, 3, 3, 3, 1, 1,
];

function analyzeProductivity(data) {
  let low = 0; // 生产力较低区间
  let medium = 0; // 生产力一般区间
  let high = 0; // 生产力较高区间

  data.forEach((hour) => {
    if (hour >= 1 && hour <= 3) {
      low++;
    } else if (hour >= 4 && hour <= 5) {
      medium++;
    } else if (hour >= 6 && hour <= 8) {
      high++;
    }
  });

  // 计算总小时数，应该为24
  const totalHours = data.length;

  // 计算每个区间的百分比
  const lowPercentage = ((low / totalHours) * 100).toFixed(2);
  const mediumPercentage = ((medium / totalHours) * 100).toFixed(2);
  const highPercentage = ((high / totalHours) * 100).toFixed(2);

  return {
    low: `${low} hours (${lowPercentage}%)`,
    medium: `${medium} hours (${mediumPercentage}%)`,
    high: `${high} hours (${highPercentage}%)`,
  };
}

const productivityAnalysis = analyzeProductivity(productivityData);
console.log(productivityAnalysis);
