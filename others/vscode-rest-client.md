# REST Client —— 接口测试插件

```js
// 获取 users 数据
GET http://127.0.0.1:3000/users

// id 比较特殊
// 第一种方法：获取 users 属性当中 id 为 2 的数据
GET http://127.0.0.1:3000/users/2
// 第二种方法：获取 users 属性当中 id 为 3 的数据
GET http://127.0.0.1:3000/users?id=3

// 单条件查找：获取 users 属性 sex 为 男 的数据
GET http://127.0.0.1:3000/users?sex=男
// 多条件查找：获取 users 属性 sex 为 男 的数据，年龄 18 的数据
GET http://127.0.0.1:3000/users?sex=男&age=18

// q 全局搜索（模糊查询）：查询 users 所有属性值中包含喝的数据
GET http://127.0.0.1:3000/users?q=喝

// 可以用 . 访问更深层的属性：查询 users 属性 address 的属性 region 为 华南 的数据
GET http://127.0.0.1:3000/users?address.region=华南

// 通过  _limit=5 截取前 5 条记录, 实现对数据的分页：将 users 每页显示 5 条记录，_page=1 查询第 1 页内容
GET http://127.0.0.1:3000/users?_limit=5&_page=1

// 通过 _sort 与 _order 对数据进行排序。 _sort 指定排序的属性，_order 指定排序的类型（asc为升序，desc为降序）
GET http://127.0.0.1:3000/users?_sort=age&_order=asc
// 多条件排序：年龄相同按 id 的升序排列：
GET http://127.0.0.1:3000/users?_sort=age,id&_order=desc,asc

// 通过_start、_end、_limit 对数据进行截取。
// 截取 [0, 3) 的记录，从 0 开始计数
GET http://127.0.0.1:3000/users?_start=0&_end=3
// 从第 2 条记录开始截取 5 条记录
GET http://127.0.0.1:3000/users?_start=1&_limit=5

// 通过操作符 _gte（大于等于）， _lte（小于等于）, _ne（不等于）, _like（模糊查询）获得数据
GET http://127.0.0.1:3000/users?age_gte=20

// json-server id 默认会自动生成自增 id，可以不传
// application/x-www-form-urlencoded 格式传参
POST http://127.0.0.1:3000/users
Content-Type: application/x-www-form-urlencoded

name=小明&age=18

// Content-Type: application/json 格式传参
POST http://127.0.0.1:3000/users
Content-Type: application/json

{
  "name": "小明",
  "age": 18
}

// 删除 id 为 11 的数据
DELETE http://127.0.0.1:3000/users/11

// 通过 patch 请求，将 id 为 8 的 user 属性 name 修改为张八
// patch 为局部修改
PATCH http://127.0.0.1:3000/users/8
Content-Type: application/json

{
  "name": "张八"
}
```
