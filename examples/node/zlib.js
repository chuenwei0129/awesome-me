const fs = require('fs')
const zlib = require('zlib')

// 压缩
const rs = fs.createReadStream('./test.txt')
const ws = fs.createWriteStream('./test.txt.gz')
const gzip = zlib.createGzip()

rs.pipe(gzip).pipe(ws)

// 解压缩，压缩反向操作
const entry = fs.createReadStream('./test.txt.gz')
const output = fs.createWriteStream('./_test.md')
const gunzip = zlib.createGunzip()

entry.pipe(gunzip).pipe(output)

// 浏览器通过HTTP请求头部里加上 Accept-Encoding
// 告诉服务器，“你可以用gzip，或者defalte算法压缩资源”。
// Accept-Encoding: gzip, deflate

// 服务端gzip压缩