// const arr = [1, 2, 3, 4]

// const iterator = arr[Symbol.iterator]()

// console.log(Object.getPrototypeOf(iterator))

// console.log(iterator.next()) // { value: 1, done: false }
// console.log(iterator.next()) // { value: 2, done: false }
// console.log(iterator.next()) // { value: 3, done: false }
// console.log(iterator.next()) // { value: 4, done: false }
// console.log(iterator.next()) // { value: undefined, done: true }

// 计数器实现 iterator

// Array.from 和 [...arr]的区别

const arrLike = {
	0: '0',
	1: '1',
	2: '2',
	length: 3
}

// console.log([...arrLike]) // TypeError: arrLike is not iterable
// console.log(Array.from(arrLike)) // ['0', '1', '2']

const arrLikeToIt = {
	0: '0',
	1: '1',
	2: '2',
	length: 3,
	// [Symbol.iterator]() {
	// 	let idx = 0
	// 	return {
	// 		next: () => ({
	// 			value: this[idx],
	// 			done: idx++ === this.length
	// 		})
	// 	}
	// }
	* [Symbol.iterator]() {
		for (let i = 0; i < this.length; i++) {
			yield this[i]
		}
	}
}

console.log([...arrLikeToIt])