---
group:
  title: tools
  order: 99
title: VSCode PicGo 扩展
toc: content
---

## 前置配置

对于 [PicGo-electron](https://github.com/Molunerfinn/PicGo) 用户，需要在 VSCode 中配置 PicGo 扩展使用相同的配置文件路径：

![VSCode PicGo 配置](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/awesome-me/20251105054811.png)

## 快捷键使用

PicGo 扩展提供了便捷的快捷键操作：

- **上传图片**：`Ctrl + Alt + U`（Windows/Linux）或 `Cmd + Opt + U`（macOS）
- 其他操作可通过命令面板（`Ctrl+Shift+P`）搜索 "PicGo" 查看

![快捷键说明](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/ts/20221027151432.png)

更多详细信息，请访问 [vs-picgo 扩展页面](https://github.com/PicGo/vs-picgo)。

## 图床配置（以 GitHub 为例）

### 1. 创建 GitHub 仓库

首先确保您拥有 GitHub 账号，然后创建一个新的公共仓库：

![创建新仓库](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/picgo/create_new_repo.png)

请记下您设置的仓库名称。

### 2. 生成访问 Token

访问 [GitHub Token 设置页面](https://github.com/settings/tokens)，点击 `Generate new token`：

![生成新 Token](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/picgo/generate_new_token.png)

在权限设置中，至少勾选 `repo` 权限，然后滚动到页面底部点击 `Generate token`：

![设置 Token 权限](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/picgo/generate_token_repo.png)

**重要提示**：Token 生成后只会显示一次，请立即复制并妥善保存：

![复制 Token](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/picgo/copy_token.png)

### 3. 配置 PicGo

在 VSCode PicGo 扩展配置中填写以下信息：

```json
{
  "repo": "用户名/仓库名", // 例如：chuenwei0129/my-picgo-repo
  "token": "您的GitHubToken", // 上一步生成的 token
  "path": "img/", // 图片存储路径（可选）
  "customUrl": "", // 自定义域名（可选）
  "branch": "main" // 分支名称，默认为 main
}
```

配置完成后，点击确定保存设置，并可将 GitHub 图床设为默认图床。

### 4. 验证配置

上传图片测试配置是否成功，成功后您将在仓库中看到新增的图片文件：

![上传成功](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/picgo/success.png)

## 更多功能

如需了解更多高级功能和配置选项，请参阅 [PicGo 官方文档](https://picgo.github.io/PicGo-Doc/)。
