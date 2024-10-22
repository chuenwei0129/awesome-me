---
title: 观察者与发布订阅
toc: content
---

## 观察者模式

观察者模式一般有观察者和被观察者。

举个例子：大家在学校上自习的时候，等老师走了有些人会玩手机、吃零食、交头接耳找隔壁妹妹聊天，但是被老师发现可就不好了，所以大家想了一个招，让坐在最后排的同学帮忙“放风”，老师一来就给大家一个手势通知大家，大家就继续装好好学生。

![20240602002435](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240602002435.png)

这其实就是一个典型的观察者模式，“放风”的同学是被观察者，玩手机、吃零食的同学是观察者，大家都在观察“放风”同学的手势，一旦老师来了，被观察者就会通知大家。

观察者模式：

```js
class Lookout {
  private observers: Student[] = [];

  // 订阅一个学生
  subscribe(student: Student) {
    this.observers.push(student);
  }

  // 退订一个学生
  unsubscribe(student: Student) {
    this.observers = this.observers.filter((obs) => obs !== student);
  }

  // 通知所有订阅的学生
  notify(message: string) {
    this.observers.forEach((observer) => {
      observer.update(message);
    });
  }
}

class Student {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  // 更新消息
  update(message: string) {
    console.log(`${this.name} 收到信息: ${message}`);
  }
}

// 创建一个“放风”同学
const lookoutStudent = new Lookout();

// 创建三个学生
const studentA = new Student('小明');
const studentB = new Student('小红');
const studentC = new Student('小刚');

// 小明和小红订阅“放风”同学的通知
lookoutStudent.subscribe(studentA);
lookoutStudent.subscribe(studentB);

// “放风”同学通知大家老师来了
lookoutStudent.notify('老师来了');

// 小刚也订阅了通知
lookoutStudent.subscribe(studentC);

// “放风”同学再次通知大家老师来了
lookoutStudent.notify('老师来了');

// 小明取消订阅
lookoutStudent.unsubscribe(studentA);

// “放风”同学再次通知大家老师来了
lookoutStudent.notify('老师来了');
```

## 发布订阅模式

举个生活中的例子，比如我们想要订阅一份国家地理杂志，一般需要我们先向邮局申请（付钱），告诉邮局我要订阅这份杂志，苦等数日杂志终于印刷好了，这个时候我们不会直接跑到印刷厂里去，而是等印刷厂将杂志送给邮局，然后邮局才会慢吞吞地将杂志送到家（推模式），如果你实在等不及了跑到邮局直接取杂志，恭喜你学会了“拉模式”。

![20240602002704](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240602002704.png)

在发布订阅模式里`发布者`并不会直接通知`订阅者`，换句话说`发布者`和`订阅者`彼此互不感知。

那`发布者`和`订阅者`如何交流呢？答案是通过中间的调度中心。

- 发布者将消息发送给调度中心，告诉它你帮我把消息放到 Topic1 中。
- 订阅者告诉调度中心，我需要订阅 topic1，你帮我留意一下。
- 当有消息来了，订阅者可以采取拉模式或者推模式来获取消息。

```js
type EventName = string;
type EventCallbackArgs = unknown[];
type EventCallback = (...args: EventCallbackArgs) => void;

class EventEmitter {
  private events: Map<EventName, EventCallback[]>; // 使用 Map 来存储多个回调
  private caches: Map<EventName, EventCallbackArgs>; // 缓存事件参数

  constructor() {
    this.events = new Map();
    this.caches = new Map();
  }

  // 同一事件可以注册多个事件回调
  on(eventName: EventName, eventCallback: EventCallback) {
    // 如果缓存中有事件，立即调用回调（推模式）
    if (this.caches.has(eventName)) {
      eventCallback(...this.caches.get(eventName)!);
    } else {
      // 只在事件池中还没有该事件时执行
      if (!this.events.has(eventName)) {
        this.events.set(eventName, []);
      }
      // 把事件回调到事件列表中
      this.events.get(eventName)!.push(eventCallback);
    }
  }

  // 发布事件
  emit(eventName: EventName, ...args: EventCallbackArgs) {
    // 如果有订阅者，则通知所有订阅者
    if (this.events.has(eventName)) {
      this.events.get(eventName)!.forEach((callback) => callback(...args));
    }
    // 如果没有订阅者，将事件缓存（拉模式）
    else {
      this.caches.set(eventName, args);
    }
  }

  // 取消订阅
  off(eventName: EventName, eventCallback?: EventCallback) {
    if (!this.events.has(eventName)) return;

    if (eventCallback) {
      // 取消特定回调
      this.events.set(
        eventName,
        this.events
          .get(eventName)!
          .filter((callback) => callback !== eventCallback),
      );
      // 如果该事件下没有回调了，则删除该事件
      if (this.events.get(eventName)!.length === 0) {
        this.events.delete(eventName);
      }
    } else {
      // 取消所有回调
      this.events.delete(eventName);
    }

    // 移除该事件的缓存
    this.caches.delete(eventName);
  }

  // 一次性订阅
  once(eventName: EventName, eventCallback: EventCallback) {
    const eventCallbackOnce = (...args: EventCallbackArgs) => {
      eventCallback(...args);
      this.off(eventName, eventCallbackOnce);
    };

    // 如果有缓存的事件参数，立即执行回调并取消订阅
    if (this.caches.has(eventName)) {
      eventCallbackOnce(...this.caches.get(eventName)!);
      // 立即移除该缓存条目
      this.caches.delete(eventName);
    } else {
      this.on(eventName, eventCallbackOnce);
    }
  }
}

class Publisher {
  private eventEmitter: EventEmitter;

  constructor(eventEmitter: EventEmitter) {
    this.eventEmitter = eventEmitter;
  }

  publish(topic: EventName, ...args: EventCallbackArgs) {
    console.log(`发布者: 发送消息 '${args}' 到 ${topic}`);
    this.eventEmitter.emit(topic, ...args);
  }
}

class Subscriber {
  private eventEmitter: EventEmitter;
  private id: number;

  constructor(eventEmitter: EventEmitter, id: number) {
    this.eventEmitter = eventEmitter;
    this.id = id;
  }

  subscribe(topic: EventName) {
    this.eventEmitter.on(topic, this.receiveMessage.bind(this));
  }

  receiveMessage(...args: EventCallbackArgs) {
    console.log(`订阅者 ${this.id}: 收到消息 '${args}'`);
  }
}

// 创建一个调度中心实例
const eventEmitter = new EventEmitter();

// 创建两个发布者
const publisher1 = new Publisher(eventEmitter);
const publisher2 = new Publisher(eventEmitter);

// 创建三个订阅者
const subscriber1 = new Subscriber(eventEmitter, 1);
const subscriber2 = new Subscriber(eventEmitter, 2);
const subscriber3 = new Subscriber(eventEmitter, 3);

// 订阅者订阅 topic1
subscriber1.subscribe('topic1');
subscriber2.subscribe('topic1');

// 订阅者订阅 topic2
subscriber3.subscribe('topic2');

// 发布者发布消息到 topic1
publisher1.publish('topic1', '消息1');
publisher2.publish('topic1', '消息2');

// 发布者发布消息到 topic2
publisher1.publish('topic2', '消息3');
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
