<template>
    <!-- <h1>{{num}}</h1>
    <h2>{{$store.state.age}}</h2>
    <h2>{{_num}}</h2>
    <h2>{{msg}}</h2>
    <button @click="add"> + </button>
    <button @click="change"> msg </button> -->
  <div class="app">
    <father></father>
    <father></father>
  </div>
</template>

<script>
// let i = 0
// let a = 0
import Father from './Update/Father.vue'

export default {
  name: 'App',
  components: {
    Father,
  },
  // created () {
  //   console.log('create');
  // },
  // mounted() {
  //   console.log('App store', this.$store);
  // },
  // data() {
  //   return {
  //     num: 0,
  //     msg: 'hello world'
  //   }
  // },
  // watch: {
  //   msg() {
  //     console.log('watch 执行次数', ++i);
  //   }
  // },
  // computed: {
  //   _num() {
  //     // 初始化页面时会执行一次，然后缓存
  //     // 用户 watcher > computed > 渲染 watcher
  //     console.log('计算属性执行在组件 mounted 之前执行 create 之后执行，方便处理数据', ++a);
  //     return this.num * 2 + this.msg
  //   }
  // },
  // methods: {
  //   add() {
  //     this.num++
  //   },
  //   change() {
  //     this.msg = 'hello vue'
  //   }
  // },
}
</script>

