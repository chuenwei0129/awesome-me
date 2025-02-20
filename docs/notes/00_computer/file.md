---
title: 文件系统
toc: content
order: 3
group:
  title: 操作系统
  order: 3
---

## 文件系统 🗂️

文件系统是操作系统中负责管理持久数据的子系统。简单来说，它负责将用户的文件存储到磁盘硬件中。即使计算机断电，磁盘中的数据仍然不会丢失，因此可以持久化地保存文件。

文件系统的基本数据单位是**文件**。其目的是对磁盘上的文件进行组织和管理。组织方式的不同，会形成不同的文件系统。

根据存储位置的不同，Linux 支持的文件系统可以分为三类：

1. **磁盘的文件系统**
   - 直接把数据存储在磁盘中。
   - 示例：Ext 2/3/4、XFS 等。

2. **内存的文件系统**
   - 数据不是存储在硬盘上，而是占用内存空间。
   - 示例：`/proc` 和 `/sys` 文件系统，读写这类文件实际上是在读写内核中的相关数据。

3. **网络的文件系统**
   - 用于访问其他计算机主机数据的文件系统。
   - 示例：NFS、SMB 等。

文件系统必须先挂载到某个目录，才能正常使用。例如，在 Linux 系统启动时，文件系统会被挂载到根目录。

## 虚拟文件系统

文件系统的种类众多，而操作系统希望对用户提供一个统一的接口，于是在用户层与文件系统层引入了中间层，这个中间层就称为虚拟文件系统 (Virtual File System，VFS)。

VFS 定义了一组所有文件系统都支持的数据结构和标准接口，这样程序员不需要了解文件系统的工作原理，只需要了解 VFS 提供的统一接口即可。

![20240409224729](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240409224729.png)

## 缓冲区和缓存

缓冲区 (Buffer) 和缓存 (Cache) 是两个不同的概念，尽管它们在某些方面有一些相似之处。

**缓冲区 (Buffer) 是一种用于临时存储数据的区域**。它通常用于在数据传输过程中平衡发送方和接收方之间的速度差异。缓冲区可以是物理的 (如内存中的一块区域) 或逻辑的 (如软件中的数据结构)。它的目的是在数据传输过程中提供临时存储，以便发送方和接收方之间的数据流能够平滑进行。例如，在网络通信中，**数据可以先存储在发送方的发送缓冲区中，然后逐步传输到接收方的接收缓冲区中**。

**缓存 (Cache) 是一种高速存储器，用于临时存储频繁访问的数据，以提高数据访问速度**。缓存通常位于 CPU 和主存之间，用于存储最近使用的数据和指令。当 CPU 需要访问数据时，它首先检查缓存中是否存在所需的数据。如果数据在缓存中找到 (命中)，那么 CPU 可以快速获取数据，从而提高访问速度。如果数据不在缓存中 (未命中)，那么 CPU 需要从主存中获取数据，并将其存储到缓存中，以备将来的访问。

因此，缓冲区和缓存的主要区别在于其功能和使用场景。缓冲区主要用于平衡数据传输过程中的速度差异，而缓存主要用于提高数据访问速度。缓冲区是临时存储数据的区域，而缓存是用于存储频繁访问的数据的高速存储器。

## 文件的使用

![20240409224842](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240409224842.png)

## [文件的存储](https://xiaolincoding.com/os/6_file_system/file_system.html#%E6%96%87%E4%BB%B6%E7%9A%84%E5%AD%98%E5%82%A8)

文件的数据是要存储在硬盘上面的，数据在磁盘上的存放方式，就像程序在内存中存放的方式那样，有以下两种：

- 连续空间存放方式
- 非连续空间存放方式

## 软链接和硬链接

1. 注意，多个用户共享同一个文件，意味着系统只有 “一份” 文件数据。并且只要某个用户修改了该文件的数据，其他用户也可以看到文件的变化。
2. 软连接可以理解为 windows 里的快捷方式。
3. 硬链接可以理解为 js 里的引用计数，只有引用为 0 的时候，才会真正删除这个文件。

## 文件 I/O

![20240409225543](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240409225543.png)

I/O 是分为两个过程的：

1. 数据准备的过程
2. 数据从内核空间拷贝到用户进程缓冲区的过程

阻塞 I/O 会阻塞在 “过程 1” 和 “过程 2”，而非阻塞 I/O 和基于非阻塞 I/O 的多路复用只会阻塞在 “过程 2”，所以这三个都可以认为是同步 I/O。

异步 I/O 则不同，“过程 1” 和 “过程 2” 都不会阻塞。

举个你去饭堂吃饭的例子，你好比用户程序，饭堂好比操作系统。

阻塞 I/O 好比，你去饭堂吃饭，但是饭堂的菜还没做好，然后你就一直在那里等啊等，等了好长一段时间终于等到饭堂阿姨把菜端了出来 (数据准备的过程)，但是你还得继续等阿姨把菜 (内核空间) 打到你的饭盒里 (用户空间)，经历完这两个过程，你才可以离开。

非阻塞 I/O 好比，你去了饭堂，问阿姨菜做好了没有，阿姨告诉你没，你就离开了，过几十分钟，你又来饭堂问阿姨，阿姨说做好了，于是阿姨帮你把菜打到你的饭盒里，这个过程你是得等待的。

基于非阻塞的 I/O 多路复用好比，你去饭堂吃饭，发现有一排窗口，饭堂阿姨告诉你这些窗口都还没做好菜，等做好了再通知你，于是等啊等 (select 调用中)，过了一会阿姨通知你菜做好了，但是不知道哪个窗口的菜做好了，你自己看吧。于是你只能一个一个窗口去确认，后面发现 5 号窗口菜做好了，于是你让 5 号窗口的阿姨帮你打菜到饭盒里，这个打菜的过程你是要等待的，虽然时间不长。打完菜后，你自然就可以离开了。

异步 I/O 好比，你让饭堂阿姨将菜做好并把菜打到饭盒里后，把饭盒送到你面前，整个过程你都不需要任何等待。

## 网络 I/O

最基础的 TCP 的 Socket 编程，它是阻塞 I/O 模型，基本上只能一对一通信，那为了服务更多的客户端，我们需要改进网络 I/O 模型。

比较传统的方式是使用多进程/线程模型，每来一个客户端连接，就分配一个进程/线程，然后后续的读写都在对应的进程/线程，这种方式处理 100 个客户端没问题，但是当客户端增大到 10000 个时，10000 个进程/线程的调度、上下文切换以及它们占用的内存，都会成为瓶颈。

为了解决上面这个问题，就出现了 I/O 的多路复用，可以只在一个进程里处理多个文件的 I/O。
