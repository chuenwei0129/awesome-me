import Vue from 'vue'
import App from './App.vue'
// 导出 Vuex 中必须要有 install 函数
import Vuex from './vuex'

Vue.config.productionTip = false

// 把 Vue 构造函数传入 install 中并执行
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		age: 28
	}
})

const vm = new Vue({
	mounted() {
		console.log('vm store', this.$store)
	},
	// 注入根 store 然后根据 $parent 注入子 $store
	store,
	render: h => h(App)
}).$mount('#app')

// 此时 #app 已经被替换
// 它没有 $el，也没有 $parent, $root 指向自己
const UserExtend = Vue.extend()
const extend = new UserExtend({name: 'extend', render(h) {
	return h('h1', {}, 'hello world')
}}).$mount(document.querySelector('.app'))

// 它会替dom节点

console.log('vue 根实例', vm.$el)
console.log('自定义 extend 组件', extend.$el)

// 每个组件中的 this 都不同
