# Git 简单学习与高频使用的命令

## Git 基础知识

## 高频使用的命令

## 遇到的问题

Git Push 提示不支持具有 Socks5 方案的代理

### 场景

使用 Git Push 提交代码到远程服务器时提示了一个错误

```sh
fatal: NotSupportedException encountered.
   ServicePointManager 不支持具有 socks5 方案的代理
```

然而之后还是正常提交成功了，实际上问题是：

- 配置了本地的 socks5 的代理（ Shadowsocks 之类的代理软件）
- 配置了远程服务器 Git 服务端的 SSH
- 本地提交代码到远程服务器时使用的是 http / https 协议
  这三者只要有一个不满足就不会出现这个错误了

## 个性化提交：Git Emoji 指南

|        emoji        |        emoji 代码        |      commit 说明      |
| :-----------------: | :----------------------: | :-------------------: |
|     🎨 (调色板)     |         `:art:`          | 改进代码结构/代码格式 |
| ⚡️ (闪电)🐎 (赛马) |  `:zap:` `:racehorse:`   |       提升性能        |
|      🔥 (火焰)      |         `:fire:`         |    移除代码或文件     |
|      🐛 (bug)       |         `:bug:`          |       修复 bug        |
|     🚑 (急救车)     |      `:ambulance:`       |       重要补丁        |
|      ✨ (火花)      |       `:sparkles:`       |      引入新功能       |
|     📝 (备忘录)     |         `:memo:`         |       撰写文档        |
|      🚀 (火箭)      |        `:rocket:`        |       部署功能        |
|      💄 (口红)      |       `:lipstick:`       |  更新 UI 和样式文件   |
|      🎉 (庆祝)      |         `:tada:`         |       初次提交        |
|   ✅ (白色复选框)   |   `:white_check_mark:`   |       增加测试        |
|       🔒 (锁)       |         `:lock:`         |     修复安全问题      |
|      🍎 (苹果)      |        `:apple:`         |  修复 macOS 下的问题  |
|      🐧 (企鹅)      |       `:penguin:`        |  修复 Linux 下的问题  |
|      🏁 (旗帜)      |     `:checked_flag:`     | 修复 Windows 下的问题 |
|      🔖 (书签)      |       `:bookmark:`       |     发行/版本标签     |
|     🚨 (警车灯)     |    `:rotating_light:`    |   移除 linter 警告    |
|      🚧 (施工)      |     `:construction:`     |      工作进行中       |
|      💚 (绿心)      |     `:green_heart:`      |   修复 CI 构建问题    |
|    ⬇️ (下降箭头)    |      `:arrow_down:`      |       降级依赖        |
|    ⬆️ (上升箭头)    |       `:arrow_up:`       |       升级依赖        |
|      👷 (工人)      | `:construction_worker:`  |   添加 CI 构建系统    |
|      🔨 (锤子)      |        `:hammer:`        |       重大重构        |
|      ➖ (减号)      |   `:heavy_minus_sign:`   |     减少一个依赖      |
|      🐳 (鲸鱼)      |        `:whale:`         |    Docker 相关工作    |
|      ➕ (加号)      |   `:heavy_plug_sign:`    |     增加一个依赖      |
|      🔧 (扳手)      |        `:wrench:`        |     修改配置文件      |
|      🌐 (地球)      | `:globe_with_meridians:` |    国际化与本地化     |
|      ✏️ (铅笔)      |       `:pencil2:`        |       修复 typo       |

## 参考

- [廖雪峰 Git 教程](https://www.liaoxuefeng.com/wiki/896043488029600/896827951938304)
- [高频使用的 Git 命令](https://juejin.im/post/5de8d849e51d455808332166)
- [个性化提交：Git Emoji 指南](https://gitmoji.carloscuesta.me/)
- [Git 资料汇总](https://github.com/xirong/my-git)
