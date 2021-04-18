// 时序图
// 1---2---3---4
// ------------| 300ms
// 1创建一次延迟，2 删除上一次，创建一次新的延迟

const debounce = (fn, delay = 300, timer = null) => {
	// timer 通过闭包保存，下一次进来会清除上一次创建的 timer
	// 所以保证了 300 ms 內只执行一次
	return (...args) => {
		clearTimeout(timer)
		timer = setTimeout(() => { fn(...args) }, delay)
	}
}

// 时序图
// 1--2--3--4--5
// ----300ms---5
// 300ms内只处理5
// 给函数加个锁，需要判断是否有锁，如果锁住了函数就不执行
// 第一次进来函数没有锁，执行函数然后加锁，300ms后解锁，再次进来
//

const throttle = (fn, delay = 300) => {
	let lock = false
	return (...args) => {
		if (lock) return
		fn(...args)
		lock = true
		setTimeout(() => { lock = false }, delay)
	}
}