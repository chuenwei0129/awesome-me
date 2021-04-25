const next = () => Promise.resolve()

async function fn1(next) {
	console.log('fn1 start')
	await new Promise((resolve) => {
		console.log(resolve);
	})
	console.log('fn1 end')
}

async function fn2(next) {
	console.log('fn2 start')
	await next()
	console.log('fn2 end')
}

async function fn3(next) {
	console.log('fn3 start')
	await next()
	console.log('fn3 end')
}

console.log('task start')

// 遇到 async 只是加入微任务队列，不会阻塞同步执行，但会阻塞渲染
// 微任务队列会一下子全部执行完毕
// task start

fn1(next) // 返回的是个 promise
fn2(next)
fn3(next)

// 不同 async 之间推的微任务不会阻塞，只会阻塞自己的为人物

// async function a(){}
// undefined
// a()
// Promise {<fulfilled>: undefined}

// Promise.resolve(() => {})
// Promise {<fulfilled>: ƒ}__proto__: Promise[[PromiseState]]: "fulfilled"[[PromiseResult]]: () => {}
// new Promise(() => {})
// Promise {<pending>}