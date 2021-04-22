<template>
  <div>
    <h2>{{this.msg}}</h2>
  </div>
</template>

<script>
  export default {
    props: {
      msg: {
        type: String,
      },
    },
    updated () {
      console.log('子组件更新');
    },
  }
</script>

<style lang="scss" scoped>

</style>