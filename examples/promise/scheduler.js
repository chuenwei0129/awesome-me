/**
 * 题目：JS 实现异步调度器
 * 要求：
 *  JS 实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有 2 个
 *  完善下面代码中的 Scheduler 类，使程序能正确输出
 */

class Scheduler {
	constructor(maxNum) {
		this.taskList = []
		this.count = 0
		this.maxNum = maxNum // 最大并发数
	}
	async add(promiseCreator) {
		// 如果当前并发超过最大并发，那就进入任务队列等待
		if (this.count >= this.maxNum) {
			await new Promise((resolve) => {
				this.taskList.push(resolve)
			})
		}

		// 次数 + 1（如果前面的没执行完，那就一直添加）
		this.count++

		// 等待里面内容执行完毕
		const result = await promiseCreator()

		// 次数 - 1
		this.count--

		// 将队首出队
		if (this.taskList.length) {
			this.taskList.shift()()
		}

		// 链式调用，将结果值返回出去
		return result
	}
}

const timeout = (time) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve()
		}, time)
	})
}

const scheduler = new Scheduler(2)
const addTack = (time, order) => {
	return scheduler
		.add(() => timeout(time))
		.then(() => console.log(order))
}
addTack(1000, '1')
addTack(500, '2')
addTack(300, '3')
addTack(400, '4')

// 输出：2 3 1 4
// 一开始，1、2 两个任务进入队列
// 500ms 时，完成 2，输出 2，任务 3 进队
// 800ms 时，完成 3，输出 3，任务 4 进队
// 1000ms 时，完成 1，输出 1，没有下一个进队的
// 1200ms 时，完成 4，输出 4，没有下一个进队的
// 进队完成，输出 2 3 1 4