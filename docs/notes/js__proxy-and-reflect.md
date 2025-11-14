---
group:
  title: javaScript
  order: 3
title: Proxy 和 Reflect
toc: content
order: 13
---

## 从 Proxy 与 defineProperty 的区别谈起

### 从对象的基本方法说起

在 JavaScript 中，我们操作对象时看似在使用各种语法和 API：

```javascript
const obj = {};

// 各种对象操作
obj.name = '张三'; // 设置属性
console.log(obj.name); // 读取属性
Object.setPrototypeOf(obj, {}); // 设置原型
for (let key in obj) {
} // 遍历属性
```

但在底层，这些操作都会被转换为对**对象内部方法**的调用。这些内部方法是 JavaScript 引擎定义的，包括：

- `[[Get]]` - 读取属性
- `[[Set]]` - 设置属性
- `[[GetPrototypeOf]]` - 获取原型
- `[[SetPrototypeOf]]` - 设置原型
- `[[OwnPropertyKeys]]` - 获取所有属性键
- `[[DefineOwnProperty]]` - 定义属性特性
- `[[Delete]]` - 删除属性
- `[[HasProperty]]` - 检查属性是否存在

### 核心区别：一句话概括

**Proxy 拦截的是对象的所有内部方法，拦截是全面的；而 `Object.defineProperty` 只能修改单个属性的特性（通过 `[[DefineOwnProperty]]`），拦截是局部的。**

### Proxy 的全面拦截能力

Proxy 可以重定义对象的**所有**内部方法：

```javascript
const obj = { name: '张三' };
const proxy = new Proxy(obj, {
  // 拦截属性读取
  get(target, key) {
    console.log(`读取属性: ${key}`);
    return target[key];
  },
  // 拦截属性设置
  set(target, key, value) {
    console.log(`设置属性: ${key} = ${value}`);
    target[key] = value;
    return true;
  },
  // 拦截属性删除
  deleteProperty(target, key) {
    console.log(`删除属性: ${key}`);
    delete target[key];
    return true;
  },
  // 还可以拦截其他 12 种操作...
});

proxy.name; // 拦截到读取
proxy.age = 25; // 拦截到设置
delete proxy.name; // 拦截到删除
```

### defineProperty 的局限性

`Object.defineProperty` 只能为**已存在的单个属性**定义访问器（getter/setter）：

```javascript
const obj = { _name: '张三' };

Object.defineProperty(obj, 'name', {
  get() {
    console.log('读取 name 属性');
    return this._name;
  },
  set(value) {
    console.log('设置 name 属性');
    this._name = value;
  },
});

obj.name; // 触发 getter
obj.name = '李四'; // 触发 setter
```

它的局限性：

- **只能拦截已定义的属性**：无法拦截新增属性
- **需要遍历所有属性**：要拦截对象的所有属性需要逐个定义
- **无法拦截数组方法**：`push`、`pop` 等操作无法拦截
- **无法拦截删除操作**：`delete` 操作无法拦截
- **无法拦截原型操作**：无法拦截原型链相关操作
- **无法拦截 in 操作符**：无法拦截属性存在性检查

### 实战对比：数组操作的拦截

#### defineProperty 的失败尝试

```javascript
const arr = [1, 2, 3];

// 尝试拦截数组长度变化
Object.defineProperty(arr, 'length', {
  set(value) {
    console.log('长度变化了');
    // 注意：length 属性是不可配置的(configurable: false)
    // 因此无法重定义，这段代码会报错
  },
});

arr.push(4); // TypeError: Cannot redefine property: length
```

#### Proxy 的成功拦截

```javascript
const arr = [1, 2, 3];
const proxyArr = new Proxy(arr, {
  get(target, key) {
    console.log(`读取: ${key}`);
    return target[key];
  },
  set(target, key, value) {
    console.log(`设置: ${key} = ${value}`);
    target[key] = value;
    return true;
  },
});

proxyArr.push(1);
// 输出：
// 读取: push           (获取 push 方法)
// 读取: length         (push 内部读取 length)
// 设置: 3 = 1          (设置新元素)
// 设置: length = 4     (更新 length)
```

## Proxy 完整 API

### Proxy 构造函数

```javascript
const proxy = new Proxy(target, handler);
```

- `target`：要代理的目标对象（可以是任何类型，包括数组、函数甚至另一个代理）
- `handler`：处理器对象，包含各种拦截方法（trap）

### 13 种 Trap（拦截器）

#### 1. get(target, property, receiver)

拦截属性读取操作。

```javascript
const obj = { name: '张三' };
const proxy = new Proxy(obj, {
  get(target, property, receiver) {
    console.log(`读取属性: ${property}`);
    return property in target ? target[property] : '默认值';
  },
});

console.log(proxy.name); // 输出: 读取属性: name, 张三
console.log(proxy.age); // 输出: 读取属性: age, 默认值
```

拦截操作：

- `obj.property`
- `obj[property]`

#### 2. set(target, property, value, receiver)

拦截属性设置操作。

```javascript
const obj = {};
const proxy = new Proxy(obj, {
  set(target, property, value, receiver) {
    if (typeof value !== 'number') {
      throw new TypeError('属性值必须是数字');
    }
    target[property] = value;
    return true; // 必须返回 true 表示设置成功
  },
});

proxy.age = 25; // 成功
proxy.name = '张三'; // TypeError: 属性值必须是数字
```

拦截操作：

- `obj.property = value`
- `obj[property] = value`

#### 3. has(target, property)

拦截 `in` 操作符。

```javascript
const obj = { name: '张三', _secret: '密码' };
const proxy = new Proxy(obj, {
  has(target, property) {
    // 隐藏下划线开头的私有属性
    if (property.startsWith('_')) {
      return false;
    }
    return property in target;
  },
});

console.log('name' in proxy); // true
console.log('_secret' in proxy); // false
```

拦截操作：

- `property in obj`

#### 4. deleteProperty(target, property)

拦截删除属性操作。

```javascript
const obj = { name: '张三', _id: 123 };
const proxy = new Proxy(obj, {
  deleteProperty(target, property) {
    if (property.startsWith('_')) {
      throw new Error('不能删除私有属性');
    }
    delete target[property];
    return true;
  },
});

delete proxy.name; // 成功
delete proxy._id; // Error: 不能删除私有属性
```

拦截操作：

- `delete obj.property`

#### 5. ownKeys(target)

拦截获取对象自身属性键的操作。

```javascript
const obj = { name: '张三', _secret: '密码', age: 25 };
const proxy = new Proxy(obj, {
  ownKeys(target) {
    // 过滤掉下划线开头的属性
    return Object.keys(target).filter((key) => !key.startsWith('_'));
  },
});

console.log(Object.keys(proxy)); // ['name', 'age']
console.log(Object.getOwnPropertyNames(proxy)); // ['name', 'age']
```

拦截操作：

- `Object.keys()`
- `Object.getOwnPropertyNames()`
- `Object.getOwnPropertySymbols()`
- `for...in` 循环

#### 6. getOwnPropertyDescriptor(target, property)

拦截获取属性描述符的操作。

```javascript
const obj = { name: '张三' };
const proxy = new Proxy(obj, {
  getOwnPropertyDescriptor(target, property) {
    console.log(`获取属性描述符: ${property}`);
    return Object.getOwnPropertyDescriptor(target, property);
  },
});

Object.getOwnPropertyDescriptor(proxy, 'name');
// 输出: 获取属性描述符: name
```

拦截操作：

- `Object.getOwnPropertyDescriptor()`

#### 7. defineProperty(target, property, descriptor)

拦截定义属性的操作。

```javascript
const obj = {};
const proxy = new Proxy(obj, {
  defineProperty(target, property, descriptor) {
    console.log(`定义属性: ${property}`);
    return Object.defineProperty(target, property, descriptor);
  },
});

Object.defineProperty(proxy, 'name', { value: '张三' });
// 输出: 定义属性: name
```

拦截操作：

- `Object.defineProperty()`

#### 8. getPrototypeOf(target)

拦截获取原型的操作。

```javascript
const obj = {};
const proxy = new Proxy(obj, {
  getPrototypeOf(target) {
    console.log('获取原型');
    return Object.getPrototypeOf(target);
  },
});

Object.getPrototypeOf(proxy);
// 输出: 获取原型
```

拦截操作：

- `Object.getPrototypeOf()`
- `__proto__`
- `instanceof`

#### 9. setPrototypeOf(target, proto)

拦截设置原型的操作。

```javascript
const obj = {};
const proxy = new Proxy(obj, {
  setPrototypeOf(target, proto) {
    console.log('设置原型');
    return Object.setPrototypeOf(target, proto);
  },
});

Object.setPrototypeOf(proxy, {});
// 输出: 设置原型
```

拦截操作：

- `Object.setPrototypeOf()`

#### 10. isExtensible(target)

拦截检查对象是否可扩展的操作。

```javascript
const obj = {};
const proxy = new Proxy(obj, {
  isExtensible(target) {
    console.log('检查是否可扩展');
    return Object.isExtensible(target);
  },
});

Object.isExtensible(proxy);
// 输出: 检查是否可扩展
```

拦截操作：

- `Object.isExtensible()`

#### 11. preventExtensions(target)

拦截阻止对象扩展的操作。

```javascript
const obj = {};
const proxy = new Proxy(obj, {
  preventExtensions(target) {
    console.log('阻止扩展');
    return Object.preventExtensions(target);
  },
});

Object.preventExtensions(proxy);
// 输出: 阻止扩展
```

拦截操作：

- `Object.preventExtensions()`

#### 12. apply(target, thisArg, argumentsList)

拦截函数调用操作（仅对函数对象有效）。

```javascript
function sum(a, b) {
  return a + b;
}

const proxy = new Proxy(sum, {
  apply(target, thisArg, args) {
    console.log(`调用函数，参数: ${args}`);
    return target.apply(thisArg, args);
  },
});

proxy(1, 2); // 输出: 调用函数，参数: 1,2  返回: 3
```

拦截操作：

- `func(...args)`
- `func.call()`
- `func.apply()`

#### 13. construct(target, argumentsList, newTarget)

拦截 `new` 操作符（仅对构造函数有效）。

```javascript
function Person(name) {
  this.name = name;
}

const ProxyPerson = new Proxy(Person, {
  construct(target, args, newTarget) {
    console.log(`创建实例，参数: ${args}`);
    return new target(...args);
  },
});

const person = new ProxyPerson('张三');
// 输出: 创建实例，参数: 张三
```

拦截操作：

- `new func(...args)`

### Proxy 的不变式（Invariants）

Proxy 有一些不可违反的规则，称为"不变式"：

```javascript
const obj = {};
Object.defineProperty(obj, 'name', {
  value: '张三',
  writable: false,
  configurable: false,
});

const proxy = new Proxy(obj, {
  get(target, property) {
    // 违反不变式：不可配置且不可写的属性必须返回相同的值
    return '李四';
  },
});

proxy.name; // TypeError: 'get' on proxy: property 'name' is a read-only and non-configurable data property on the proxy target but the proxy did not return its actual value
```

主要不变式：

1. 如果目标属性不可写且不可配置，`get` 必须返回该属性的实际值
2. 如果目标属性不可配置且没有 setter，`get` 必须返回该属性的实际值
3. 如果目标属性不可写且不可配置，`set` 必须返回 false
4. 如果目标对象不可扩展，`preventExtensions` 必须返回 true
5. 如果目标对象不可扩展，`isExtensible` 必须返回 false

### Proxy.revocable()

创建可撤销的代理。

```javascript
const obj = { name: '张三' };
const { proxy, revoke } = Proxy.revocable(obj, {
  get(target, property) {
    return target[property];
  },
});

console.log(proxy.name); // 张三

// 撤销代理
revoke();

console.log(proxy.name); // TypeError: Cannot perform 'get' on a proxy that has been revoked
```

使用场景：

- 临时授权访问对象
- 需要能够主动切断代理的场景
- 内存管理（撤销后可以被垃圾回收）

## Reflect：直接调用内部方法

### 什么是 Reflect？

Reflect 是 ES6 引入的内置对象，其本质是：**提供了直接调用 JavaScript 对象内部方法的能力**。

### 理解对象的内部方法

在 JavaScript 规范中，所有对对象的操作最终都会转化为对**内部方法**的调用：

```javascript
const obj = { a: 1 };

// 语法层面
obj.a = 2;
console.log(obj.a);

// 实际调用的内部方法
[[Set]](obj, 'a', 2)[[Get]](obj, 'a');

// Reflect 直接调用内部方法
Reflect.set(obj, 'a', 2);
Reflect.get(obj, 'a');
```

### Reflect 与常规语法的区别

#### 1. 更精细的控制

Reflect 允许控制内部方法的参数，特别是 `receiver` 参数：

```javascript
const obj = {
  a: 1,
  b: 2,
  get c() {
    return this.a + this.b;
  },
};

// 常规语法 - this 自动绑定到 obj
console.log(obj.c); // 3

// Reflect 方式 - 可以手动指定 receiver（this 指向）
const other = { a: 3, b: 4 };
console.log(Reflect.get(obj, 'c', other)); // 7
```

#### 2. 更一致的 API 设计

Reflect 方法返回布尔值表示操作成功与否，而不是抛出异常：

```javascript
const obj = {};
Object.defineProperty(obj, 'readonly', {
  value: 1,
  writable: false,
  configurable: false,
});

// Object.defineProperty - 失败时抛出错误
try {
  Object.defineProperty(obj, 'readonly', { value: 2 });
  console.log('成功');
} catch (e) {
  console.log('失败'); // 执行这里
}

// Reflect.defineProperty - 返回布尔值
const success = Reflect.defineProperty(obj, 'readonly', { value: 2 });
if (success) {
  console.log('成功');
} else {
  console.log('失败'); // 执行这里
}
```

#### 3. 更完整的属性操作

Reflect 提供了获取所有属性的方法：

```javascript
const obj = {};

// 添加普通属性
obj.a = 1;

// 添加不可枚举属性
Object.defineProperty(obj, 'b', {
  value: 2,
  enumerable: false,
});

// 添加 Symbol 属性
const sym = Symbol('c');
obj[sym] = 3;

// Object.keys - 只返回可枚举的字符串属性
console.log(Object.keys(obj)); // ['a']

// Reflect.ownKeys - 返回所有自身属性（包括不可枚举和 Symbol）
console.log(Reflect.ownKeys(obj)); // ['a', 'b', Symbol(c)]
```

### Reflect 在 Proxy 中的应用

#### 1. 确保正确的 this 绑定

这是 Reflect 最重要的应用场景：

```javascript
const obj = {
  a: 1,
  b: 2,
  get sum() {
    return this.a + this.b;
  },
};

// ❌ 错误方式：this 会指向 target
const badProxy = new Proxy(obj, {
  get(target, property) {
    console.log(`读取属性: ${property}`);
    return target[property]; // getter 中的 this 指向 target
  },
});

console.log(badProxy.sum);
// 输出：
// 读取属性: sum
// 3
// 注意：访问 sum 时触发了 getter，但访问 this.a 和 this.b 时没有触发拦截

// ✅ 正确方式：使用 Reflect 传递 receiver
const goodProxy = new Proxy(obj, {
  get(target, property, receiver) {
    console.log(`读取属性: ${property}`);
    return Reflect.get(target, property, receiver); // getter 中的 this 指向 receiver（即 proxy）
  },
});

console.log(goodProxy.sum);
// 输出：
// 读取属性: sum
// 读取属性: a    ← 触发了拦截！
// 读取属性: b    ← 触发了拦截！
// 3
```

#### 2. 保持操作的语义一致性

```javascript
const obj = {};

const proxy = new Proxy(obj, {
  set(target, property, value, receiver) {
    console.log(`设置: ${property} = ${value}`);
    // 使用 Reflect 确保返回值正确
    return Reflect.set(target, property, value, receiver);
  },
});

proxy.name = '张三';
```

### Reflect 方法对照表

| 内部方法                | Reflect 方法                         | 对应操作                            |
| ----------------------- | ------------------------------------ | ----------------------------------- |
| `[[Get]]`               | `Reflect.get()`                      | `obj.property`                      |
| `[[Set]]`               | `Reflect.set()`                      | `obj.property = value`              |
| `[[HasProperty]]`       | `Reflect.has()`                      | `property in obj`                   |
| `[[Delete]]`            | `Reflect.deleteProperty()`           | `delete obj.property`               |
| `[[OwnPropertyKeys]]`   | `Reflect.ownKeys()`                  | `Object.keys()`                     |
| `[[GetPrototypeOf]]`    | `Reflect.getPrototypeOf()`           | `Object.getPrototypeOf()`           |
| `[[SetPrototypeOf]]`    | `Reflect.setPrototypeOf()`           | `Object.setPrototypeOf()`           |
| `[[IsExtensible]]`      | `Reflect.isExtensible()`             | `Object.isExtensible()`             |
| `[[PreventExtensions]]` | `Reflect.preventExtensions()`        | `Object.preventExtensions()`        |
| `[[DefineOwnProperty]]` | `Reflect.defineProperty()`           | `Object.defineProperty()`           |
| `[[GetOwnProperty]]`    | `Reflect.getOwnPropertyDescriptor()` | `Object.getOwnPropertyDescriptor()` |
| `[[Call]]`              | `Reflect.apply()`                    | `func.apply()`                      |
| `[[Construct]]`         | `Reflect.construct()`                | `new Constructor()`                 |

### Reflect 的核心价值

1. **直接性**：绕过语法糖，直接调用对象的内部方法
2. **可控性**：提供更精细的参数控制（如 receiver）
3. **一致性**：统一的返回值设计（布尔值表示成功与否）
4. **完整性**：提供对对象所有内部方法的直接访问

## 实战应用场景

### 1. 数据验证

```javascript
function createValidator(schema) {
  return new Proxy(
    {},
    {
      set(target, property, value) {
        const validator = schema[property];
        if (validator && !validator(value)) {
          throw new Error(`${property} 验证失败`);
        }
        target[property] = value;
        return true;
      },
    },
  );
}

const user = createValidator({
  age: (value) => typeof value === 'number' && value >= 0 && value <= 150,
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
});

user.age = 25; // 成功
user.email = 'test@example.com'; // 成功
user.age = -1; // Error: age 验证失败
user.email = 'invalid'; // Error: email 验证失败
```

### 2. 负索引访问数组

```javascript
function createNegativeArray(arr) {
  return new Proxy(arr, {
    get(target, property, receiver) {
      const index = Number(property);
      if (index < 0) {
        property = String(target.length + index);
      }
      return Reflect.get(target, property, receiver);
    },
  });
}

const arr = createNegativeArray([1, 2, 3, 4, 5]);
console.log(arr[-1]); // 5
console.log(arr[-2]); // 4
```

### 3. 属性访问日志

```javascript
function createLogger(obj, name = 'Object') {
  return new Proxy(obj, {
    get(target, property, receiver) {
      console.log(`[${name}] GET ${String(property)}`);
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      console.log(`[${name}] SET ${String(property)} = ${value}`);
      return Reflect.set(target, property, value, receiver);
    },
  });
}

const user = createLogger({ name: '张三' }, 'User');
user.name; // [User] GET name
user.age = 25; // [User] SET age = 25
```

### 4. 缓存代理

```javascript
function createCachedFunction(fn) {
  const cache = new Map();
  return new Proxy(fn, {
    apply(target, thisArg, args) {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        console.log('从缓存读取');
        return cache.get(key);
      }
      const result = Reflect.apply(target, thisArg, args);
      cache.set(key, result);
      return result;
    },
  });
}

const fibonacci = createCachedFunction(function (n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(10)); // 计算
console.log(fibonacci(10)); // 从缓存读取
```

### 5. 隐藏私有属性

```javascript
function createPrivateProxy(obj) {
  return new Proxy(obj, {
    get(target, property) {
      if (property.startsWith('_')) {
        throw new Error('无法访问私有属性');
      }
      return target[property];
    },
    set(target, property, value) {
      if (property.startsWith('_')) {
        throw new Error('无法设置私有属性');
      }
      target[property] = value;
      return true;
    },
    has(target, property) {
      return !property.startsWith('_') && property in target;
    },
    ownKeys(target) {
      return Object.keys(target).filter((key) => !key.startsWith('_'));
    },
  });
}

const obj = createPrivateProxy({
  name: '张三',
  _id: 123,
});

console.log(obj.name); // 张三
console.log(obj._id); // Error: 无法访问私有属性
console.log('_id' in obj); // false
console.log(Object.keys(obj)); // ['name']
```

### 6. 响应式数据（Vue 3 原理）

```javascript
function reactive(obj) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      // 收集依赖
      track(target, property);
      const value = Reflect.get(target, property, receiver);
      // 如果值是对象，递归代理
      if (typeof value === 'object' && value !== null) {
        return reactive(value);
      }
      return value;
    },
    set(target, property, value, receiver) {
      const result = Reflect.set(target, property, value, receiver);
      // 触发更新
      trigger(target, property);
      return result;
    },
  });
}

// 简化的依赖收集和触发
const targetMap = new WeakMap();
let activeEffect = null;

function track(target, property) {
  if (!activeEffect) return;
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  let dep = depsMap.get(property);
  if (!dep) {
    depsMap.set(property, (dep = new Set()));
  }
  dep.add(activeEffect);
}

function trigger(target, property) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const dep = depsMap.get(property);
  if (dep) {
    dep.forEach((effect) => effect());
  }
}

function watchEffect(effect) {
  activeEffect = effect;
  effect();
  activeEffect = null;
}

// 使用示例
const state = reactive({ count: 0 });

watchEffect(() => {
  console.log(`count 变化了: ${state.count}`);
});

state.count++; // count 变化了: 1
state.count++; // count 变化了: 2
```

### 7. 单例模式

```javascript
function singleton(className) {
  let instance;
  return new Proxy(className, {
    construct(target, args) {
      if (!instance) {
        instance = Reflect.construct(target, args);
      }
      return instance;
    },
  });
}

class Database {
  constructor() {
    this.connection = Math.random();
  }
}

const DatabaseSingleton = singleton(Database);

const db1 = new DatabaseSingleton();
const db2 = new DatabaseSingleton();

console.log(db1 === db2); // true
console.log(db1.connection === db2.connection); // true
```

## 性能和最佳实践

### 性能考虑

1. **Proxy 有性能开销**

```javascript
// 创建大量代理会影响性能
const arr = new Array(10000).fill(0).map((_, i) => i);

// ❌ 不推荐：为每个元素创建代理
const proxies = arr.map((item) => new Proxy({ value: item }, {}));

// ✅ 推荐：只为容器创建代理
const proxyArr = new Proxy(arr, {});
```

2. **避免不必要的拦截**

```javascript
// ❌ 不推荐：拦截所有操作但没有自定义逻辑
const proxy = new Proxy(obj, {
  get(target, property, receiver) {
    return Reflect.get(target, property, receiver);
  },
});

// ✅ 推荐：只拦截需要的操作
const proxy = new Proxy(obj, {
  set(target, property, value, receiver) {
    // 只在 set 时添加逻辑
    console.log(`设置 ${property}`);
    return Reflect.set(target, property, value, receiver);
  },
});
```

3. **递归代理需谨慎**

```javascript
// ❌ 不推荐：每次访问都创建新代理
function reactive(obj) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      const value = Reflect.get(target, property, receiver);
      if (typeof value === 'object') {
        return reactive(value); // 每次都创建新代理
      }
      return value;
    },
  });
}

// ✅ 推荐：缓存已创建的代理
const proxyCache = new WeakMap();
function reactive(obj) {
  if (proxyCache.has(obj)) {
    return proxyCache.get(obj);
  }
  const proxy = new Proxy(obj, {
    get(target, property, receiver) {
      const value = Reflect.get(target, property, receiver);
      if (typeof value === 'object' && value !== null) {
        return reactive(value);
      }
      return value;
    },
  });
  proxyCache.set(obj, proxy);
  return proxy;
}
```

### 最佳实践

#### 1. 总是使用 Reflect

在 Proxy 的 trap 中，始终使用 Reflect 完成默认操作：

```javascript
// ✅ 推荐
const proxy = new Proxy(obj, {
  get(target, property, receiver) {
    // 自定义逻辑
    console.log(`访问 ${property}`);
    // 使用 Reflect 完成默认操作
    return Reflect.get(target, property, receiver);
  },
});
```

#### 2. 注意不变式

确保 trap 的行为符合 Proxy 的不变式：

```javascript
const obj = {};
Object.defineProperty(obj, 'readonly', {
  value: 1,
  writable: false,
  configurable: false,
});

// ❌ 错误：违反不变式
const proxy = new Proxy(obj, {
  get(target, property) {
    if (property === 'readonly') {
      return 999; // 错误：不可配置的属性必须返回相同的值
    }
    return target[property];
  },
});

// ✅ 正确：遵守不变式
const proxy = new Proxy(obj, {
  get(target, property, receiver) {
    console.log(`访问 ${property}`);
    return Reflect.get(target, property, receiver); // 返回实际值
  },
});
```

#### 3. 正确处理返回值

某些 trap 必须返回特定类型的值：

```javascript
const proxy = new Proxy(obj, {
  // set 必须返回布尔值
  set(target, property, value, receiver) {
    target[property] = value;
    return true; // 必须返回 true 表示成功
  },

  // deleteProperty 必须返回布尔值
  deleteProperty(target, property) {
    delete target[property];
    return true; // 必须返回 true 表示成功
  },

  // has 必须返回布尔值
  has(target, property) {
    return property in target; // 必须返回布尔值
  },
});
```

#### 4. 处理 Symbol 属性

不要忘记处理 Symbol 属性：

```javascript
const proxy = new Proxy(obj, {
  ownKeys(target) {
    // ✅ 正确：包含 Symbol 属性
    return Reflect.ownKeys(target);

    // ❌ 错误：只返回字符串属性
    // return Object.keys(target);
  },
});
```

## 进阶学习资源

- [ES6 Proxy 里面为什么要用 Reflect？](https://www.zhihu.com/question/460133198)
- [ES6 Proxy 的 trap 结果检测是一种性能浪费还是优化？](https://www.zhihu.com/question/330408977/answer/811228034)
- [JavaScript 的 Proxy 怎么代理 Map？](https://www.zhihu.com/question/426875859/answer/1545461206)
- [关于 Proxy 代理数组的性能问题？](https://www.zhihu.com/question/460330154)

## 总结

### Proxy 与 defineProperty 的区别

- **Proxy**：拦截对象的 13 种内部操作，功能全面，适合构建响应式系统
- **defineProperty**：只能修改单个属性的访问器，功能有限，主要用于属性级别的控制

### Reflect 的作用

- 提供直接调用对象内部方法的能力
- 确保 Proxy 中的 this 绑定正确
- 提供更一致的 API（返回布尔值而不是抛出异常）

### 使用场景

- **数据验证**：拦截属性设置进行验证
- **响应式系统**：Vue 3 的响应式原理
- **属性访问控制**：隐藏私有属性、实现只读对象
- **函数增强**：缓存、日志、性能监控
- **设计模式**：单例模式、观察者模式

### 注意事项

- Proxy 有性能开销，避免滥用
- 遵守 Proxy 的不变式
- 在 trap 中始终使用 Reflect
- 正确处理返回值和 Symbol 属性
