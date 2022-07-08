/**
 * 已知年月，求该月共多少天？
 * @param {*} year
 * @param {*} month
 * @returns {number}
 */
// month 值需对应实际月份减 1，如实际 2 月，month 为 1，实际 3 月，month 为 2
function getMonthCountDay(year, month) {
  // 下月的第 0 天，就是上个月的最后一天
  return new Date(year, month + 1, 0).getDate()
}

// 2 月份总天数
console.log(getMonthCountDay(2020, 1)) // 29
console.log(getMonthCountDay(2021, 1)) // 28
// 4 月份总天数
console.log(getMonthCountDay(2020, 3)) // 30
console.log(getMonthCountDay(2021, 3)) // 30
// 1 月份总天数
console.log(getMonthCountDay(2020, 0)) // 31
console.log(getMonthCountDay(2021, 0)) // 31

// 解构获取数据最后一个元素
const { length: len, [len - 1]: last, ...rest } = [1, 2, 3]
console.log(len, last, rest) // 3 3 {0: 1, 1: 2}
