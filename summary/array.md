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
