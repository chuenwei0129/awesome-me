const start = Date.now()
const times = []

setTimeout(function run() {
	times.push(Date.now() - start) // 保存前一个调用的延时

	if (start + 100 < Date.now()) console.log(times) // 100 毫秒之后，显示延时信息
	else setTimeout(run) // 否则重新调度
})

// 输出示例：
// 1,1,1,1,9,15,20,24,30,35,40,45,50,55,59,64,70,75,80,85,90,95,100