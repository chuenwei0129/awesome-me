const Mock = require('mockjs')

// 在服务端使用 不可以使用 mock.setup
// 客户端直接就可以使用 mockjs
// 当需要引入，有沁入心

Mock.Random.extend({
  roles: function () {
    return this.pick(['开发', '测试', '产品', '运营'])
  }
})

module.exports = () =>
  Mock.mock({
    'users|20': [
      {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1,
        name: '@cname',
        'age|22-40': 1,
        roles: '@roles'
      }
    ]
  })
