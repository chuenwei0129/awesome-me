# 谈一谈对 TailwindCSS 的看法
二、一些问题的解答
Tailwindcss 为啥受欢迎，在我看来无非是更好用的原子化的CSS。在国外如火如荼，但是在国内论坛上争议很大，前几天在我的博客上写了一篇关于 Tailwindcss 的文章，但是底下评论很多了各种问题，于是再总结一下

#Q1: 这和行内 CSS 有何区别，不就少写几个字吗？
大部分人的想法应该是这样的: 仅仅对于 text-center 而言，虽然提供了些许方便，但是不足以拉开差距。

如果说它仅仅是简单的原子化 CSS，好用却不亮眼。但是它却不仅仅止于此。

#1. 方便性: text-center、grid-cols-3
或许一个 text-center 不足以使你觉得提供了多大的方便性，但对于一个三等分的 Grid 属性来说，一个 grid-cols-3 和 shadow 绝对方便

.grid-cols-3	{
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
或者你还能记得 box-shadow 各个位置的参数吗？ 我敢保证看这篇文章的人至少有 93% 说不上来

在 tailwind 中，直接用 .shadow 简单方便

.shadow {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
#2. 语义化: text-lg、text-white、ring、animate-spin`
text-lg，一个较大字体，如果设置行内样式，肯定有诸多麻烦的事: 我想设计一个较大的字体，那我应该设计多大尺寸、使用什么单位

同样还有:

text-white: 白色的色值是哪个来着?
ring: 我想给这个按钮加一个圈圈？
animate-spin: 怎么做一个动画？
#3. 约束性: bg-gray-500、text-lg、p-4
新人总容易弄出一种大红大绿的新人风格网页，有了一些约束就很难出现这种很糟糕的色彩控制

另外，有了 text-lg 此类，一个页面上就不会出现几十种参差不同的字体大小

#4. 响应式:
先来看一个在工作中会遇到的响应式布局问题，这也是我上一次在头条面试时的一道题目

响应式布局，一大堆子元素，在大屏幕三等分，中等屏幕二等分，小屏幕一等分？(opens new window)

<div class="container">
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
</div>
通过 grid 布局很容易实现，但未免繁琐

@media (min-width: 1024px) {
  .container {
    grid-template-columns: repeat(3,minmax(0,1fr));
  }
}

@media (min-width: 768px) {
  .container {
    grid-template-columns: repeat(2,minmax(0,1fr));
  }
}

.conainer {
  display: grid;
  gap: 1rem;
}
那使用 tailwind 呢? 只要一行，就问你高效不高效

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
#5. 修饰符
把修饰符，如各种伪类、暗黑模式、响应式设计至于前缀的设计简直深得我心

<div class="focus:ring-2 hover:bg-red-700 dark:bg-gray-800"></div>

mime (opens new window): 获取 Mime Type。几十行代码，每周 3700 万次下载，1.6K Star
classnames (opens new window): 根据条件连接 class 类名。一百几十行代码，每周 580 万次下载，13.5K Star
js-cookie (opens new window): 操作 cookie。一百多行代码，每周 200 万次下载，17K Star，但是在 Jsdelivr 每月有上亿次下载
ms (opens new window): ms('2 days') 可读性的时间转化为秒数。几十行代码，每周 7300 万次下载，3.3K Star
isMobile (opens new window): 检测当前 web 环境是否为移动端。几十行代码，每周 15 万下载，2K Star
isci
至于调试，可轻松使用 chrome devtools，还是可以一眼望到底的，而且没有以前各种 class 存在属性重复覆盖，造成调试困难，从下图可看出 tailwindcss 调试一目了然

即使实在有过多的 CSS Class，也可以通过 Computed 面板中的小箭头跳转过去找到相对应的 class

虽然 CSS 体积大幅降低，但是 HTML 体积却变大了
Facebook 经过重构后 CSS 体积已经从 413Kb 减至 74Kb。

gzip 的核心是 Deflate，而它使用了 LZ77 算法与 Huffman 编码来压缩文件，重复度越高的文件可压缩的空间就越大。

即使 HTML 因为类名过多造成体积增大，由于 class 高度相似，gzip 也将会得到一个很大的压缩比例。

 PurgeCSS 有可能过多删除 class
tailwind 使用了 purgecss 删除无用的 class，但有时候会吧有用的 class 也给删掉。道理也很简单，它并不能动态执行代码，你计算后的 class 他不认识就给你删了

比如:

<div class="text-{{  error  ?  'red'  :  'green'  }}-600"></div>

所以我强烈推荐使用 classnames(opens new window)

上面这段在文档里有描述: 如何正确书写能够被 purgecss 识别的样式

Q2: 样式覆盖问题
以下 red 与 blue 两个样式哪个会生效？无法确定。

<div class="red blue"> </div>
class 在样式表中的顺序决定，而非在 class 中的先后顺序。这使得通过 className 扩展样式时遭遇问题，示例如下

import cx from 'classnames'

function Input ({ classname }) {
  // 默认居中，提供外层扩展 class 的功能
  return <input className={cx('text-center', classname)} />
}

function ExtendInput () {
  // 扩展失败
  return <Input className="text-left" />
}
再来谈几个实践的点

#与 classnames 搭配使用
classNames('text-center transition-opacity', showTip ? 'opacity-100' : 'opacity-0')
#与 styled-jsx 搭配使用
此时样式由大量的 tailwind 及少量的 styled-jsx组成。需要注意此时需要搭配 styled-jsx 的 postcss 插件使用

<style jsx>{
	` .item {
		@apply p-2 border-b flex justify-between font-mono;
	}
`}</style>
 



[小技巧！CSS 整块文本溢出省略特性探究](https://juejin.cn/post/6938583040469762055#heading-2)
[radio 和 checkbox 的自定义样式](https://xiaotianxia.github.io/blog/vuepress/css/styled_switch.html)
[SVG 轻松实现路径动画](https://xiaotianxia.github.io/blog/vuepress/css/svg_path_animation.html)

埋点，两个版本

2.7、埋点系统
强烈推荐前端做自己的埋点系统。这个不同于后端的日志系统。
前端埋点系统的好处：

    
记录每个页面的访问量（日周月年的UV、PV）；


记录每个功能的使用量；


捕捉报错情况；


图表化显示，方便给其他部门展示；
    

埋点系统是前端高度介入业务，把握业务发展情况的一把利剑，通过这个系统，我们可以比后端更深刻的把握用户的习惯，以及给产品经理、运营等人员提供准确的数据依据。当有了数据后，前端人员就可以针对性的优化功能、布局、页面交互逻辑、用户使用流程。
埋点系统应和业务解耦，开发人员使用时注册，然后在项目中引入。然后在埋点系统里查看相关数据（例如以小时、日、周、月、年为周期查看）[原创水印-作者：零零水(王冬)，微信：qq20004604]。
意义：
数据是money，数据是公司的生命线，数据是最好的武器。

作者：零零水
链接：https://juejin.cn/post/6844903853859536903
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

监控和报警系统应基于埋点系统而建立，在如以下场景时[原创水印-作者：零零水(王冬)，微信：qq20004604]触发：

    
        当访问量有比较大的变化（比如日PV/UV只有之前20%以下）时，自动触发报警，发送邮件到相关人员邮箱；
    
    
        比如报错量大幅度上升（比如200%或更高），则触发报警；
    
    
        当一段时间内没有任何访问量（不符合之前的情况），则触发报警；
    
    
        每过一段时间，自动汇总访问者/报错触发者的相关信息（例如系统、浏览器版本等）；
    

建设这个系统的好处在于，提前发现一些不容易发现的bug（需要埋点做的比较扎实）。有一些线上bug，因为用户环境特殊，导致无法被开发人员和测试人员发现。但其中一部分bug又因为不涉及资金，并不会导致资损（因此也不会被后端的监控系统所发现），这样的bug非常容易影响项目里某个链路的正常使用。
意义：
提高项目的稳定性，提高对业务的把控能力。降低bug数，降低资损的可能性，提前发现某些功能的bug（在工单到来之前）。

作者：零零水
链接：https://juejin.cn/post/6844903853859536903
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

当在开发环境下，访问链接通常是localhost:8000/index.html，此时加入后缀 ?debug=true；
    
    
        封装好的异步请求在发现当前链接有以上标志时，认为是测试环境，访问/userinfo 时，不去读取线上的数据（因为也读取不到），去本地环境读取 src/test_ajax/userinfo.json，并将内容返回给用户；
    
    
        异步请求正常拿到数据，在页面中显示[原创水印-作者：零零水(王冬)，微信：qq20004604]；
    
    当线上接口可以获取到数据后，从network里找到返回的数据，放入/ src/test_ajax/userinfo.json中，此时再次本地调试的话，相当于使用的是线上的真实数据

作者：零零水
链接：https://juejin.cn/post/6844903853859536903
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

除了特殊场景，通常推荐使用多页架构。理由如下：

    
        多页项目，页面和页面之间是独立的，不存在交互，因此当一个页面需要单独重构时，不会影响其他页面，对于有长期历史的项目来说，可维护性、可重构性要高很多；
    
    
        多页项目的缺点是不同页面切换时，会有一个白屏时间，但通常来说，这个时间并不长，大部分现有大公司的线上网页，都是这样的，因此认为是可以接受的；
    
    
        多页项目可以单次只更新一个页面的版本，而单页项目如果其中一个功能模块要更新（特别是公共组件更新），很容易让所有页面都需要更新版本；
    
    
        多页项目的版本控制更简单，如果需要页面拆分，调整部分页面的使用流程，难度也会更低；
    
    
        灰度发布更友好；

作者：零零水
链接：https://juejin.cn/post/6844903853859536903
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

配置postcss，让某些css增加兼容性前缀；
    
    
        写一个wepback的loader，处理某些特殊场景；
    
    
        规范团队代码，使用更稳定的写法（例如移动端避免使用fixed进行布局）；
    
    
        对常见问题、疑难问题，总结解决方案并团队共享；
    
    
        建议或引导用户使用高版本浏览器（比如chrome）；

作者：零零水
链接：https://juejin.cn/post/6844903853859536903
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

众所周知，大型互联网公司通常都有这样一个内部论坛和博客站点。其降低了公司的沟通和交流成本，也增加了公司的技术积累。

当公司内部业务线比较复杂但相互之间的耦合度比较高时，我们应该考虑设计添加单点登录系统。具体来说，用户在一处登录，即可以在任何页面访问，登出时，也同样在任何页面都失去登录状态。SSO的好处很多：

    
        增强用户体验；
    
    
        打通了不同业务系统之间的用户数据；
    
    
        方便统一管理用户；
    
    
        有利于引流；
    
    
        降低开发系统的成本（不需要每个业务都开发一次登录系统和用户状态控制）；
    

总的来说，大中型web应用，SSO可以带来很多好处，缺点却很少。
意义：
用户体验增强，打通不同业务之间的间隔，降低开发成本和用户管理成本。

作者：零零水
链接：https://juejin.cn/post/6844903853859536903
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

前端资源的加载速度是衡量用户体验的重要指标之一。而现实中，因为种种因素，用户在加载页面资源时，会受到很多限制。因此上CDN是非常有意义的，好处如下：

    
        用户来自不同地区，加入CDN可以使用户访问资源时，访问离自己比较近的CDN服务器，降低访问延迟；
    
    
        降低服务器带宽使用成本；
    
    
        支持视频、静态资源、大文件、小文件、直播等多种业务场景；
    
    
        消除跨运营商造成的网络速度较慢的问题；
    
    
        降低DDOS攻击造成的对网站的影响；
    

CDN是一种比较成熟的技术，各大云平_台都有提供CDN服务，价格也不贵，因此CDN的性价比很高。
意义：
增加用户访问速度，降低网络延迟，带宽优化，减少服务器负载，增强对攻击的抵抗能力。

作者：零零水
链接：https://juejin.cn/post/6844903853859536903
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

3.10、负载均衡
目前来看，负载均衡通常使用Nginx比较多，以前也有使用Apache。当遇见大型项目的时候，负载均衡和分布式几乎是必须的。负载均衡有以下好处：

    
        降低单台server的压力，提高业务承载能力；
    
    
        方便应对峰值流量，扩容方便（如举办某些活动时）；
    
    
        增强业务的可用性、扩展性、稳定性；
    

负载均衡已经是蛮常见的技术了，好处不用多说，很容易理解。
意义：
增强业务的可用性、扩展性、稳定性，可以支持更多用户的访问。
3.11、多端共用一套接口


作者：零零水
链接：https://juejin.cn/post/6844903853859536903
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。