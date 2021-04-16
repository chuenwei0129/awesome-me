const p1 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('p1')
	}, 3000)
})

const p2 = new Promise((resolve, reject) => {
	setTimeout(() => {
		// reject(new Error('p2'))
		resolve('p2')
	}, 2000)
})

const p3 = new Promise((resolve, reject) => {
	setTimeout(() => {
		// reject(new Error('p3'))
		resolve('p3')
	}, 1000)
})

const test = [1, 2, 3, p1, p2, p3, 7, 8, 9]
const set = new Set(test)

Promise.all(set).then(val => console.log('Promise.all', val))

// promise 并发 计数器

Promise._all = function(it) {
	// 空值
	// 字符串, itreator
	// 循环异步问题，循环结束，异步不一定执行✅
	// 计数器累加
	// Array.from 和 [...arr]的区别
	return new Promise((resolve, reject) => {
		const arr = [...it]
		if (arr.length === 0) resolve(arr)
		const ret = []
		let idx = 0
		const resolveData = (data, key) => {
			// 这里输出 [pending, resolved, resolved]
			// promise 在 task 末尾执行回调
			ret[key] = data
			// 这里计数器算完才结束
			if (++idx === arr.length) resolve(ret)
		}
		for (const [key, val] of arr.entries()) {
			Promise.resolve(val).then(data => resolveData(data, key), r => reject(r))
		}
	})
}

// 循环 + 异步
// reduce 本质还是遍历
// reduce + promise 可以串行，本质还是回调
// for ... of + await,生成器

Promise._all(new Set([])).then(val => console.log('Promise._all', val))

// Promise.all的完成体应该符合以下特征：

// 输入为Iterator类型的参数，可以是Array，Map， Set，String ，可能也得包括魔改的Iterator（Symbol.iterator）之类
// 若输入的可迭代数据里不是Promise，则也需要原样输出
// 返回一个Promise实例，可以调用then和catch方法
// 输出在then里体现为保持原顺序的数组
// 输出在catch体现为最早的reject返回值
// 空 Iterator， resolve返回空数组

// const all = (...promises) => {
//   const results = [];

//   const merged = promises.reduce(
//     (acc, p) => acc.then(() => p).then(r => results.push(r)),
//     Promise.resolve(null));

//   return merged.then(() => results);
// };