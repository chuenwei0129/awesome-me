import Vue from 'vue'
import VueRouter from 'vue-router'
// 定义 (路由) 组件。
// 可以从其他文件 import 进来
import Home from '../Route/Home'

Vue.use(VueRouter)

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

export default router
