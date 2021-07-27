/*

    比较版本号大小

    v1：第一个版本号

    v2：第二个版本号

    如果版本号相等，返回 0, * 如果第一个版本号低于第二个，返回 -1，否则返回 1.

*/

function compareVersion(v1: string, v2: string) {
  const v1Stack = v1.split('.')
  const v2Stack = v2.split('.')

  const maxLen = Math.max(v1Stack.length, v2Stack.length)

  for (let i = 0; i < maxLen; i++) {
    // 必须转整，否则按照字符顺序比较大小

    const prevVal = ~~v1Stack[i]
    const currVal = ~~v2Stack[i]

    if (prevVal > currVal) {
      return 1
    }

    if (prevVal < currVal) {
      return -1
    }
  }

  return 0
}

console.log(compareVersion('2.2.1', '2.2.01')) // 0

console.log(compareVersion('2.2.1', '2.2.0')) // 1

console.log(compareVersion('2.2.1', '2.1.9')) // 1

console.log(compareVersion('2.2', '2.1.1')) // 1

console.log(compareVersion('2.2', '2.2.1')) // -1

console.log(compareVersion('2.2.3.4.5.6', '2.2.2.4.5.12')) // 1

console.log(compareVersion('2.2.3.4.5.6', '2.2.3.4.5.12')) // -1
