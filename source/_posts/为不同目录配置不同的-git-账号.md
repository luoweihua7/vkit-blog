---
title: 为不同目录配置不同的 git 账号
tags:
  - Git
categories:
  - Git
toc: true
date: 2022-08-20 03:29:47
cover: /assets/images/git-config.png
thumbnail:
---

通过 `includeIf` 的 `gitdir` 来解决工作和个人不同目录下的 git 账号问题。

<!-- more -->

假设我们有两个目录 `~/work/` 和 `~/personal/`

# 准备工作

先准备两个配置文件分别是： `~/.work.gitconfig` 和 `~/.personal.gitconfig` 并配置好对应的内容

文件 **~/.work.gitconfig**

```
[user]
name = work_name
email = work_name@tencent.com
```


文件 **~/.personal.gitconfig**

```
[user]
name = person_name 
email = person_name@domain.ltd
```

# .gitconfig 文件配置
我们有一个全局的 git 配置在 **Home** 目录 `~/.gitconfig` (如果没有就创建，注意目录结尾不要少了 `/` )

```
[includeIf "gitdir:~/work/"]
    path = .work.gitconfig
[includeIf "gitdir:~/personal/"]
    path = .personal.gitconfig
```

# 验证结果

切换到不同目录读取一下配置即可验证：

```sh
$ cd ~/work
$ git config --get user.email
```

大功告成，其实就是简单利用了 `includeIf` 实现不同目录匹配不同配置。

<br>
