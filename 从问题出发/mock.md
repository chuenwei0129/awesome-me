# json-server 简易入门<!-- omit in toc -->

- [安装](#安装)
- [起步](#起步)
- [启动参数](#启动参数)
- [随机生成模拟数据](#随机生成模拟数据)
- [自定义配置文件](#自定义配置文件)
- [REST 增删改查](#rest-增删改查)
- [路由配置](#路由配置)
- [其他高级用法](#其他高级用法)
  - [自定义路由](#自定义路由)
  - [自定义输出内容](#自定义输出内容)
  - [自定义用户校验](#自定义用户校验)

## 安装

```sh
npm install -g json-server
```

## 起步

`db.json` 文件的内容：

```json
{
  "posts": [{ "id": 1, "title": "json-server", "author": "acc" }],
  "comments": [{ "id": 1, "body": "some comment", "postId": 1 }],
  "profile": { "name": "acc" }
}
```

运行以下命令，把 `db.json` 文件托管成一个 web 服务。

```sh
json-server --watch --port 8090 db.json
```

输出以下内容，说明启动成功。

```js
\{^_^}/ hi!

Loading db.json
Done

Resources
http://localhost:8090/posts
http://localhost:8090/comments
http://localhost:8090/profile

Home
http://localhost:8090

Type s + enter at any time to create a snapshot of the database
Watching...
```

此时，你可以打开你的浏览器，然后输入：<http://localhost:8090> 测试。

## 启动参数

```sh
json-server [options] <source>

Options:
  --config, -c       Path to config file           [default: "json-server.json"]
  --port, -p         Set port                                    [default: 3000]
  --host, -H         Set host                             [default: "localhost"]
  --watch, -w        Watch file(s)                                     [boolean]
  # 自定义路由
  --routes, -r       Path to routes file
  --middlewares, -m  Paths to middleware files                           [array]
  --static, -s       Set static files directory
  --read-only, --ro  Allow only GET requests                           [boolean]
  # 跨域
  --no-cors, --nc    Disable Cross-Origin Resource Sharing             [boolean]
  --no-gzip, --ng    Disable GZIP Content-Encoding                     [boolean]
  --snapshots, -S    Set snapshots directory                      [default: "."]
  # 请求响应时间
  --delay, -d        Add delay to responses (ms)
  # 自定义 id
  --id, -i           Set database id property (e.g. _id)         [default: "id"]
  --foreignKeySuffix, --fks  Set foreign key suffix, (e.g. _id as in post_id)
                                                                 [default: "Id"]
  --quiet, -q        Suppress log messages from output                 [boolean]
  --help, -h         Show help                                         [boolean]
  --version, -v      Show version number                               [boolean]

Examples:
  json-server db.json -c setting.json -H 127.0.0.1
  json-server file.js --routes route.json -d 2000
  json-server http://example.com/db.json

https://github.com/typicode/json-server
```

## 随机生成模拟数据

启动命令：`json-server --watch db.js` 是把一个 js 文件返回的数据托管成 web 服务。

配合 [mockjs](https://github.com/nuysoft/Mock/wiki) 库（仅使用其随机生成数据功能）可以很方便生成模拟数据。

**mockjs 语法规则：**

数据模板中的每个属性由 3 部分构成：属性名、生成规则、属性值：

```js
// 属性名      name
// 生成规则    rule
// 属性值      value
'name|rule': value
```

**⚠️ 注意：**

- **属性名** 和 **生成规则** 之间用竖线 `|` 分隔。
- 生成规则 **是可选的**。
- 生成规则需要依赖 **属性值的类型** 才能确定。
- 属性值中可以含有 **@占位符**。
- 属性值指定了最终值的初始值和类型（+1）。

**生成规则和示例：**

```js
// 仅使用 mockjs 生成随机数据

const Mock = require('mockjs')

// 自定义占位符
const Random = Mock.Random
Random.extend({
  animals() {
    // shuffle 打乱数组
    return this.shuffle(['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'])
  },
  hobby() {
    return this.pick(['抽烟', '喝酒', '烫头'])
  }
})

module.exports = () => {
  return Mock.mock({
    // 通过重复属性值 array 生成一个新数组，重复次数为 count。
    // 通过重复属性值 array 生成一个新数组，重复次数大于等于 min，小于等于 max。
    'users|10': [
      {
        // 属性值自动加 1，初始值为 number。
        // 生成一个大于等于 min、小于等于 max 的整数，属性值 number 只是用来确定类型。
        'id|+1': 1,

        // 通过重复 string 生成一个字符串，重复次数等于 count。
        // 通过重复 string 生成一个字符串，重复次数大于等于 min，小于等于 max。
        'slogan|3': 'go',

        // 随机生成一个布尔值，值为 value 的概率是 min / (min + max)，值为 !value 的概率是 max / (min + max)。
        // 1 ==> 1/2
        'is_happy|1-5': true,

        'sex|1': ['男', '女'],

        /** 占位符 */
        name: '@cname',
        // 从属性值 object 中随机选取 count 个属性。
        // 从属性值 object 中随机选取 min 到 max 个属性。
        address: {
          // 大区
          region: '@region',
          // 省
          province: '@city',
          // 市
          city: '@city(true)',
          // 县
          county: '@county(true)',
          // 街道：从属性值 array 中随机选取 1 个元素，作为最终值。
          'street|1': ['东路', '西路', '南路']
        },
        // 年龄
        'age|18-60': 1,
        // 身份证
        id_card: '@id',
        // 邮箱
        email: '@email(google.com)',
        // ip
        ip: '@ip',
        // 手机号
        phone: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
        // 指示生成的日期和时间字符串的格式。默认值为 yyyy-MM-dd HH:mm:ss。
        birthday: '@datetime("yyyy-MM-dd")',
        current_time: '@now',
        // text 规则类似 new Array
        word: '@cword()',
        sentence: '@csentence(3, 5)',
        paragraph: '@cparagraph(3, 7)',
        title: '@ctitle()',
        // image 背景 前景
        image: '@image(200x100, #4A7BF7, #fff, png, hello world)',
        animals: '@animals',
        'hobby|1': '@hobby'
      }
    ]
  })
}
```

## 自定义配置文件

通过命令行配置路由、数据文件、监控等会让命令变的很长，而且容易敲错，可以把命令写到 npm 的 scripts 中，但是依然配置不方便。

json-server 允许我们把所有的配置放到一个配置文件中，这个配置文件默认 `json-server.json`

例如:

```json
{
  "port": 80, // 自定义服务监听端口
  "watch": true, // 服务监听
  "host": "api.xxx.com", // 指定域
  "static": "./public", // 静态文件目录，可以将项目的 HTML, JS, IMG 等资源放在这里
  "read-only": false, // 是否只允许 get 请求
  "no-cors": false, // 是否允许跨域访问
  "no-gzip": false, // 是否可压缩
  "routes": "route.json" // 自定义路由，这个配置可以暂时省略，后续会有所涉及
}
```

使用配置文件启动 json-server:

```sh
# 默认使用：json-server.json 配置文件
json-server --watch app.js

# 指定自定义配置文件 setting.json
json-server --watch -c setting.json db.json
```

## REST 增删改查

配合 [VSCode REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) 插件测试接口

```sh
### 获取 users 数据
GET http://127.0.0.1:3000/users

### id 比较特殊
### 第一种方法：获取 users 属性当中 id 为 2 的数据
GET http://127.0.0.1:3000/users/2
### 第二种方法：获取 users 属性当中 id 为 3 的数据
GET http://127.0.0.1:3000/users?id=3

### 单条件查找：获取 users 属性 sex 为 男 的数据
GET http://127.0.0.1:3000/users?sex=男
### 多条件查找：获取 users 属性 sex 为 男 的数据，年龄 18 的数据
GET http://127.0.0.1:3000/users?sex=男&age=18

### q 全局搜索（模糊查询）：查询 users 所有属性值中包含喝的数据
GET http://127.0.0.1:3000/users?q=喝

### 可以用 . 访问更深层的属性：查询 users 属性 address 的属性 region 为 华南 的数据
GET http://127.0.0.1:3000/users?address.region=华南

### 通过  _limit=5 截取前 5 条记录, 实现对数据的分页：将 users 每页显示 5 条记录，_page=1 查询第 1 页内容
GET http://127.0.0.1:3000/users?_limit=5&_page=1

### 通过 _sort 与 _order 对数据进行排序。 _sort 指定排序的属性，_order 指定排序的类型（asc为升序，desc为降序）
GET http://127.0.0.1:3000/users?_sort=age&_order=asc
### 多条件排序：年龄相同按 id 的升序排列：
GET http://127.0.0.1:3000/users?_sort=age,id&_order=desc,asc

### 通过_start、_end、_limit 对数据进行截取。
### 截取 [0, 3) 的记录，从 0 开始计数
GET http://127.0.0.1:3000/users?_start=0&_end=3
### 从第 2 条记录开始截取 5 条记录
GET http://127.0.0.1:3000/users?_start=1&_limit=5

### 通过操作符 _gte（大于等于）， _lte（小于等于）, _ne（不等于）, _like（模糊查询）获得数据
GET http://127.0.0.1:3000/users?age_gte=20

### json-server id 默认会自动生成自增 id，可以不传
### application/x-www-form-urlencoded 格式传参
POST http://127.0.0.1:3000/users
Content-Type: application/x-www-form-urlencoded

name=小明&age=18

### Content-Type: application/json 格式传参
POST http://127.0.0.1:3000/users
Content-Type: application/json

{
  "name": "小明",
  "age": 18
}

### 删除 id 为 11 的数据
DELETE http://127.0.0.1:3000/users/11

### 通过 patch 请求，将 id 为 8 的 user 属性 name 修改为张八
### patch 为局部修改
PATCH http://127.0.0.1:3000/users/8
Content-Type: application/json

{
  "name": "张八"
}
```

## 路由配置

创建 `route.json` 文件，可对路由进行如下配置：

```js
{
//  /data/data1  ==>  /data1
  "/data/*": "/$1",
//  /data1/001/show ==> /data1/001
  "/:resource/:id/show": "/:resource/:id",
//  /data1/Sherry ==> /data1?name=Sherry
  "/data1/:name": "/data1?name=:name",
//  /data1?id=002 ==> /data/002
  "/:anyArray\\?id=:id": "/:anyArray/:id"
}
```

## 其他高级用法

`json-server` 本身就是依赖 express 开发而来，可以进行深度定制。细节就不展开，具体详情请参考[官网](https://github.com/typicode/json-server)。

### 自定义路由

```js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  next()
})

server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
```

### 自定义输出内容

```js
router.render = (req, res) => {
  res.jsonp({
    body: res.locals.data
  })
}
```

### 自定义用户校验

```js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use((req, res, next) => {
  if (isAuthorized(req)) {
    // add your authorization logic here
    next() // continue to JSON Server router
  } else {
    res.sendStatus(401)
  }
})

server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
```
