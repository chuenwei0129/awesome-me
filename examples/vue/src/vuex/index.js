let Vue
const install = (_Vue) => {
  Vue = _Vue
  Vue.mixin({
    beforeCreate() {
      console.log('当前组件实例', this);
      // 组件执行顺序 先父后子, mounted 先子后父
      if (this.$options.store) {
        this.$store = this.$options.store
      } else {
        // 一层一层往下赋值 $store
        this.$store = this.$parent && this.$parent.$store
      }
    },
  })
}

class Store {
  constructor(options) {
    // 这一步是把 store 中数据注入 vue 中，
    this.vm = new Vue({
      data: {
        state: options.state
      }
    })
  }

  get state() {
    // 写在这是为了这边可以多做操作
    return this.vm.state
  }
}

export default {install, Store}