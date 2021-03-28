import $ from 'jquery'
import utils from './util'

// 懒加载
const btn = document.getElementById('root')

btn.addEventListener('click', () => {
	import(
		/* webpackPrefetch: true */
		/* webpackChunkName: "scope" */
		'./scope').then(res => {
		console.log('懒加载', res.default)
	})
}, true)

console.log($, utils)

// 缓存复用了 utils
// 代码没有分割