<template>
  <div class="app">
    <h1>{{num}}</h1>
    <h2>{{$store.state.age}}</h2>
    <button @click="add"> + </button>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    console.log('App store', this.$store);
  },
  data() {
    return {
      num: 0,
    }
  },
  methods: {
    add() {
      this.num++
    }
  },
}
</script>

