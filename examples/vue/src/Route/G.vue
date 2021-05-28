<template>
  <div>
    <h1>爷爷组件</h1>
    <F></F>
  </div>
</template>

<script>
import F from './F'
export default {
  name: 'Gx',
  components: {
    F
  },
  mounted() {
    console.log(`Gx mounted`)
  }
}
</script>

<style lang="scss" scoped></style>
