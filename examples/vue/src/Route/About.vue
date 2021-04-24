<template>
  <div>
    <h1>About</h1>
    <!-- <h2>{{$route.params.id}}</h2> -->
  </div>
</template>

<script>
  export default {
    mounted () {
      console.log('组件挂载', this.$route.params.id);
    },
    updated () {
      console.log('组件更新', this.$route.params.id);
    },
    // beforeRouteUpdate () {
    //   // 会拦截 id 的更新 http://localhost:8080/#/about/3 不再变化
    //   console.log('路由更新');
    // },

//     // 给出一个路由 { path: '/user-*' }
// this.$router.push('/user-admin')
// this.$route.params.pathMatch // 'admin'
// // 给出一个路由 { path: '*' }
// this.$router.push('/non-existing')
// this.$route.params.pathMatch // '/non-existing'

  }
</script>

<style lang="scss" scoped>

</style>