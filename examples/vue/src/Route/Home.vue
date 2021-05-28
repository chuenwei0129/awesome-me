<template>
  <div>
    <h1>测试 watcher 生命周期</h1>
    <h2 key="Symbol(`HomeData`)">{{ HomeData }} {{ cHomeData }}</h2>
    <!-- 动态组件重渲染，路由组件重渲染 -->
    <transition name="fade" mode="out-in" appear>
      <keep-alive>
        <component :is="cCurrentView"></component>
      </keep-alive>
    </transition>
    <button @click="handleAdd">+</button>
    <Gx @hook:mounted="doS"></Gx>
  </div>
</template>

<script>
import Gx from './G.vue'
import F from './F.vue'

export default {
  components: {
    Gx,
    F
  },
  data() {
    return {
      HomeData: localStorage.getItem('VUE'),
      isF: true
    }
  },
  computed: {
    cHomeData() {
      console.log(`Home computed`)
      return this.HomeData
    },
    cCurrentView() {
      return this.isF ? 'F' : 'Gx'
    }
  },
  // 自定义 watch 在 created 之前执行，在初始化数据之后
  watch: {
    HomeData: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        console.log(`Home watch`, newValue, oldValue)
      }
    }
  },
  beforeCreate() {
    console.log(`Home beforeCreate`, this)
    localStorage.setItem('VUE', 0)
  },
  async created() {
    console.log(`Home created`, this.$data.HomeData)
    await new Promise(() => {})
    console.log(`异步阻塞`)
    this.fetchData()
  },
  mounted() {
    console.log(`Home mounted`)
    this.$nextTick(() => {
      console.log(`Home nextTick`)
    })
  },
  methods: {
    handleAdd() {
      this.HomeData++
      this.isF = !this.isF
    },
    async fetchData() {
      const data = await new Promise(resolve => {
        setTimeout(() => {
          resolve(1)
        }, 1000)
      })
      // 模拟异步请求
      this.HomeData = data
    },
    doS() {
      console.log('子组件生命周期')
    }
  }
}
</script>

<style scoped>
.fade-enter {
  display: block;
}
.fade-enter-active {
  display: none;
}
</style>
