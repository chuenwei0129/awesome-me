let data = {
	msg: 'hello vue',
}

class Watcher {
  constructor(data, k, v) {
    this.k = k
    this.v = v
    this.data = data
    console.log('初始化数据', this.v);
  }
  update() {
    console.log('老数据', this.v);
    // 这里有 bug 多次 new watcher
    console.log('更新数据', this.data[this.k]);
  }
}

// 一对多
class Dep {
  constructor() {
    this.watcherPools = []
  }
  attach(watcher) {
    this.watcherPools.push(watcher)
  }
  notify() {
    this.watcherPools.forEach(watcher => watcher.update())
  }
}

function reactive(data) {
 // 遍历对象，对对象的每个属性都使用defineProperty
	for (let [k, v] of Object.entries(data)) {
    // 依赖收集
    const dep = new Dep()
		if (typeof v === 'object' && v !== null) reactive(v)
		Object.defineProperty(data, k, {
			get() {
				console.log(`属性 ${k} 被代理`);
        // new Watcher() 观察的是 dom 依赖的响应式 data 的状态，给每个属性都建立了依赖收集
        // dep.attach(new Watcher(this, k, v)) 这么写会导致取值时，new Watcher(this, k, v) 多执行，Dep.target 的原因
        // 这里便于理解就不处理了
        dep.attach(new Watcher(this, k, v))
				return v
			},
			set(newV) {
				if (typeof newV === 'object' && newV !== null) reactive(newV)
				console.log(`属性 ${k} 数据发生改变，原值为 ${v}，新值为 ${newV}`);
				v = newV
        // 可以传参也可以不传，this 中都可以取到，这里便于理解
        dep.notify()
			}
		})
	}
	return data
}

let proxyData = reactive(data)

// 第一次渲染 proxyData.msg，并建立观察者
proxyData.msg

// 更新 msg
proxyData.msg = 'hello world'