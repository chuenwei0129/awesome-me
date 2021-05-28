<template>
  <!-- <h1>{{num}}</h1>
    <h2>{{$store.state.age}}</h2>
    <h2>{{_num}}</h2>
    <h2>{{msg}}</h2>
    <button @click="add"> + </button>
    <button @click="change"> msg </button> -->
  <div class="app">
    <!-- <father></father>
    <father></father> -->
    <!-- <router-link to="/">Home</router-link>
    <router-link to="/about/1">About1</router-link>
    <router-link to="/about/3">About2</router-link> -->
    <!-- <h1>hello world</h1> -->

    <!-- <h1>{{ num }}</h1>
    <h2>{{ _num }}</h2>
    <button @click="add">+</button> -->

    <!-- 提醒一下，当使用路由参数时，例如从 /user/foo 导航到 /user/bar，两个详情页跳转
    原来的组件实例会被复用。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。
    不过，这也意味着组件的生命周期钩子不会再被调用。 -->

    <!-- watch $route 即可解决或者，渲染 watcher 重渲染 或者 beforeRouteUpdate -->

    <router-view></router-view>
  </div>
</template>

//
<script>
// let i = 0
// let a = 0
// // import Father from './Update/Father.vue'

// export default {
//   name: 'App',
//   // components: {
//   //   Father,
//   // },
//   // created () {
//   //   console.log('create');
//   // },
//   // mounted() {
//   //   console.log('App store', this.$store);
//   // },
//   data() {
//     return {
//       num: 0,
//       taskList: []
//       // msg: 'hello world'
//     }
//   },
//   beforeCreate() {
//     Promise.resolve().then(() => {
//       console.log('不执行2')
//     })
//     // await new Promise((resolve) => {
//     //   this.taskList.push(resolve) // 锁
//     // })
//     // async created 不会阻塞 渲染，因为 promise 之间是并行的，不会发生阻塞，watcher队列是一个promise，created await的也是一个 promise
//     // promise 之间是并行的，阻塞 await 只是 await 后面的，事件循环遇到 promise 就先执行 同步代码
//     // create是 watcher.before(), run()是 render()，mounted
//     console.log('永远不执行')
//   },
//   mounted() {
//     console.log('mounted')
//     // 相当于队列里最后一个 watcher，在 比生命周期里的 promise 高一层
//     this.$nextTick(console.log('this.$nextTick'))
//   },
//   updated() {
//     console.log('渲染 watcher 更新')
//   },
//   watch: {
//     num() {
//       console.log('用户 watch 执行次数', ++i)
//     }
//   },
//   computed: {
//     _num() {
//       // 初始化页面时会执行一次，然后缓存
//       // 用户 watcher > computed > 渲染 watcher
//       console.log(
//         '计算属性执行在组件 mounted 之前执行 create 之后执行，方便处理数据',
//         ++a
//       )
//       return this.num * 2
//     }
//   },
//   methods: {
//     add() {
//       // 相当于一次 +3，和 react 不同，react 会合并
//       this.num++
//       this.num++
//       this.num++
//     },
//     change() {
//       this.msg = 'hello vue'
//     }
//   }
// }
//
</script>
