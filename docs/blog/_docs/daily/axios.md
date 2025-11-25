---
title: axios 文档
toc: content
---

## 请求

以下是创建请求时可以使用的配置选项。**除 `url` 外，所有选项都是可选的。如果未指定 `method`，请求默认为 `get` 方法**。

```js
{
  // 请求的服务器 URL
  url: '/user',

  // 请求使用的方法（默认是 'get'）
  method: 'get', // default

  // 基础 URL，会自动添加在 `url` 前面，除非 `url` 是绝对路径
  baseURL: 'https://some-domain.com/api/',

  // 请求发送前修改请求数据，只能用于 'PUT', 'POST' 和 'PATCH'
  transformRequest: [function (data, headers) {
    return data; // 可以对数据进行转换处理
  }],

  // 响应接收前修改响应数据
  transformResponse: [function (data) {
    return data; // 可以对数据进行转换处理
  }],

  // 自定义请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // URL 参数，必须是无格式对象或 URLSearchParams 对象
  params: {
    ID: 12345
  },

  // 参数序列化函数（例如：使用 Qs 库）
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // 请求主体数据，仅适用于 'PUT', 'POST', 'PATCH'
  data: {
    firstName: 'Fred'
  },

  // 请求超时时间（毫秒），默认为 0 表示无超时
  timeout: 1000,

  // 跨域请求时是否携带凭证
  withCredentials: false, // default

  // 自定义请求处理，返回一个 promise 并应用有效的响应
  adapter: function (config) {
    /* ... */
  },

  // HTTP 基础验证凭据，会设置 `Authorization` 头
  auth: {
    username: '',
    password: ''
  },

  // 响应数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default

  // 响应解码使用的编码，仅适用于非 'stream' 或客户端请求
  responseEncoding: 'utf8', // default

  // 用作 xsrf token 值的 cookie 名称
  xsrfCookieName: 'XSRF-TOKEN', // default

  // 携带 xsrf token 值的 http 头名称
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

  // 上传进度事件处理
  onUploadProgress: function (progressEvent) {
    // 处理上传进度
  },

  // 下载进度事件处理
  onDownloadProgress: function (progressEvent) {
    // 处理下载进度
  },

  // 响应内容的最大尺寸
  maxContentLength: 2000,

  // HTTP 状态码验证函数，如果返回 `true` 则 resolve，否则 reject
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },

  // 最大重定向次数，0 表示不 follow 重定向
  maxRedirects: 5, // default

  // UNIX Socket 路径，仅 Node.js 中使用
  socketPath: null, // default

  // Http 和 Https 代理配置
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // 代理服务器配置，设置 HTTP 基础验证凭据会设置 `Proxy-Authorization` 头
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: '',
      password: ''
    }
  },

  // 用于取消请求的 token
  cancelToken: new CancelToken(function (cancel) {
  })
}
```

## 响应

请求的响应包含以下信息：

```js
{
  // 服务器提供的响应数据
  data: {},

  // 服务器响应的 HTTP 状态码
  status: 200,

  // 服务器响应的 HTTP 状态信息
  statusText: 'OK',

  // 服务器响应头
  headers: {},

  // 请求提供的配置信息
  config: {},

  // 生成此响应的请求实例
  request: {}
}
```

## 配置默认值

可以为所有请求指定配置默认值：

### 全局默认值

```js
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

### 自定义实例默认值

```js
// 创建实例时设置默认配置
const instance = axios.create({
  baseURL: 'https://api.example.com'
});

// 创建实例后修改默认值
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
```

### 配置优先顺序

配置按以下优先顺序合并：库的默认值 (`lib/defaults.js`)，实例默认值 (`defaults` 属性)，请求配置 (`config` 参数)。请求配置优先级最高。例如：

```js
// 使用库的默认值创建实例（如超时默认值是 `0`）
var instance = axios.create();

// 覆盖默认超时设置，所有请求超时为 2.5 秒
instance.defaults.timeout = 2500;

// 覆盖特定请求的超时设置
instance.get('/longRequest', {
  timeout: 5000
});
```

## 并发请求

```js
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

// axios.all(iterable)
// axios.spread(callback)

axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // 两个请求都已完成
  }));
```

## 创建实例

可以使用自定义配置创建 `axios` 实例，每个实例都有自己的配置：

```js
// axios.create([config])
const instance1 = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foo'}
});

const instance2 = axios.create({
  baseURL: 'https://else-domain.com/api/',
  timeout: 2000,
  headers: {'X-Custom-Header': 'bar'}
});
```

## 手写 axios

### axios 对象创建

```js
function Axios(config) {
  this.defaults = config;
  this.interceptors = {
    request: {},
    response: {}
  };
}

Axios.prototype.request = function (config) {
  // 发送请求
  console.log(`请求的类型为 ${config.method}`);
}

Axios.prototype.get = function (config) {
  // 发送 get 请求
  return this.request(config);
}

Axios.prototype.post = function (config) {
  // 发送 post 请求
  return this.request(config);
}

function createInstance(config) {
  let context = new Axios(config);

  let instance = Axios.prototype.request.bind(context);

  Object.keys(Axios.prototype).forEach(key => {
    instance[key] = Axios.prototype[key].bind(context);
  });

  Object.keys(context).forEach(key => {
    instance[key] = context[key];
  });

  return instance;
}

let axios = createInstance({method: 'GET'});

console.log('axios', axios);
```

### 发送请求

```js
Axios.prototype.request = function (config) {
  // 合并配置处理

  let promise = Promise.resolve(config);

  let chains = [dispatchRequest, undefined]; // undefined 占位

  return promise.then(chains[0], chains[1]);
}

function dispatchRequest(config) {
  return xhr(config);
}

function xhr(config) {
  const { method, url } = config;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve({
          config,
          data: xhr.response,
          headers: xhr.getAllResponseHeaders(),
          xhr,
          status: xhr.status,
          statusText: xhr.statusText
        });
      } else {
        reject(new Error('请求失败'));
      }
    };
  });
}
```

### 拦截器

```js
function Axios(config) {
  this.defaults = config;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

function InterceptorManager() {
  this.handlers = [];
}

InterceptorManager.prototype.use = function (onFulfilled, onRejected) {
  this.handlers.push({ onFulfilled, onRejected });
}

Axios.prototype.request = function (config) {
  let promise = Promise.resolve(config);

  let chains = [dispatchRequest, undefined];

  this.interceptors.request.handlers.forEach(({ onFulfilled, onRejected }) => {
    chains.unshift(onFulfilled, onRejected);
  });

  this.interceptors.response.handlers.forEach(({ onFulfilled, onRejected }) => {
    chains.push(onFulfilled, onRejected);
  });

  while (chains.length) {
    promise = promise.then(chains.shift(), chains.shift());
  }

  return promise;
}

function dispatchRequest(config) {
  return http(config);
}

function http(config) {
  const { method, url } = config;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve({
          config,
          data: xhr.response,
          headers: xhr.getAllResponseHeaders(),
          xhr,
          status: xhr.status,
          statusText: xhr.statusText
        });
      } else {
        reject(new Error('请求失败'));
      }
    };
  });
}

Axios.prototype.get = function (config) {
  return this.request(config);
}

Axios.prototype.post = function (config) {
  return this.request(config);
}

function createInstance(config) {
  let context = new Axios(config);

  let instance = Axios.prototype.request.bind(context);

  Object.keys(Axios.prototype).forEach(key => {
    instance[key] = Axios.prototype[key].bind(context);
  });

  Object.keys(context).forEach(key => {
    instance[key] = context[key];
  });

  return instance;
}

let axios = createInstance();

axios.interceptors.request.use(config => {
  console.log('成功请求拦截器 1');
  return config;
}, () => console.log('失败请求拦截器 1'));

axios.interceptors.request.use(config => {
  console.log('成功请求拦截器 2');
  return config;
}, () => console.log('失败请求拦截器 2'));

axios.interceptors.response.use(res => {
  console.log('成功响应拦截器 1');
  return res;
}, () => console.log('失败响应拦截器 1'));

axios.interceptors.response.use(res => {
  console.log('成功响应拦截器 2');
  return res;
}, () => console.log('失败响应拦截器 2'));

axios({
  method: 'GET',
  url: 'http://localhost:3000/posts'
}).then(res => {
  console.log(res);
});
```

### 取消请求

```js
function Axios(config) {
  this.defaults = config;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

function InterceptorManager() {
  this.handlers = [];
}

InterceptorManager.prototype.use = function (onFulfilled, onRejected) {
  this.handlers.push({ onFulfilled, onRejected });
}

Axios.prototype.request = function (config) {
  let promise = Promise.resolve(config);

  let chains = [dispatchRequest, undefined];

  this.interceptors.request.handlers.forEach(({ onFulfilled, onRejected }) => {
    chains.unshift(onFulfilled, onRejected);
  });

  this.interceptors.response.handlers.forEach(({ onFulfilled, onRejected }) => {
    chains.push(onFulfilled, onRejected);
  });

  while (chains.length) {
    promise = promise.then(chains.shift(), chains.shift());
  }

  return promise;
}

Axios.prototype.cancelToken = function(exec) {
  let resolvePromise = null;

  this.abort = new Promise((resolve) => {
    resolvePromise = resolve;
  });

  exec(() => resolvePromise());
}

function dispatchRequest(config) {
  return http(config);
}

function http(config) {
  const { method, url } = config;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.send();

    if (config.cancelToken) {
      config.cancelToken.abort.then(() => {
        xhr.abort();
      });
    }

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve({
          config,
          data: xhr.response,
          headers: xhr.getAllResponseHeaders(),
          xhr,
          status: xhr.status,
          statusText: xhr.statusText
        });
      } else {
        reject(new Error('请求失败'));
      }
    };
  });
}

Axios.prototype.get = function (config) {
  return this.request(config);
}

Axios.prototype.post = function (config) {
  return this.request(config);
}

function createInstance(config) {
  let context = new Axios(config);

  let instance = Axios.prototype.request.bind(context);

  Object.keys(Axios.prototype).forEach(key => {
    instance[key] = Axios.prototype[key].bind(context);
  });

  Object.keys(context).forEach(key => {
    instance[key] = context[key];
  });

  return instance;
}

let axios = createInstance();

axios.interceptors.request.use(config => {
  console.log('成功请求拦截器 1');
  return config;
}, () => console.log('失败请求拦截器 1'));

axios.interceptors.request.use(config => {
  console.log('成功请求拦截器 2');
  return config;
}, () => console.log('失败请求拦截器 2'));

axios.interceptors.response.use(res => {
  console.log('成功响应拦截器 1');
  return res;
}, () => console.log('失败响应拦截器 1'));

axios.interceptors.response.use(res => {
  console.log('成功响应拦截器 2');
  return res;
}, () => console.log('失败响应拦截器 2'));

let cancel = null;

const getPosts = () => {
  if (cancel !== null) {
    cancel(); // 取消上一次请求
  }
  axios({
    method: 'GET',
    url: 'http://localhost:3000/posts',
    cancelToken: new axios.cancelToken((c) => {
      cancel = c;
    }),
  }).then(res => {
    console.log(res);
    cancel = null;
  });
}

document.querySelector('#btn1').addEventListener('click', getPosts);
document.querySelector('#btn2').addEventListener('click', () => {
  if (cancel && typeof cancel === 'function') {
    cancel();
  }
});
```
