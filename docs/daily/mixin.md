---
title: Mixin
toc: content
---

在 class 组件模式下，状态逻辑的复用是一件困难的事情。假设有如下需求： 当组件实例创建时，需要创建一个 state 属性：name，并随机给此 name 属性附一个初始值。除此之外，还得提供一个 setName 方法。你可以在组件其他地方开销和修改此状态属性。  更重要的是: 这个逻辑要可以复用，在各种业务组件里复用这个逻辑。 在拥有 Hooks 之前，我首先会想到的解决方案一定是 mixin。代码如下：（此示例采用 vue2 mixin 写法 ）// 混入文件：name-mixin.js
export default {
  data() {
    return {
      name: genRandomName() // 假装它能生成随机的名字
    }
  },
  methods: {
    setName(name) {
      this.name = name
    }
  }
}

// 组件：my-component.vue
<template>
  <div>{{ name }}</div>
<template>
<script>
import nameMixin from './name-mixin';
export default {
  mixins: [nameMixin],
  // 通过mixins, 你可以直接获得 nameMixin 中所定义的状态、方法、生命周期中的事件等
  mounted() {
    setTimeout(() => {
      this.setName('Tom')
    }, 3000)
  }
}
<script>
粗略看来，mixins 似乎提供了非常不错的复用能力，但是，react官方文档直接表明：<img src="https://pic1.zhimg.com/50/v2-1cfdfd9581e4e36e79d5791a68ee3947_720w.jpg?source=1def8aca" data-caption="" data-size="normal" data-rawwidth="850" data-rawheight="259" data-original-token="v2-1cfdfd9581e4e36e79d5791a68ee3947" class="origin_image zh-lightbox-thumb" width="850" data-original="https://picx.zhimg.com/v2-1cfdfd9581e4e36e79d5791a68ee3947_r.jpg?source=1def8aca"/>为什么呢？因为 mixins 虽然提供了这种状态复用的能力，但它的弊端实在太多了。弊端一：难以追溯的方法与属性！试想一下，如果出现这种代码，你是否会怀疑人生：export default {
  mixins: [ a, b, c, d, e, f, g ], // 当然，这只是表示它混入了很多能力
  mounted() {
    console.log(this.name)
    // mmp!这个 this.name 来自于谁？我难道要一个个混入看实现？
  }
}
又或者：a.js mixins: [b.js]

b.js mixins: [c.js]

c.js mixins: [d.js]

// 你猜猜看, this.name 来自于谁？
// 求求你别再说了，我血压已经上来了
弊端二：覆盖、同名？贵圈真乱！当我同时想混入 mixin-a.js 和 mixin-b.js 以同时获得它们能力的时候，不幸的事情发生了：由于这两个 mixin 功能的开发者惺惺相惜，它们都定义了 this.name 作为属性。这种时候，你会深深怀疑，mixins 究竟是不是一种科学的复用方式。弊端三：梅开二度？代价很大！仍然说上面的例子，如果我的需求发生了改变，我需要的不再是一个简单的状态 name，而是分别需要 firstName 和 lastName。此时 name-mixin.js 混入的能力就会非常尴尬，因为我无法两次 mixins 同一个文件。当然，也是有解决方案的，如：// 动态生成mixin
function genNameMixin(key, funcKey) {
  return {
    data() {
      return {
        [key]: genRandomName()
      }
    },
    methods: {
      [funcKey]: function(v) {
        this.[key] = v
      } 
    }
  }
}

export default {
  mixins: [
    genNameMixin('firstName', 'setFirstName'),
    genNameMixin('lastName', 'setLastName'),
  ]
}
确实通过动态生成 mixin 完成了能力的复用，但这样一来，无疑更加地增大了程序的复杂性，降低了可读性。
