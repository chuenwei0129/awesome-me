# 路由<!-- omit in toc -->

## 原理
### hash

```html
<body>
  <a href="#/a">/a</a>
  <a href="#/b">/b</a>
  <div id="app">
    <h1>Home</h1>
  </div>

  <script>
    let app = document.querySelector('#app')

    // 刷新页面，根据当前 hash 刷新页面组件
    if (window.location.hash === '#/a') {
      app.innerHTML = `<h1>组件 a 加载</h1>`
    }

    if (window.location.hash === '#/b') {
      app.innerHTML = `<h1>组件 b 加载</h1>`
    }

    window.onhashchange = function (e) {
      console.log('hash:', e);
      // 根据 url 判断
      // 精确匹配
      if (window.location.hash === '#/a') {
        app.innerHTML = `<h1>组件 a 加载</h1>`
      }
      if (window.location.hash === '#/b') {
        app.innerHTML = `<h1>组件 b 加载</h1>`
      }

      // 刷新页面，onhashchange 不会触发
    }

  </script>
</body>
```

### history

```js
// 栈
setTimeout(() => {
  history.pushState({ a: 'a页面数据' }, '页面 A', 'http://127.0.0.1:5500/examples/router/history.html#/a')
}, 1000);

setTimeout(() => {
  history.pushState({ b: 'b页面数据' }, '页面 B', 'http://127.0.0.1:5500/examples/router/history.html#/b')
}, 2000);

setTimeout(() => {
  // 栈底方向，下一层，回退按钮
  history.back()
}, 3000);

setTimeout(() => {
  // 栈顶方向，上一层，前进按钮
  history.forward()
}, 4000);

setTimeout(() => {
  // 替换当前页面，即 页面 B
  history.replaceState({ c: 'c页面数据' }, '页面 C', 'http://127.0.0.1:5500/examples/router/history.html#/c')
}, 5000);

setTimeout(() => {
  // 同 back 页面 A
  // 通过与当前页面相对位置来标志，传递参数值 -2 回退 2 个页面
  history.go(-1)
}, 6000)

// pushState() 绝对不会触发 hashchange 事件，即使新的 URL 与旧的 URL 仅哈希不同也是如此。
// forward()，pop(), back() 会触发事件
window.onpopstate = function (e) {
  console.count('history change'); // 3
  console.log('history route: ', e);
}

// 浏览器 history.length 最大长度 50
console.log('history end: ', window.history) // length
```

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>history | router</title>
</head>

<body>
  <button onclick="to('/a')">/a</button>
  <button onclick="to('/b')">/b</button>

  <br>

  <div id="app">
    <h1>Home</h1>
  </div>

  <script>
    // history 刷新是根据 html 来匹配的，live server 找不到会报错，这里使用 hash 降级，可以去 react public 实验
    // 若果 /a 对应的是路径，就要使用 pathname 处理，刷新需要重定向到首页

    const baseUrl = 'http://127.0.0.1:5500/examples/router/history.html'
    const app = document.querySelector('#app')

    function to(path) {
      // 一直 push 同一路由，也会增加历史记录
      history.pushState(path, '', `${baseUrl}#${path}`)

      // 为了复用，我们可以写一个 onpushState 函数，把 if 合并

      if (window.location.hash === '#/a') {
        app.innerHTML = `<h1>组件 a 加载</h1>`
      }

      if (window.location.hash === '#/b') {
        app.innerHTML = `<h1>组件 b 加载</h1>`
      }
    }

    // 现在问题是点击按钮不会触发这个事件，解决只要把这个方法写进 to 函数即可
    window.onpopstate = function (e) {
      console.log('history route: ', e);

      // e.currentTarget.location 的值来判断路由
      if (e.currentTarget.location.hash === '#/a') {
        app.innerHTML = `<h1>组件 a 加载</h1>`
      }
      if (e.currentTarget.location.hash === '#/b') {
        app.innerHTML = `<h1>组件 b 加载</h1>`
      }

    }

    // 刷新页面
    if (window.location.hash === '#/a') {
      app.innerHTML = `<h1>组件 a 加载</h1>`
    }

    if (window.location.hash === '#/b') {
      app.innerHTML = `<h1>组件 b 加载</h1>`
    }

    // 为了复用，我们可以重写 history.pushState方法

  </script>
</body>

</html>
```

## react-router

router容器 route规则

匹配qianzui

exact

方法是实力伤的不再原型上

