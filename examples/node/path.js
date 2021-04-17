const path = require('path')

// 获取路径：path.dirname(filepath)
// 获取文件名：path.basename(filepath) 只是截取最后一段包含扩展名
// 获取扩展名：path.extname(filepath)

console.log(path.basename('./xx/jj/xx.js')) // xx.js

// path.join([...paths]) 把paths拼起来，然后再normalize一下

// path.resolve([...paths])
// 这个接口的说明有点啰嗦。你可以想象现在你在shell下面，从左到右运行一遍cd path命令
// 里面的路径是由函数在哪执行决定的，通常是入口文件

// path.parse(path) path.format()方法的反向操作。

console.log(path.parse('/home/user/dir/file.txt'))