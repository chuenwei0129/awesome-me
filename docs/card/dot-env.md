---
title: dotenv-cli
toc: content
---

[dotenv-cli](https://github.com/entropitor/dotenv-cli) 是一个命令行工具，用于方便地加载 `.env` 文件中的环境变量。在使用过程中，它可以帮助你在开发和部署时简化环境变量的配置。

## 安装

使用 npm 进行全局安装：

```bash
npm install -g dotenv-cli
```

或者作为项目的开发依赖：

```bash
npm install dotenv-cli --save-dev
```

## 使用

> 在开发和生产中，环境配置常常会有所不同。通过 `.env` 文件，你可以将这些配置集中管理。

假设你有一个 `.env` 文件：

```sh
API_KEY=your_api_key
DB_HOST=localhost
DB_USER=root
```

使用 `dotenv-cli` 可以在运行脚本时加载这些环境变量：

```bash
dotenv -e .env -- node yourScript.js
```

或者在 `package.json` 中配置脚本：

```json
{
  "scripts": {
    "start": "dotenv -e .env -- node server.js"
  }
}
```

## 注意事项

- 确保 `.env` 文件不会被提交到版本控制系统（如Git）。在 `.gitignore` 中添加 `.env` 是个好习惯。
- 在生产环境中，通常会采用其他方式来管理环境变量，比如环境配置管理服务。

使用 `dotenv-cli` 可以让你更轻松地在本地开发环境中管理和使用环境变量。
