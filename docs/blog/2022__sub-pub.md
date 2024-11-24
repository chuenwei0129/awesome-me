---

group:
  title: 2022 🐯
  order: -2022
title: 观察者与发布订阅
toc: content
---

## 观察者模式

观察者模式基本上就是让被观察者和观察者之间搞点小互动。

举个例子：大家在学校上自习的时候，等老师一脚踏出去，一些同学就开始放飞自我——玩手机、吃零食、八卦聊天。但是，一旦老师突然回头，那就尴尬了。于是大家想了个神机妙算的招数，让坐最后排的同学“放风”。老师一来，他就给大家一个手势，各个同学立刻化身乖宝宝。

![20240602002435](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240602002435.png)

这其实就是一个经典的观察者模式，“放风”的同学是被观察者，而那些放飞自我的同学则是观察者。大家都盯着“放风”同学的手势，一旦老师回来了，被观察者就赶紧通知大家。

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

另一个例子：假如你想订阅一份国家地理杂志，一般都是先去邮局申请（掏钱），告诉邮局你要这本杂志。接着是漫长的等待，直到杂志印刷好了。这个时候，你不会直接冲到印刷厂，而是等印刷厂把杂志送到邮局，然后邮局像蜗牛般把杂志送到你家（推模式）。如果你等不及了，跑到邮局直接取杂志，那就是“拉模式”了。

![20240602002704](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240602002704.png)

在发布订阅模式中，发布者不会直接通知订阅者，也就是说，发布者和订阅者互相都不认识。

究竟怎么沟通呢？靠中间的调度中心呀！

- 发布者把消息发送给调度中心，告诉它把消息存到 Topic1 中。
- 订阅者则通知调度中心，说自己要订阅 topic1，并让其留意有新内容。
- 当有新消息进来，订阅者可以选择自己拉取或让调度中心推送。

```js
type EventName = string;
type EventCallbackArgs = unknown[];
type EventCallback = (...args: EventCallbackArgs) => void;

class EventEmitter {
  private events: Map<EventName, EventCallback[]>; // 使用 Map 来存储回调函数
  private caches: Map<EventName, EventCallbackArgs>; // 缓存事件参数

  constructor() {
    this.events = new Map();
    this.caches = new Map();
  }

  // 同一事件可以注册多个回调函数
  on(eventName: EventName, eventCallback: EventCallback) {
    // 如果缓存中有事件参数，立即调用回调（推模式）
    if (this.caches.has(eventName)) {
      eventCallback(...this.caches.get(eventName)!);
    } else {
      // 如果事件池中没有该事件，则先创建事件数组
      if (!this.events.has(eventName)) {
        this.events.set(eventName, []);
      }
      // 将回调函数存储到事件列表中
      this.events.get(eventName)!.push(eventCallback);
    }
  }

  // 发布事件
  emit(eventName: EventName, ...args: EventCallbackArgs) {
    // 如果存在订阅者，则通知他们
    if (this.events.has(eventName)) {
      this.events.get(eventName)!.forEach((callback) => callback(...args));
    } else {
      // 否则，将事件参数缓存（拉模式）
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
        this.events.get(eventName)!.filter((callback) => callback !== eventCallback),
      );
      // 如果该事件列表为空，则删除事件
      if (this.events.get(eventName)!.length === 0) {
        this.events.delete(eventName);
      }
    } else {
      // 取消所有回调
      this.events.delete(eventName);
    }

    // 移除缓存的事件参数
    this.caches.delete(eventName);
  }

  // 一次性订阅
  once(eventName: EventName, eventCallback: EventCallback) {
    const eventCallbackOnce = (...args: EventCallbackArgs) => {
      eventCallback(...args);
      this.off(eventName, eventCallbackOnce);
    };

    // 如果缓存中有事件参数，立即执行回调并取消订阅
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

好啦，来个风趣幽默的总结，让你哈哈一笑之间，理解这两种模式：

### 观 察 者 模 式 🕵️‍♂️：

想象一下，你在某公司给员工发月饼、粽子。这可是公司的内务，全由行政部门负责。因为“公司”和“员工”是一家人，这种亲密的事儿，当然得自己家做。

### 发 布 订 阅 模 式 📬：

而现在，假如公司要发各种快递给其他人。这时候，“公司”和“其他人”可不是同一伙的，就像牛郎织女，只有靠第三方快递公司搭桥牵线，大家信息互通。

### 小总-结：

- **观察者模式**下，观察者可是时刻盯着被观察者，关注是否有新动态。你可以想象自己盯着烤箱里的蛋糕，眼睛一直不眨。

- **发布订阅模式**下，发布者和订阅者简直就是“陌生人”。他们不可能互相认识，只能通过‘快递小哥’传递消息。舒服地在家躺着，每月订阅的杂志按时送上门，那才叫享受。

至于发布-订阅大多是异步的（使用消息队列），不会让你在门口等得腿酸肚子饿，给你贴心的异步体验。
