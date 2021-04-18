// 触发高频时间后n秒内函数只会执行一次,如果n秒内高频时间再次触发,则重新计算时间。// 类似放火球术，一直打断会放不出去，用户输入发请求不适用，debounce，延时
// 1创建一次延迟，2 删除上一次，创建一次新的延迟
// 高阶函数
function debounce(fn, delay = 300, timer = null) {
	return (...args) => {
		// timer 通过闭包保存，下一次进来会清除上一次创建的 timer
		// debounce 只执行一次，执行多次的是他的返回值
		// console.log('调用 debounce 次数', ++i, '上一次建立的定时器 timer', timer)
		// 所以保证了 300 ms 內只执行一次
		clearTimeout(timer)
		timer = setTimeout(() => {
			fn(...args)
		}, delay)
	}
}

// 高频时间触发,但n秒内只会执行最后一次,所以节流会稀释函数的执行频率。 // 节流，一段时间內必然会执行一次，throttle
// 时序图分析
// 1-2-3-4-5---300ms---6-7-8-9-10---300ms---
// --------5----fn()---6-7-8-9-10----fn----

function throttle(fn, delay = 300) {
	// let lock = false 和 在 (lock=false) 写都会闭包
	// let lock = false 写在 () 中，delay 必须传值，参数默认值的特点
	let lock = false
	return (...args) => {
		if (lock) return
		// 第一次不需要节流
		fn(...args)
		lock = true
		// 也不需要清除定时器，虽然一直点可能出现定时器混乱，但这就是节流啊
		setTimeout(() => {
			lock = false
		}, delay)
	}
}