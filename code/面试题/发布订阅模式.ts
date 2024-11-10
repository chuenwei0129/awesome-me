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
