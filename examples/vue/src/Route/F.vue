<template>
  <div>
    <h1>父亲组件</h1>
    <S></S>
  </div>
</template>

<script>
import S from './S'
export default {
  name: 'F',
  components: {
    S
  },
  mounted() {
    console.log('F mounted')
  }
}
</script>

<style lang="scss" scoped></style>
