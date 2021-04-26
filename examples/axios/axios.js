function Axios(config) {

  this.defaults = config
  this.intercepters = {
    request: new IntercepterManger(),
    response: new IntercepterManger()
  }

}

// 发布订阅
function IntercepterManger () {
  this.handlers = []
}

IntercepterManger.prototype.use = function (onFulfilled, onRejected) {
  this.handlers.push({onFulfilled, onRejected})
}

Axios.prototype.request = function (config) {

  let promise = Promise.resolve(config)

  let chains = [dispatchRequest, undefined] // undefined 占位

  // 处理拦截器
  this.intercepters.request.handlers.forEach(({onFulfilled, onRejected}) => {
    // 进入 promise 栈，请求应该在 dispatchRequest 前面，2 比 1 后入先出，请求是栈
    chains.unshift(onFulfilled, onRejected)
  })

  this.intercepters.response.handlers.forEach(({onFulfilled, onRejected}) => {
    // 进入 promise 队列，响应应该在 dispatchRequest 后面，先入先出，队列，响应是队列
    chains.push(onFulfilled, onRejected)
  })

  console.log('队列', chains);

  // 此处 chains[0] 为成功回调，chains[1] 为失败回调

  // chains 循环
  while (chains.length > 0) {
    console.log(promise);
    promise = promise.then(chains.shift(), chains.shift())
  }
  // 这样就会在响应前形成一整条 promise 链，在 dispatchRequest 还没 then 调用回调前，就在前面拦截了 data，完美

  return promise
  
}

// 取消请求

Axios.prototype.cancelToken = function(exec) {

  let resolvePromise = null

  this.abort = new Promise((resolve) => {
    resolvePromise = resolve
  })

  exec(() => resolvePromise())
  
}

function dispatchRequest(config) {

  return http(config)

}

function http(config) {

  const { method, url } = config

  return new Promise((resolve, reject) => {

    const xhr = new XMLHttpRequest()

    xhr.open(method, url)

    xhr.send()

    // 取消请求
    if (config.cancelToken) {
      config.cancelToken.abort.then(() => {
        xhr.abort()
      })
    }

    xhr.onload = () => {

      if (xhr.status === 200) {

        resolve({
          // 配置对象
          config,
          // 响应体
          data: xhr.response,
          // 响应头
          Headers: xhr.getAllResponseHeaders(),
          // xhr 请求对象
          xhr,
          // 响应状态吗
          status: xhr.status,
          // 响应字符串
          statusText: xhr.statusText
        })

      } else {

        reject(new Error('请求失败'))

      }

    }

  })
  
}

Axios.prototype.get = function (config) {
  // 发送 get 请求
  return this.request(config)
}

Axios.prototype.post = function (config) {
  // 发送 post 请求
  return this.request(config)
}

function createInstance(config) {
  // 实例化对象，context 不是函数
  let context = new Axios(config)

  // 把 request 方法赋值给 instance 是函数，此时不能 instance.get
  let instance = Axios.prototype.request.bind(context)

  // 将 Axios.prototype 的方法，添加到 instance 上
  Object.keys(Axios.prototype).forEach(key => {
    instance[key] = Axios.prototype[key].bind(context)
  })

  // 将 Axios 实例的属性添加到 instance 上
  Object.keys(context).forEach(key => {
    instance[key] = context[key]
  })

  return instance
}

let axios = createInstance()

axios.intercepters.request.use((config) => {
  console.log('成功请求拦截器 1');
  // 需要把参树通过 promise 链传出去，否则 dispatchRequest 就拿不到参数，请求就会 rejected
  return config
}, () => console.log('失败请求拦截器 1'))

axios.intercepters.request.use((config) => {
  console.log('成功请求拦截器 2');
  return config
}, () => console.log('失败请求拦截器 2'))

axios.intercepters.response.use((res) => {
  console.log('成功响应拦截器 1');
  // 这里 res 也要传出去。否则最后也拿不到 res ，会返回 undefined
  return res
}, () => console.log('失败响应拦截器 1'))

axios.intercepters.response.use((res) => {
  console.log('成功响应拦截器 2');
  return res
}, () => console.log('失败响应拦截器 2'))

let cancel = null

const getPosts = () => {
  console.log('cancel', cancel);
  // 检测上一个请求是否完成，这个是避免同一请求频繁发起，实现请求的防抖
  if (cancel !== null) {
    // 取消上一次请求
    // 此时 cancel 就是 () => resolve(), cancel 执行，promise 就会改变状态
    cancel()
  }
  axios({
    method: 'GET',
    url: 'http://localhost:3000/posts',
    cancelToken: new axios.cancelToken((c) => {
      cancel = c
    }),
  }).then(res => {
    console.log(res);
    cancel = null
  })
}

document.querySelector('#btn1').addEventListener('click', getPosts)
document.querySelector('#btn2').addEventListener('click', () => {
  // cancel 可能是 null，也可能是函数
  cancel && cancel()
})

// 请求防抖，逻辑，第一次进去，cancel = null, 调用 cancelToken 此时把 cancel = () => resolve() 抛出来，此时，abort 处于 pending 在 xhr 中，若果，
// cancel() 执行，xhr 会 abort()

