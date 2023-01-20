# Mac 中 Git 大小写问题

> 这条笔记创建于: 2022 年 10 月 27 日，星期四，23: 31。

## 存在问题

Mac / Windows 环境下 Git 在不设置大小写敏感规则的时候默认大小写是不敏感，而 Linux 下 Git 是默认大小写敏感的。

如果不是必须要和 linux 用户一起工作，不建议改变默认行为。

> [为什么 Git 默认不区分文件夹大小写？](https://www.zhihu.com/question/57779034)

可以通过 `git mv` 操作来避免 Git 未识别：

```perl
git mv myfolder tmp
git mv tmp MyFolder
```

也可以修改 `git config` 来达到区分大小写：

```perl
git config core.ignorecase false
```

## 案例参考

### 问题复现

在 Mac 上开发程序，并使用 Git 进行版本管理，在使用 React 编写 Component 时，组件名一般建议首字母大写。

**在 React 组件的文件进行命名时，刚开始是小写，后来为了保持团队一致，又改成了大写，然而 Git 不会发现大小写的变化，此时就出了问题。**

再梳理一遍这个逻辑：

1. 小明编写组件 `button.js`，提交代码
2. 小明觉得组件命名不妥，改为 `Button.js`
3. 小明并修改所有文件对它的引用，本地环境运行正常，提交代码
4. 构建服务器通过 Git 拉取代码，进行构建，**Git 并未认识到 `button.js` 大小写发生变化**，所有引用 `Button.js` 的组件发生报错，失败

### 解决问题

通过 `git mv`，在 Git 暂存区中再更改一遍文件大小写解决问题

```perl
git mv test Test
```

但是修改文件夹时会出现一些问题：

```js
fatal: renaming 'dir' failed: Invalid argument
```

使用下边方法法修改：

```perl
git mv dir DirTemp
git mv DirTemp Dir
```
