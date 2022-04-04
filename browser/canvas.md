# canvas 和 svg


假设有一个 Promise 为 get 和一个待请求数组为 list，使用它们进行请求数据。但是为了避免 IO 过大，需要限定三个并发数量

假设有一个 Promise 为 get 和一个待请求数组为 list，使用它们进行请求数据。但是为了避免 IO 过大，需要限定三个并发数量

function get (i) {
  console.log('In ', i)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(i * 1000) 
      console.log('Out', i, 'Out')
    }, i * 1000)
  })
}

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
写一段能够实现功能的松散的代码是很简单的，不过对提供 API 的设计思路也是相当重要的。简单实现如下，使用 count 维护一个并发数量的计数器即可

// 并发数量计数
let count = 0
function run () {
  if (count < 3 && list.length) {
    count+=1
    get(list.shift()).then(() => {
      count-=1 
      run()
    })
  }
}

// 限定三个并发数量
run()
run()
run()
#代码
Promise.map(
    Iterable<any>|Promise<Iterable<any>> input,
    function(any item, int index, int length) mapper,
    [Object {concurrency: int=Infinity} options]
) -> Promise
设计成 Bluebird 的 API，是比较模块化，也是易于使用的。代码的关键在于维护一个队列，当超过限定数量的 Promise 时，则交与队列维护。代码如下

class Limit {
  constructor (n) {
    this.limit = n
    this.count = 0
    this.queue = []
  }

  enqueue (fn) {
    // 关键代码: fn, resolve, reject 统一管理
    return new Promise((resolve, reject) => {
      this.queue.push({ fn, resolve, reject })
    })
  }

  dequeue () {
    if (this.count < this.limit && this.queue.length) {
      // 等到 Promise 计数器小于阈值时，则出队执行
      const { fn, resolve, reject } = this.queue.shift()
      this.run(fn).then(resolve).catch(reject)
    }
  }

  // async/await 简化错误处理
  async run (fn) {
    this.count++
    // 维护一个计数器
    const value = await fn()
    this.count--
    // 执行完，看看队列有东西没
    this.dequeue()
    return value
  }

  build (fn) {
    if (this.count < this.limit) {
      // 如果没有到达阈值，直接执行
      return this.run(fn)
    } else {
      // 如果超出阈值，则先扔到队列中，等待有空闲时执行
      return this.enqueue(fn)
    }
  }
}

Promise.map = function (list, fn, { concurrency }) {
  const limit = new Limit(concurrency)
  return Promise.all(list.map((...args) => {
    return limit.build(() => fn(...args))
  }))
}
#参考
#Bluebird.map(opens new window)
Bluebird.map(list, x => {
  return get(x)
}, {
  concurrency: 3
})
主要是参考 concurrency 的实现

#featurist/promise-limit

如何把 DOM 转化为图片并下载
#案例
一、如何把文章中的代码片段保存为高亮格式的图片？

某些博客平台为了保证对高亮格式的代码保有最大的兼容性，可支持把代码转化为兼容良好的图片
保持高亮格式的图片化代码更容易传播与分享
二、如何为原创图片添加水印？

水印图片可以更好地防止盗用
水印图片利用水印可以更好的传播
三、在我的工作中也曾有一个真实的案例：电子奖状及电子结业证，并可以转化为图片下载。

我负责的一个院校管理系统中，每次期末考试会对学生进行，排名靠前的可获得奖状。而奖状的开头是:

__同学:

  恭喜你获得第N名，再接再厉。
而最终的解决方案就是前端获取数据，并由 DOM 转为图片下载。

四、如何开发一个截屏的浏览器插件

那 DOM 是如何转化为图片，能够在前端下载的呢？

#原理
你现在开始着手调研解决方案，面向浩瀚的开源，借助轮子在 Github 进行疯狂检索，那一定绕不开以下两个贼好用的库

dom-to-image (opens new window): 7K Star，每周 6 万次下载
html2cannvas (opens new window): 22.7K Star, 每周 58 万次下载
从实践经验来说，Code (opens new window)是一个不错的示例项目，它基于开源项目 Carbon (opens new window)，利用 dom-to-image 这个库把高亮代码转化为图片。

但无论选择哪一个库，你仔细研读他们的代码，他们都基于相同的技术方案: 借助 SVG 与 Canvas。

const node = document.getElementById('app');

const dataURI = await domtoimage.toPng(node)

const img = new Image()
img.src = dataURI
#HTML -> SVG: ForeignObject
SVG 中的 <foreignObject> 元素允许包含来自不同的XML命名空间的元素，意味着 HTML 可以转化为 SVG
SVG 是一种文本格式的图片
因此，借助 foreignObject 可以很简单地把 HTML 转化为一张图片，注意不同的命名空间用 xmlns 指定

<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <style>
		div {
			border: 1px solid red;
			background: #333;
			font-size: 16px;
			color: #eee;
		}
  </style>

  <!-- 把 HTML 嵌入到 SVG 中 -->
  <!-- 注意设置高度与宽度 -->
  <foreignObject x="0" y="0" width="200" height="200">
    <div xmlns="http://www.w3.org/1999/xhtml">
      <h1>悯农</h1>
      <p>锄禾日当午，汗滴禾下土</p>
      <p>谁知盘中餐，粒粒皆辛苦</p>
    </div>
  </foreignObject>
</svg>
当然这个只是一个简单的示例，真正做到一比一还原还要下点功夫。效果如下所示，可以在浏览器直接打开中查看图片源代码

foreignObject 用法

到这里为止，借助 SVG(foreignObject) 已经能够实现了DOM向图片转化的需求，既然已经支持了 SVG，那如何支持 JPG 与 Canvas？

#SVG -> JPG/PNG: 借助 Canvas
JPG/PNG 格式的图片如何互相转化格式？

使用 Canvas 绘制图像

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const img = document.getElementById('image')
ctx.drawImage(img, 0, 0, 200, 200)
// 默认转化为 PNG 格式的图片
const png = canvas.toDataURL()

// 可指定转化为 JPG 格式的图片
const jpg = canvas.toDataURL('image/jpeg', 1.0)
#核心步骤: HTML -> SVG -> Canvas -> JPG/PNG
AST，抽象语法树，js 代码解析后的最小词法单元，而这个过程就是通过 Parser 来完成的。

那么 AST 可以做什么呢？

eslint: 校验你的代码风格
babel: 编译代码到 ES 低版本
taro/mpvue: 各种可以多端运行的小程序框架
GraphQL: 解析客户端查询
我们在日常工作中经常会不经意间与它打交道，如 eslint 与 babel，都会涉及到 js 与代码中游走。不同的解析器会生成不同的 AST，司空见惯的是 babel 使用的解析器 babylon，而 uglify 在代码压缩中使用到的解析器是 UglifyJS。

那压缩代码的过程：code -> AST -> (transform)一颗更小的AST -> code，这与 babel 和 eslint 的流程一模一样。

webpack 中内置的代码压缩插件就是使用了它，它的工作流程大致如下：

// 原始代码
const code = `const a = 3;`

// 通过 UglifyJS 把代码解析为 AST
const ast = UglifyJS.parse(code);
ast.figure_out_scope();


// 转化为一颗更小的 AST 树
compressor = UglifyJS.Compressor();
ast = ast.transform(compressor);

// 再把 AST 转化为代码
code = ast.print_to_string();