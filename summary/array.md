TL; DR

[关于 Proxy 代理数组的性能问题？](https://www.zhihu.com/question/460330154)


创建双端队列

class Deque{
 constructor() {
    this.queue = {}
    this.count = 0
    this.frontCount = 0
  }
}
双端队列包含和队列一样的属性：isEmpty、clear、size、toString

由于双端队列允许在俩端添加和移除元素，还会有下面几个方法：

addFront(element):该方法在双端队列前端添加元素
addBack(element):该方法在双端队列后面添加元素
removeFront(): 队列前端删除元素
removeBack()： 队列后端删除元素
peekFront():显示队列前端的第一个元素
peekBack():显示队列末尾的第一个元素
首先我们来实现死一个方法 addFront。有三种情况：1.队列为空时，相当于我们addBack()方法 2. frontCount值大于0时,我们再队列前面添加元素，并把frontCount-1 3.frontCount 等于0 时,我们把所有元素后移一个位置

addFront(element) {
  if(this.isEmpty()) {
    this.addBack()
  } else if(this.frontCount>0){
     this.queue[--this.frontCount] = element
   } else if(this.frontCount == 0) {
     for(let i = this.count; i>0;i--) {
       this.queue[i] = this.queue[i-1]
     }
     this.queue[0] = element
     this.count++
  }
}
接下来我们来实现队列末尾添加元素

addBack(element){
  this.queue[this.count++] = element
}
队列前端删除元素时，首先判断队列是否为空，空=>返回undefined，否则：记录下前面第一个元素，删除第一个元素，frontCount++,返回记录的结果

removeFront(){
  if(this.isEmpty()) {
    return undefined
  }
  const res = this.queue[this.frontCount]
  delete this.queue[this.frontCount]
  this.frontCount ++
  return res
}
删除队列后端元素

removeBack(){
  if(this.isEmpty()) {
    return undefined
  }
  const res = this.queue[this.count-1]
  delete this.queue[this.count-1]
  this.count --
  return res
}
返回队列前端第一个元素

peekFront(){
  if(this.isEmpty()) {
    return undefined
  }
  return this.queue[this.frontCount]
}
返回队列后端第一个元素

peekBack(){
  if(this.isEmpty()) {
    return undefined
  }
  return this.queue[this.count]
}
判断队列是否为空

isEmpty(){
 return this.count-this.frontCount == 0
}
返回队列元素个数

size(){
 return this.count-this.frontCount
}
将队列内元素转换为字符串

toString() {
  let str = ''
  if(!this.isEmpty()) {
    str = this.queue[this.firstPos]
    for(let i = this.firstPos+1;i< this.count;i++) {
      str = `${str},${this.queue[i]}`   
      }
  }
  return str
}

计算机科学中，双端队列常见的应用是存储一系列的撤销操作时。每当用户进行一个操作，改操作就会被存放在一个双端队列中。当用户Ctrl+Z时，该操作会被从双端队列弹出，表示它被从后面移除了。

双端队列

双端队列 是一种允许我们同时从前端和后端添加和删除元素的特殊队列，它是队列和栈的结合体。

现实生活中也有应用双端队列的例子：例如我们去电影院排队买票。一个刚刚买完票的人想回来咨询下简单信息，就可以直接回到队伍的头部。某些人正在队尾排队，如果比较赶时间，改变看电影的计划了，就可以从队尾直接离开队伍。

计算机科学中，双端队列常见的应用是存储一系列的撤销操作时。每当用户进行一个操作，改操作就会被存放在一个双端队列中。当用户Ctrl+Z时，该操作会被从双端队列弹出，表示它被从后面移除了。

作者：黄子毅
链接：https://zhuanlan.zhihu.com/p/67854042
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

Stable sort就是稳定排序结果的功能，比如下面的数组：const doggos = [
  { name: "Abby", rating: 12 },
  { name: "Bandit", rating: 13 },
  { name: "Choco", rating: 14 },
  { name: "Daisy", rating: 12 },
  { name: "Elmo", rating: 12 },
  { name: "Falco", rating: 13 },
  { name: "Ghost", rating: 14 }
];

doggos.sort((a, b) => b.rating - a.rating);最终排序结果可能如下：[
  { name: "Choco", rating: 14 },
  { name: "Ghost", rating: 14 },
  { name: "Bandit", rating: 13 },
  { name: "Falco", rating: 13 },
  { name: "Abby", rating: 12 },
  { name: "Daisy", rating: 12 },
  { name: "Elmo", rating: 12 }
];也可能如下：[
  { name: "Ghost", rating: 14 },
  { name: "Choco", rating: 14 },
  { name: "Bandit", rating: 13 },
  { name: "Falco", rating: 13 },
  { name: "Abby", rating: 12 },
  { name: "Daisy", rating: 12 },
  { name: "Elmo", rating: 12 }
];注意 choco 与 Ghost 的位置可能会颠倒，这是因为 JS 引擎可能只关注 sort 函数的排序，而在顺序相同时，不会保持原有的排序规则。现在通过 Stable sort 规范，可以确保这个排序结果是稳定的。目前已经被 Chrome、Firefox、Safari、Nodejs 支持。

Intl.RelativeTimeFormat

快排使用了分治策略的思想，所谓分治，顾名思义，就是分而治之，将一个复杂的问题，分成两个或多个相似的子问题，在把子问题分成更小的子问题，直到更小的子问题可以简单求解，求解子问题，则原问题的解则为子问题解的合并。

快排的过程简单的说只有三步：

首先从序列中选取一个数作为基准数
将比这个数大的数全部放到它的右边，把小于或者等于它的数全部放到它的左边 （一次快排 partition）
然后分别对基准的左右两边重复以上的操作，直到数组完全排序

但这对几乎已经有序的序列来说，并不是最好的选择，它将会导致算法的最坏表现。还有一种做法，就是选择中间的数或通过 Math.random() 来随机选取一个数作为基准，下面的代码实现就是以随机数作为基准。

快排的原理是基于二分法的思想，时间复杂度比较复杂，最好的情况是O(N)，最差的时候是O(N^2)，所以平时说的O(N*logN)为其平均时间复杂度。它的基本思想是：通过一趟排序将要排序的数据分割成独立的两部分，其中一部分的所有数据都比另外一部分的所有数据都要小，然后再按此方法对这两部分数据分别进行快速排序，整个排序过程可以递归进行，以此达到整个数据变成有序序列。

已经排好序了就是 O(n)，完全逆序就会退化到 O(n^2)

快速排序（Quicksort）是对冒泡排序的一种改进。
它的基本思想是：通过一趟排序将要排序的数据分割成独立的两部分，其中一部分的所有数据都比另外一部分的所有数据都要小，然后再按此方法对这两部分数据分别进行快速排序，整个排序过程可以递归进行，以此达到整个数据变成有序序列。
2 快速排序的三个步骤
1) 选择基准：在待排序列中，按照某种方式挑出一个元素，作为 “基准”（pivot）；
   2) 分割操作：以该基准在序列中的实际位置，把序列分成两个子序列。此时，在基准左边的元素都比该基准小，在基准右边的元素都比基准大；
   3) 递归地对两个序列进行快速排序，直到序列为空或者只有一个元素；
3  选择基准元的方式
对于分治算法，当每次划分时，算法若都能分成两个等长的子序列时，那么分治算法效率会达到最大。也就是说，基准的选择是很重要的。选择基准的方式决定了两个分割后两个子序列的长度，进而对整个算法的效率产生决定性影响。

最理想的方法是，选择的基准恰好能把待排序序列分成两个等长的子序列。

  方法1 固定基准元
如果输入序列是随机的，处理时间是可以接受的。如果数组已经有序时，此时的分割就是一个非常不好的分割。因为每次划分只能使待排序序列减一，此时为最坏情况，快速排序沦为冒泡排序，时间复杂度为Θ(n^2)。而且，输入的数据是有序或部分有序的情况是相当常见的。因此，使用第一个元素作为基准元是非常糟糕的，应该立即放弃这种想法。
方法2 随机基准元
这是一种相对安全的策略。由于基准元的位置是随机的，那么产生的分割也不会总是会出现劣质的分割。在整个数组数字全相等时，仍然是最坏情况，时间复杂度是O(n^2）。实际上，随机化快速排序得到理论最坏情况的可能性仅为1/(2^n）。所以随机化快速排序可以对于绝大多数输入数据达到O(nlogn）的期望时间复杂度。
方法3 三数取中
引入的原因：虽然随机选取基准时，减少出现不好分割的几率，但是还是最坏情况下还是O(n^2），要缓解这种情况，就引入了三数取中选取基准。

分析：最佳的划分是将待排序的序列分成等长的子序列，最佳的状态我们可以使用序列的中间的值，也就是第N/2个数。可是，这很难算出来，并且会明显减慢快速排序的速度。这样的中值的估计可以通过随机选取三个元素并用它们的中值作为基准元而得到。事实上，随机性并没有多大的帮助，因此一般的做法是使用左端、右端和中心位置上的三个元素的中值作为基准元。显然使用三数中值分割法消除了预排序输入的不好情形，并且减少快排大约5%的比较次数。

举例：待排序序列为：8 1 4 9 6 3 5 2 7 0

左边为：8，右边为0，中间为6

我们这里取三个数排序后，中间那个数作为枢轴，则枢轴为6。

对于很小的数组（N<=20）,快速排序不如插入排序好。不仅如此，因为快速排序是递归的，所以这样的情况经常发生。通常的解决办法是对于小的数组不递归的使用快速排序，而代之以诸如插入排序这样的对小数组有效的排序算法。使用这种策略实际上可以节省大约15%的（相对于自始至终使用快速排序时）的运行时间。一种好的截止范围是N=10，虽然在5到20之间任一截止范围都有可能产生类似的结果。

Bogo排序：算法原理特别简单，随机打乱数组，如果当前是有序的，就排序成功，否则继续随机打乱数组，直到有序位置。平均时间复杂度 O(n* n!)O(n∗n!)，最优时间复杂度 O(n)O(n)，最坏时间复杂度 ∞∞！

作者：sweetiee
链接：https://leetcode.cn/problems/sort-an-array/solution/dang-wo-tan-pai-xu-shi-wo-zai-tan-xie-shi-yao-by-s/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
当我谈排序时，我在谈些什么

数据流从纯客户端发展到全栈。 纯客户端数据流包括 Redux、MobX、Dva、Jotai、Recoil、Valtio、Zustand 等，基本都是「View > Action > State」单向数据流，跑在客户端。而很多应用实际上还有持久化数据和同步数据的需求，所以在这个单向数据流之外，还会有个和服务端交互的数据流。Remix 把这个数据流扩展到了全栈，通过获取数据的 loader 和修改数据的 action，形成「Loader > Component > Action」的全栈数据流。同时 React Query、SWR、RTK Query 和 useRequest 也可以理解为广义上的全栈数据流，处理服务端和客户端之间的数据同步。

Headless 组件风头正盛。 很多人会无脑选择 UI 框架，但如果业务复杂或者有自己的设计需求时，可能会针对框架做很多 hack；又或者 80% 的场景下很节省时间，遇到 20% 的需求不符的场景时，反而会花更多的时间去解。所以，最近 Headless 组件逐渐被大家接受，他们包含完整功能，但把设计部分留给开发者处理。比如 Reach UI、Headless UI、Radix UI、Downshift、React ARIA、Reakit、Ariakit、React Table 等都是，以及有基础样式的 Chakra UI 也算。结合 Tailwind CSS 快速打造符合自己设计系统的 UI 库。

我有一个简洁的表，可是这里内存开的太小写不下

作者：程序员吴师兄
链接：https://www.zhihu.com/question/358255792/answer/974431591
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

有的，比如 洗牌算法：这个算法真的很牛逼很经典，而且代码很少。评论区好多大佬，膜拜ing。。先来思考一个问题：有一个大小为 100 的数组，里面的元素是从 1 到 100 按顺序排列，怎样随机的从里面选择 1 个数？最简单的方法是利用系统的方法 Math.random() * 100 ，这样就可以拿到一个 0 到 99 的随机数，然后去数组找对应的位置就即可。接下来在思考一个问题： 有一个大小为100的数组，里面的元素是从 1 到 100 按顺序排列，怎样随机的从里面选择 50 个数？注意数字不能重复！注意数字不能重复！注意数字不能重复！如果根据上面的思路，你第一想法是：随机 50 次不就行了？但是，这样做有个很明显的 bug ：数字是会重复的。修改一下？弄一个数组，把每一次随机的数都放到数组里，下一次随机就看这个数组里面有没有这数，有的话就继续随机，直到这个数组里面有 50 个数字就停止。这样是可以的！但，还是有个小问题，考虑一下极端情况：有一个大小为100的数组，里面的元素是从 1 到 100 按顺序排列，怎样随机的从里面选择 99 个数。如果按照上面的方法操作，越往后选择的数字跟前面已经挑选的数字重复的概率越高，这就会造成如果数组很大，选择的数字数目也很大的话，重复次数在量级上会很大。这个时候就需要换一个思路，如果先将数组里面的元素打乱，那么按顺序选择前 50 个不就可以了？是的！但我们得注意什么叫乱？一副扑克有 54 张牌，有 54! 种排列方式。所谓的打乱指的是，你所执行的操作，应该能够 等概率地生成 这 54! 种结果中的一种。洗牌算法就能做到这一点。

洗牌算法Fisher–Yates shuffle 算法由 Ronald Fisher 和 Frank Yates 于 1938 年提出，在 1964 年由 Richard Durstenfeld 改编为适用于电脑编程的版本。这个算法很牛逼却很好理解，通俗的解释就是：将最后一个数和前面任意 n-1 个数中的一个数进行交换，然后倒数第二个数和前面任意 n-2 个数中的一个数进行交换。。。

作者：程序员吴师兄
链接：https://www.zhihu.com/question/358255792/answer/974431591
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

没人说floyd算法？求任意两点间最短路径。for (var k = 0; k < n; k++)
{
    for (var i = 0; i < n; i++)
    {
        for (var j = 0; j < n; j++)
        {
            if (f[i][k] + f[k][j] < f[i][j])
            {
                f[i][j] = f[i][k] + f[k][j];
            }
        }
    }
}

作者：羊羔
链接：https://www.zhihu.com/question/358255792/answer/1690148829
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

看见有人说gcd为什么没人说并查集呢

int find(int x){

return fa[x]==x? x:fa[x]=find(fa[x]);

}
