let data = {
	msg: 'hello vue',
	arr: [1, 2, 3],
	obj: {
		str: 'str',
	},
}

// console.log('代理前', data.msg);

// const oldVal = data.msg

// Object.defineProperty(data, 'msg', {
// 	// 代理是为了返回与原值不同值，不改变原值默认返回 undefined，与 value: '42' 区别在 todo...
// 	get() {
// 		// todo...
// 		// 内部因为 this 原因，需要闭包保存代理的值
// 		// 内部只能返回代理后的值
// 		console.log('数据被代理。。。');
// 		return oldVal
// 	},
// 	set(newVal) {
// 		// 🏁 this 是 `.msg` 前的值 data
// 		console.log('数据发生了改变。。。')
// 		console.log('旧值', oldVal, '新值', newVal);
// 	},
// })

// console.log('代理后', data.msg);

// data.msg = '我是改变后的数据'

function reactive(data) {
 // 遍历对象，对对象的每个属性都使用defineProperty
	for (let [k, v] of Object.entries(data)) {
		// + if (typeof v === 'object' && v !== null) reactive(v) 处理对象嵌套
		if (typeof v === 'object' && v !== null) reactive(v)
		Object.defineProperty(data, k, {
			get() {
				console.log(`属性 ${k} 被代理`);
				// 此处可以做一些对代理前的值做一些个性化处理，这里的 v 只是闭包保存值的变量
				// v = v + '123'
				return v
			},
			set(newV) {
				// 执行 set 和 get 毫无关系，互不影响
				// + if (typeof newV === 'object' && newV !== null) reactive(newV)  对象嵌套，监听的对象重新赋值为新的对象
				if (typeof newV === 'object' && newV !== null) reactive(newV)
				console.log(`属性 ${k} 数据发生改变，原值为 ${v}，新值为 ${newV}`);
				v = newV
			}
		})
	}
	return data
}

let proxyData = reactive(data)

// 1. 简单赋值，对象无嵌套
proxyData.msg = 'hello world' // 属性 msg 数据发生改变，原值为 hello vue，新值为 hello world

//! proxyData.obj.str 进行此类操作，proxyData.obj 相当于执行了一次 proxyData.obj 的 get 在执行 proxyData.obj.str 的 set

// 2. 对象嵌套
proxyData.obj.str = 'str1' // 属性 str 数据发生改变，原值为 str，新值为 str1

// 3. 对象嵌套，监听的对象重新赋值为新的对象，那么这个对象就没有 get set
proxyData.obj = { num: 1 } // 属性 obj 数据发生改变，原值为 [object Object]，新值为 [object Object]
proxyData.obj.num = 2 // 属性 num 数据发生改变，原值为 1，新值为 2

// 4. 给对象添加新的属性，Object.defineProperty 无法解决，本质是只对存在的 data 代理，后来的没有代理，vue 中 $set 就是解决此类问题
proxyData.newProperty = '新属性'
proxyData.newProperty = '改变新属性'

// 解决办法其实就是给新的属性加代理就是了

// 5. 数组
const arrMethods = ['push', 'shift', 'unshift']
// 函数劫持，批量重写数组常用方法
arrMethods.forEach((method) => {
	let oldMethod = Array.prototype[method]
	Array.prototype[method] = function (...args) {
		console.log('数组数据改变了');
		oldMethod.call(this, ...args)
	}
})

proxyData.arr.push(5) // 数组数据改变了
proxyData.arr.length = 2 // vue 无法处理
