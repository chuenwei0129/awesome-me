const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'largeFile.txt')
const stream = fs.createWriteStream(filePath)
const bufferSize = 1024 * 1024 * 10 // 每次写入10MB
const totalSize = 2 * 1024 * 1024 * 1024 // 目标文件大小2GB
let written = 0

function writeToFile() {
  let ok = true
  while (written < totalSize && ok) {
    // 最后一次写入可能不需要整个bufferSize
    let bytesToWrite = Math.min(bufferSize, totalSize - written)
    // 使用Buffer.allocUnsafe可以稍微提高性能，因为我们随后会填充它
    ok = stream.write(Buffer.allocUnsafe(bytesToWrite).fill('0'))
    written += bytesToWrite
    console.log(`已写入: ${(written / (1024 * 1024 * 1024)).toFixed(2)} GB`)
  }
  if (written >= totalSize) {
    stream.end()
  } else if (!ok) {
    // 如果流不能再写入数据，等待'drain'事件再继续
    stream.once('drain', writeToFile)
  }
}

writeToFile()

stream.on('finish', () => {
  console.log('文件创建完成。')
})
