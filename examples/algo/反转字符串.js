/**
 * @param {string} str
 * @return {string}
 */
const reverseWords = function(str) {
	return str.split(' ').map(word => [...word].reverse().join('')).join(' ')
}

// split(/\s/g)
// match(/[\w']+/g) // 返回数组

// 696

// 输入与输出的关系
// 子输入，递归
// 重复找

// 循环抽象，边界条件 <= + 1

17

914