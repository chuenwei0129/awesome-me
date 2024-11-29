---
title: 设备管理
toc: content
order: 4
group:
  title: 操作系统
  order: 3
---

## 设备控制器

我们的电脑设备可以接非常多的输入输出设备，比如键盘、鼠标、显示器、网卡、硬盘、打印机、音响等等，每个设备的用法和功能都不同。那么，操作系统是如何把这些输入输出设备统一管理的呢？🖥️

为了屏蔽设备之间的差异，每个设备都有一个叫 **设备控制器 (Device Control)** 的组件，例如：

- 硬盘有硬盘控制器
- 显示器有视频控制器

CPU 通过读写设备控制器中的寄存器控制设备，这比 CPU 直接控制输入输出设备要方便和标准很多。💻

## I/O 控制方式

每种设备都有一个设备控制器，它相当于一个小 CPU，可以处理一些事务。那么，当 CPU 给设备发送指令，让设备控制器读取设备的数据时，完成后如何通知 CPU 呢？

### 中断控制方式

我们一般会有一个 **硬件的中断控制器**，当设备完成任务后，触发中断到中断控制器。中断控制器就会通知 CPU，有一个中断产生，CPU 需要停下当前的任务来处理中断。

⚠️ 中断方式对于频繁读写数据的磁盘并不友好，CPU 容易经常被打断，会占用大量时间。对此，使用 **DMA (Direct Memory Access)** 功能是解决方案，它可以使得设备在 CPU 不参与的情况下，自动将 I/O 数据放入内存。

### DMA 工作方式

DMA 的工作流程如下：

1. **CPU 指令**：CPU 需对 DMA 控制器发出指令，告诉它要读取多少数据，数据放在内存的某个地方。
2. **数据传输**：DMA 控制器向磁盘控制器发出指令，让其从磁盘读取数据到内部缓冲区。
3. **确认信号**：磁盘控制器把数据传输到内存后，在总线上发出确认信号到 DMA 控制器。
4. **中断通知**：DMA 控制器收到信号后，发中断通知 CPU 指令完成，CPU 就可以使用内存中的数据了。

通过使用 DMA，CPU 只需给 DMA 控制器发送指令，然后返回去处理其他事务，直到 DMA 完成数据传输并通过中断告知 CPU，数据已经准备好。📊

## 设备驱动程序

虽然设备控制器屏蔽了设备的许多细节，但每种设备的控制器寄存器、缓冲区等使用模式是不同的。因此，为了屏蔽这些差异，引入了 **设备驱动程序**。

- 设备控制器属于硬件，而设备驱动程序属于操作系统的一部分。
- 操作系统的内核代码可以像本地调用代码一样使用设备驱动程序的接口。
- 设备驱动程序是面向设备控制器的代码，发出操控设备控制器的指令后，才能操作其设备。

不同的设备控制器虽然功能不同，但是设备驱动程序会提供统一接口给操作系统，这样不同的设备驱动程序就可以以相同方式接入操作系统。🔌

![设备驱动程序示意图](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240409231249.png)