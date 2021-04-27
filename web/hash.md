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