// 基本语法
// 条件语句
var fruit = 'orange'
switch (fruit) {
  case 'apple':
    console.log('当前水果为：', fruit)
    break
  case 'banana':
    console.log('当前水果为：', fruit)
    break
  default:
    console.log('当前水果为：', fruit)
    break
}

// 循环语句
// while 循环
var i = 0
while (i <= 10) {
  console.log('i 当前的值', i)
  i++
}

// for 循环
for (var j = 0; j <= 10; j++) {
  console.log('j 当前的值', j)
}

// break
for (var k = 0; k <= 10; k++) {
  // 当 k = 6 时，跳出循环
  if (k === 6) break
  console.log('k 当前的值', k)
}

// continue
for (var l = 0; l <= 10; l++) {
  // 当 l = 6 时，立即终止本轮循环，返回循环结构的头部，开始下一轮循环。
  if (l === 6) continue
  console.log('l 当前的值', l)
}

// 流程控制

let retCode = 1003 // 返回码 retCode 的值可能有很多种情况
handleRetCode(retCode)

// 方法：根据接口不同的返回码，处理前端不同的显示状态
function handleRetCode(retCode) {
  if (retCode == 0) {
    alert('接口联调成功')
    return
  }

  if (retCode == 101) {
    alert('活动不存在')
    return
  }

  if (retCode == 103) {
    alert('活动未开始')
    return
  }

  if (retCode == 104) {
    alert('活动已结束')
    return
  }

  if (retCode == 1001) {
    alert('参数错误')
    return
  }

  if (retCode == 1002) {
    alert('接口频率限制')
    return
  }

  if (retCode == 1003) {
    alert('未登录')
    return
  }

  if (retCode == 1004) {
    alert('（风控用户）提示 活动太火爆啦~军万马都在挤，请稍后再试')
    return
  }

  // 其他异常返回码
  alert('系统君失联了，请稍候再试')
  return
}

let day = 2

switch (day) {
  case 1:
    console.log('work')
    break

  case 2:
    console.log('work')
    break

  case 3:
    console.log('work')
    break

  case 4:
    console.log('work')
    break

  case 5:
    console.log('work')
    break

  case 6:
    console.log('relax')
    break

  case 7:
    console.log('relax')
    break

  default:
    break
}

let day = 2

switch (day) {
  case 1:
  case 2:
  case 3:
  case 4:
  case 5:
    console.log('work')
    break // 在这里放一个 break

  case 6:
  case 7:
    console.log('relax')
    break // 在这里放一个 break

  default:
    break
}
