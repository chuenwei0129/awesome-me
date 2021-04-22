<template>
  <div>
    <h1>{{fatherMsg}}</h1>
    <son :msg="fatherMsg"></son>
    <button @click="changeMsg"> msg </button>
  </div>
</template>

<script>
import Son from './Son.vue'
  export default {
    components: {
      Son,
    },
    updated () {
      console.log('父组件更新');
    },
    data() {
      return {
        fatherMsg: 'fatherMsg'
      }
    },
    methods: {
      changeMsg() {
        this.$forceUpdate()
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>