const buf = Buffer.from('生日快乐')
// 12 字节
const buf1 = Buffer.alloc(12)
buf1.fill('生日快乐')

const buf2 = Buffer.from([1, 2, 3])

console.log(buf, buf1, buf2)
// 判断是否相等
console.log(buf.equals(buf1))

// 不清空前面的空间重新开辟空间
const buf3 = Buffer.allocUnsafe(12)
buf3.fill('生日快乐')

// 长度12字节
console.log(buf3.length)

// Buffer.concat([buf1, buf2])
const buf4 = Buffer.concat([buf, buf1]).toString()
console.log(buf4)

// 截取：buf.slice([start[, end]])
// 用于截取buf，并返回一个新的Buffer实例。需要注意的是，这里返回的Buffer实例，
// 指向的仍然是buf的内存地址，所以对新Buffer实例的修改，也会影响到buf。