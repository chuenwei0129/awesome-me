---
group:
  title: 扩展
title: Auto Rename Tag
toc: content
---

# Auto Rename Tag 配置

## Extension

- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag) (3.3M downloads): “Automatically rename paired HTML/XML tag, same as Visual Studio IDE does.”

## Setting

- `Editor: Linked Editing`: “Controls whether the editor has linked editing enabled. Depending on the language, related symbols, e.g. HTML tags, are updated while editing.” Default is `false`.

> Update 09/01/21 - `editor.renameOnType` is deprecated and is replaced by `editor.linkedEditing`.

Auto-renaming is supported in HTML files only at the moment. There is an [open issue](https://github.com/microsoft/vscode/issues/85707) to add this for JSX files.

The Vetur extension has a [long-standing issue](https://github.com/vuejs/vetur/issues/565) open to add this.
