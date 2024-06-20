## 观察者模式

观察者模式一般有观察者和被观察者。举个例子：大家在学校上自习的时候，等老师走了有些人会玩手机、吃零食、交头接耳找隔壁妹妹聊天，但是被老师发现可就不好了，所以大家想了一个招，让坐在最后排的同学帮忙“放风”，老师一来就给大家一个手势通知大家，大家就继续装好好学生（哈嘿）。

![20240602002435](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240602002435.png)

这其实就是一个典型的观察者模式，“放风”的同学是被观察者，玩手机、吃零食的同学是观察者，大家都在观察“放风”同学的手势，一旦老师来了，被观察者就会通知大家。

观察者模式：

```js
// 观察者模式

class Subject {
  constructor() {
    this.observers = []
  }

  addObserver(observer) {
    this.observers.push(observer)
  }

  removeObserver(observer) {
    this.observers = this.observers.filter((item) => item !== observer)
  }

  notify(data) {
    this.observers.forEach((item) => item.update(data))
  }
}

class Observer {
  constructor(name) {
    this.name = name
  }

  update(data) {
    console.log(`${this.name}收到消息：${data}`)
  }
}
```

## 发布订阅模式

举个生活中的例子，比如我们想要订阅一份国家地理杂志，一般需要我们先向邮局申请（付钱），告诉邮局我要订阅这份杂志，苦等数日杂志终于印刷好了，这个时候我们不会直接跑到印刷厂里去，而是等印刷厂将杂志送给邮局，然后邮局才会慢吞吞地将杂志送到家（推模式），如果你实在等不及了跑到邮局直接取杂志，恭喜你学会了“拉模式”。

![20240602002704](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240602002704.png)

在发布订阅模式里`发布者`并不会直接通知`订阅者`，换句话说`发布者`和`订阅者`彼此互不感知。

那`发布者`和订阅者如何交流呢？答案是通过中间的调度中心。

- 发布者将消息发送给调度中心，告诉它你帮我把消息放到 Topic1 中。
- 订阅者告诉调度中心，我需要订阅 topic1，你帮我留意一下。
- 当有消息来了，订阅者可以采取拉模式或者推模式来获取消息。

```js
// 发布订阅模式
class EventEmitter {
  constructor() {
    this.eventPools = []
    this.caches = {}
  }

  on(eventName, eventFn) {
    if (eventName in this.caches) {
      eventFn(...this.caches[eventName])
    } else {
      this.eventPools.push({ [eventName]: eventFn })
    }
  }

  emit(eventName, ...args) {
    this.eventPools.forEach((event) => {
      if (event[eventName]) {
        event[eventName](...args)
      } else {
        this.caches[eventName] = [...args]
      }
    })
  }

  off(eventName) {
    for (const [idx, event] of this.eventPools.entries()) {
      if (event.hasOwnProperty(eventName)) {
        this.eventPools.splice(idx, 1)
      }
    }
  }

  once(eventName, eventFn) {
    const eventFnOnce = (...args) => {
      eventFn(...args)
      this.off(eventName)
    }
    this.on(eventName, eventFnOnce)
  }
}
```

## 有态度的总结

**从表面上看**：

- 观察者模式里只有两个角色：`观察者`和`被观察者`。
- 发布订阅模式里有三种角色：`发布者`、`订阅者`、`调度器（第三者）`。

**往更深层次讲**：

- 观察者和被观察者是`松耦合`的关系。
- 发布者和订阅者则完全`不存在耦合`。

**从使用层面上讲**：

- 观察者模式经常用于`单个应用内部`。
- 发布订阅模式更多是一种`跨应用的模式`(cross-application pattern)，比如我们常用的消息中间件 Kafka 等。

综上：`观察者模式`和`发布订阅模式`本质上都有发布订阅的思想，但是又有一定的区别，所以我们不能将二者完全等同起来。
