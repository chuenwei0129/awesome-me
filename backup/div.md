发表于 2019-07-22 | 更新于 2019-07-26 | 本文总计 1.6k 字

>   这篇文章真是有一种文艺复兴的感觉；不过从解决问题的角度上看，一些处理问题的方案还是能综合应用到不同的实际场景中的。

## [](https://chrisdeo.github.io/2019/07/22/%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86%E5%A4%A7%E9%87%8FDIV%E6%8F%92%E5%85%A5%E9%97%AE%E9%A2%98/#%E8%83%8C%E6%99%AF "背景")背景

  最早其实是在一次分享会上听到了相关问题的讲解，近期又在一次面试中和面试官讨论了这个问题：**如何处理大量DIV插入问题？**

  那么本文就以这样一个场景来进行讨论：**如何优化一个点击button往`container`容器中插入20W个`div`的场景**。

#### [](https://chrisdeo.github.io/2019/07/22/%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86%E5%A4%A7%E9%87%8FDIV%E6%8F%92%E5%85%A5%E9%97%AE%E9%A2%98/#%E6%96%B9%E6%A1%88%E4%B8%80%EF%BC%9A%E7%BA%AFappendChild%E6%8F%92%E5%85%A5 "方案一：纯appendChild插入")方案一：纯appendChild插入

  纯appendChild插入就是你直接操作DOM树，通过找到父亲节点然后根据要插入的DIV数量循环调用`appendChild`插入，并且在这一个过程中你完全没有进行装饰；这大概是刚接触前端的人才会选择的做法，那么这样的做法存在什么问题呢？首先，从JS性能上而言，直接操作DOM是一件性能很低的事情；其次，我们每一次直接插入DIV都会导致重排（reflow）发生页面重渲染；另外**JS是单线程的，它跑在浏览的主线程中，这条主线程与浏览器的渲染线程是互斥的**，即当我们同步执行按钮回调时，不但页面被锁定，无法进行别的JS交互动作（比如有个别的按钮你想点，此时按钮回调就无法响应），页面渲染也会被阻塞。一旦这个处理环节比较长，用户就会明显感到卡顿，并且期间无法做别的事情，这肯定是不OK的。

  以下是纯`appendChild`方式的渲染截图：

![](https://chrisdeo.github.io/2019/07/22/%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86%E5%A4%A7%E9%87%8FDIV%E6%8F%92%E5%85%A5%E9%97%AE%E9%A2%98/raw.jpg)

  通过Chrome的Performance录制我们可以看到总共耗时`13.122s`才将页面渲染出来，这期间别的JS操作响应会被同步阻塞；在整个点击渲染过程中，`Layout`重排这块耗时最长，并且这个`render`过程是不间断的，一条紫柱直到绿柱的绘制位。

  [纯appendChild + 阻塞按钮 DEMO](https://chrisdeo.github.io/divDemo/raw)。

#### [](https://chrisdeo.github.io/2019/07/22/%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86%E5%A4%A7%E9%87%8FDIV%E6%8F%92%E5%85%A5%E9%97%AE%E9%A2%98/#%E6%96%B9%E6%A1%88%E4%BA%8C%EF%BC%9A%E4%BF%AE%E6%94%B9innerHTML%E6%8F%92%E5%85%A5 "方案二：修改innerHTML插入")方案二：修改innerHTML插入

  使用`innerHTML`来处理，就是先循环构造出DOM的字符串，再设置父容器的`innerHTML`，使页面重新渲染。这种方案从原理上来看，性能肯定是要比纯`appendChild`插入要高的，首先它只操作了一次DOM，其次它不会多次重排。我们看下分析图：

![](https://chrisdeo.github.io/2019/07/22/%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86%E5%A4%A7%E9%87%8FDIV%E6%8F%92%E5%85%A5%E9%97%AE%E9%A2%98/inner.jpg)

  在`render`紫柱和`script`黄柱部分有明显的时间缩减~

  [innerHTML DEMO](https://chrisdeo.github.io/divDemo/inner)。

#### [](https://chrisdeo.github.io/2019/07/22/%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86%E5%A4%A7%E9%87%8FDIV%E6%8F%92%E5%85%A5%E9%97%AE%E9%A2%98/#%E6%96%B9%E6%A1%88%E4%B8%89%EF%BC%9A%E5%88%9B%E5%BB%BAFragment%E6%8F%92%E5%85%A5 "方案三：创建Fragment插入")方案三：创建Fragment插入

  现在可以文艺复兴一波，当年看红宝书的时候其实有这么一个API->`document.createDocumentFragment`，通过这种方式我们可以创建一个`Fragment`节点，在这个`Fragment`内进行DOM操作并不会直接应用到实际DOM树中，我们往往将一些比较重的活如本文的大量DOM插入放到这里面处理，最后再将这个`Fragment`插入到父亲节点，其子元素会被应用到实际DOM内，而`Fragment`则不会。因此，该方案只存在`Fragment`应用时的一次重排，且也只有最后应用`Fragment`时操作了DOM，与方案二相比，我觉得主要提升体现在无需海量的字符串拼接操作。分析图见下：

![](https://chrisdeo.github.io/2019/07/22/%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86%E5%A4%A7%E9%87%8FDIV%E6%8F%92%E5%85%A5%E9%97%AE%E9%A2%98/fragment.jpg)

  与方案一、方案二比较，`render`与`script`过程都大幅缩短。

  [Fragment DEMO](https://chrisdeo.github.io/divDemo/fragment)。

#### [](https://chrisdeo.github.io/2019/07/22/%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86%E5%A4%A7%E9%87%8FDIV%E6%8F%92%E5%85%A5%E9%97%AE%E9%A2%98/#%E6%96%B9%E6%A1%88%E5%9B%9B%EF%BC%9A%E5%88%86%E6%89%B9%E6%8F%92%E5%85%A5 "方案四：分批插入")方案四：分批插入

  前面三种方案渐进地提升了这种场景下的渲染效率，但是还有一个根源性问题就是他们都花了至少5s的阻塞占用时间来处理渲染，这个时间对于用户而言绝对是无法容忍的，那么怎么做?**核心是分批处理，并且使用户可以介入到这个过程中，换言之就是间断地进行渲染，中途可以让出线程让主线程操作，这也是`requestIdleCallback`的思想。**

  具体实现是通过`setTimeout`，将20W的量分组拆成一个个1K的量（这个分批的量由我们实际执行一批任务的时长决定，这个时长须在`16.7ms`，即一帧内），然后放入宏任务队列中维护，每一个LOOP尾端由浏览器自身决定是否进行直接渲染或者与之后的内容合并渲染（这个过程我们无法感知），核心代码如下：

<table><tbody><tr><td><pre><span>1</span><br><span>2</span><br><span>3</span><br><span>4</span><br><span>5</span><br><span>6</span><br><span>7</span><br><span>8</span><br><span>9</span><br><span>10</span><br><span>11</span><br><span>12</span><br><span>13</span><br><span>14</span><br></pre></td><td><pre><span><span><span>function</span> <span>chunkPaint</span>(<span></span>) </span>{</span><br><span>    <span>let</span> root = <span>document</span>.querySelector(<span>'.container'</span>);</span><br><span>    <span>let</span> LIMIT = <span>200000</span>;</span><br><span>    <span>let</span> CHUNK = <span>1000</span>;</span><br><span>    <span>let</span> sum = <span>0</span>;</span><br><span>    <span>while</span> (sum &lt; LIMIT) {</span><br><span>        setTimeout(<span><span>function</span> (<span></span>) </span>{</span><br><span>            <span>for</span> (<span>let</span> i = <span>0</span>; i &lt; CHUNK; i++) {</span><br><span>                root.appendChild(<span>document</span>.createElement(<span>'div'</span>));</span><br><span>            }</span><br><span>        }, <span>0</span>);</span><br><span>        sum += CHUNK;</span><br><span>    }</span><br><span>}</span><br></pre></td></tr></tbody></table>

  这个DEMO中，首屏加载可以说是瞬间完成的，没有任何卡顿感；在整个渲染的过程中，也不再像之前一条紫柱通到底，中间会响应我们的JS回调事件交互，见下图：

![](https://chrisdeo.github.io/2019/07/22/%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86%E5%A4%A7%E9%87%8FDIV%E6%8F%92%E5%85%A5%E9%97%AE%E9%A2%98/batch.jpg)

  [分批插入 DEMO](https://chrisdeo.github.io/divDemo/chunk)。

#### [](https://chrisdeo.github.io/2019/07/22/%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86%E5%A4%A7%E9%87%8FDIV%E6%8F%92%E5%85%A5%E9%97%AE%E9%A2%98/#%E6%80%BB%E7%BB%93 "总结")总结

  1. 主线程与渲染线程互斥；  
  2. 同步阻塞时，页面会被“锁死”；  
  3. 减少对DOM的直接操作，考虑用`innerHTML`来替代直接DOM操作，如果实在需要，可以放入`Fragment`中进行；  
  4. 遇到计算量大的，可以分批处理，以“持续加载”的方式剔除计算量庞大带来的阻塞卡顿；  
  5. 将每一批次（Loop）处理的内容（包含处理+渲染）耗时控制在一帧内；
