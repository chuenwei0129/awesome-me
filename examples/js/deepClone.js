const test = {
	// undefined
	undefined,
	// function
	func() {
		console.log('我是函数')
	},
	// 特殊对象
	regexp: /\d/g,
	x: {
		x: {
			x: {
				x: {
					x: {
						x: 1
					}
				}
			}
		}
	}
}

// symbol 属性
test[Symbol('symbol')] = 'symbol'
// 不可枚举属性
Object.defineProperty(test, 'enumObj', {
	enumerable: false,
	// getter，setter
	get() {
		return 20
	}
})

// 循环引用
test.target = test

// 原型链上的方法
const F = function() {}
F.prototype.sayHello = () => {
	console.log('我是原型链上的方法')
}
Object.setPrototypeOf(test, F.prototype)

const deepClone = (target, cache = new WeakMap()) => {
	if (typeof target !== 'object' || target === null) return target
	// 第二次进来如果 v 在字典表里表示循环引用，只是处理循环引用那一项时，直接return，其他项走的是 Reflect 循环
	if (cache.has(target)) return cache.get(target)
	// 保证原型上的方法不会丢失
	const ret = Array.isArray(target) ? [] : new target.constructor()
	// 把返回值和 自己建立字典
	cache.set(target, ret)
	for (const k of Reflect.ownKeys(target)) {
		const v = target[k]
		ret[k] = typeof v === 'object' && v !== null ? deepClone(v, cache) : v
	}
	return ret
}

console.log(
	deepClone(test)
)