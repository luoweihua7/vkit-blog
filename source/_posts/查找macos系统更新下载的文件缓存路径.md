---
title: 查找macOS系统更新下载的文件缓存路径
tags:
  - macOS
categories:
  - macOS
toc: true
date: 2022-11-09 12:34:56
cover:
thumbnail:
---

查找macOS系统软件更新下载文件的对应缓存路径地址

<!-- more -->

在macOS设置的软件更新下载时，有些时候希望可以删除缓存或者提取下载的更新包，此时需要查找到对应的缓存文件地址，然后进行操作。


# 查找应用 `Software Update.app` 中 `softwareupdated` 的进程ID

```sh
ps -e | grep Update.app | grep softwareupdated
```

[!step1](/assets/images/macOS/software-update-step1.png)


# 查找进程所打开的文件信息列表

通过 `lsof` 命令查找对应进程打开的文件列表，然后找到一个文件大小与软件更新进度中差不多大小的文件，即为缓存文件地址。

当然，也可以快速通过过滤 `private` 文件夹来过滤出下载的文件缓存的路径

```sh
sudo lsof -p <id> | grep private
```

例如在系统更新时，可以通过查找统一的系统安装包文件名 `InstallAssistant.pkg`， 进一步快速确认对应的路径地址

[!step2](/assets/images/macOS/software-update-step2.png)


至于系统安装的下载地址，后续有诉求了再更新这里


# 参考

[https://apple.stackexchange.com/a/449563](https://apple.stackexchange.com/a/449563)