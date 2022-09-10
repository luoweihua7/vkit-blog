---
title: 在旧电脑上安装Windows11
tags:
  - Windows
categories:
  - Windows
  - 安装
toc: true
date: 2022-09-10 22:49:40
cover: /assets/images/windows11.png
thumbnail:
---

在一些比较老旧的电脑上，安装Windows 11 系统

<!-- more -->

在 Windows 11 安装界面按 `Shift + F10` 打开命令行界面，执行如下命令：

输入 `regedit` 进入注册表编辑器，然后定位到如下位置 `HKEY_LOCAL_MACHINE\SYSTEM\Setup`，创建一个名为 `LabConfig` 的项，接着在 `LabConfig` 下创建两个 **DWORD 值**：

键名 `BypassTPMCheck`，赋值 `00000001`
键名 `BypassSecureBootCheck`，赋值 `00000001`

保存退出后，无法安装的提示就消失了。

