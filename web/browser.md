
有一个叫做 window 的“根”对象。它有两个角色：

首先，它是 JavaScript 代码的全局对象，如 全局对象 一章所述。
其次，它代表“浏览器窗口”，并提供了控制它的方法。
navigator 对象提供了有关浏览器和操作系统的背景信息。navigator 有许多属性，但是最广为人知的两个属性是：navigator.userAgent — 关于当前浏览器，navigator.platform — 关于平台（可以帮助区分 Windows/Linux/Mac 等）。
location 对象允许我们读取当前 URL，并且可以将浏览器重定向到新的 URL。