# git restore 命令

> 这条笔记创建于: 2022 年 10 月 27 日，星期四，22: 51。

`restore` 命令用于还原工作区或暂存区中的指定文件或文件集合：

```perl
# 撤销工作区的修改
git restore [文件名] # 同 git checkout -- [文件名]
# 撤销暂存区的修改
git restore [文件名] --staged
```
