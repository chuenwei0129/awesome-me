---
group:
  title: 扩展
title: Picgo
toc: content
---

# VSCode Picgo 插件设置

## 我的配置

如图：

![SCR-20221024-kwi](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/ts/SCR-20221024-kwi.png)

## 快捷键

![20221027151432](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/ts/20221027151432.png)

有关更多信息，请查看 [vs-picgo](https://github.com/PicGo/vs-picgo) 扩展页面。

## 拓展：PicGo 图床设置

### Github 仓库设置

首先你得有一个 GitHub 账号。

#### 1、新建一个公共仓库

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/picgo/create_new_repo.png)

记下你取的仓库名。

#### 2、生成一个 token 用于 PicGo 操作你的仓库

**访问**：<https://github.com/settings/tokens>。

然后点击 `Generate new token`。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/picgo/generate_new_token.png)

把 `repo` 的勾打上即可。然后翻到页面最底部，点击 `Generate token` 的绿色按钮生成 `token`。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/picgo/generate_token_repo.png)

**注意：**这个 `token` 生成后只会显示一次！你要把这个 `token` 复制一下存到其他地方以备以后要用。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/picgo/copy_token.png)

#### 3、配置 PicGo

**注意：**仓库名的格式是用户名/仓库，比如我创建了一个叫做 `test` 的仓库，在 PicGo 里我要设定的仓库名就是 `Molunerfinn/test`。一般我们选择 `main` 分支即可。然后记得点击确定以生效，然后可以点击**设为默认图床**来确保上传的图床是 GitHub。

```js
{
  "repo": "", // 仓库名，格式是 username/reponame
  "token": "", // github token
  "path": "", // 自定义存储路径，比如 img/
  "customUrl": "", // 自定义域名，注意要加 http:// 或者 https://
  "branch": "" // 分支名，默认是 main
}
```

至此配置完毕，已经可以使用了。当你上传的时候，你会发现你的仓库里也会增加新的图片了。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/picgo/success.png)

**更多功能设置**：<https://picgo.github.io/PicGo-Doc/>。
