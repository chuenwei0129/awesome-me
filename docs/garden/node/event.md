事件循环是现代异步编程模型中的一个核心概念，尤其是在JavaScript的Node.js环境中。事件循环使得非阻塞I/O操作成为可能，这意味着系统可以在等待一个操作完成（例如，从硬盘读取文件）的同时，继续处理其他事务，而不是坐等那个操作完成。

让我们用你提到的公交车比喻来解释事件循环的工作原理：

1. **公交车（事件循环）**: 想象有一辆公交车在城市中的一条线路上不断运行。这辆公交车就像是事件循环，它不停地检查是否有事件（站）需要处理。

2. **公交站（事件）**: 每个公交站代表一个事件，比如文件I/O、网络请求等。当没有事件时，公交车就一直开下去，不会停在任何站点，这就像是事件循环在等待事件的状态。

3. **epoll（事件通知系统）**: epoll是Linux中的一种I/O事件通知机制。在我们的比喻中，epoll就像是一个系统，能够通知公交车哪些站点有乘客等待。当一个I/O操作完成时，epoll告诉事件循环“站点有事件发生”，这时公交车就会停下来处理。

4. **事件处理（回调函数）**: 当公交车到达一个有等待事件的站点时，它会“处理”这个事件。在Node.js中，这通常意味着调用与该事件关联的回调函数。例如，如果一个文件读取操作完成了，事件循环会通知相应的回调函数执行，执行的结果会传递给JavaScript，这样JavaScript的回调函数就被调用。

5. **非阻塞（异步操作）**: 公交车在等待乘客的时候并不会停下来等待，它会继续沿着路线前进，检查其他站点。这就是非阻塞操作的本质：系统可以在等待某些操作完成的同时，继续做其他工作。

6. **CPU利用**: 当事件循环在等待事件（比如I/O操作）的时候，它实际上并不占用CPU资源。CPU只在处理事件（即运行回调函数）的时候被使用。这是因为等待I/O通常是由操作系统来管理的，所以事件循环可以在不消耗CPU资源的情况下等待。

总结一下，事件循环是一个不断运行的循环机制，它等待事件发生，并且当事件发生时调用相应的回调函数处理事件。这个机制允许Node.js等环境执行非阻塞操作，提高了资源的利用效率，因为它可以处理多个操作而不会互相阻塞。