---
title: Git 常用命令
tags:
  - Git
  - 命令
categories:
  - Git
toc: true
date: 2022-08-20 03:19:12
updated: 2022-08-20 03:19:12
cover: /assets/images/git-cmd.png
thumbnail:
---

一些 Git 日常使用到的命令。

<!-- more -->

## 查看状态

```bash
git status
```

## 添加修改

```bash
git add [file]
```

## 提交修改

```bash
git commmit -m "Comment"
```

或者全部提交

```bash
git commit -am "Comment"
```

## 提交到GitHub

```bash
git remote add origin git@xx.xx.xx.xx:repos/xxx/xxx/xxx.git
git push origin
git push origin master
```

## Git添加删除源
```bash
git remote remove origin
git remote add origin http://github.com/user/repo.git
git push --set-upstream origin master
```

## Git查看日志
```bash
git log --pretty=format:"%an, %ae - %s"
git log --tags --no-walk --pretty="%ci %h %D"

# 获取最后的一个tag
git describe --tags `git rev-list --tags --max-count=1`
```

## Git创建分支
```bash
git branch [branch name]
git checkout [branch name]
git push -u origin [branch name]
# 推送到远程分支的完整命令为
git push --set-upstream origin [branch name]
```

## 查看远程分支
```bash
git branch -r
```

## Git删除分支
```bash
# 删除本地分支
git branch -D [branch name]

# 删除远程分支
git push origin --delete [branch name]
# 或者使用缩写参数（这里是小写d）
git push origin -d [branch name]
```

## Git查看代码提交的用户列表
```bash
git log --pretty='%aN' | sort | uniq -c | sort -k1 -n -r
```

## 统计某人的代码提交量
```bash
git log --author="$(git config --get user.name)" --pretty=tformat: --numstat | gawk '{ add += $1 ; subs += $2 ; loc += $1 - $2 } END { printf "added lines: %s removed lines : %s total lines: %s\n",add,subs,loc }' -
```

## 创建一个空分支
_注意：这里没有文件提交，新分支是看不到的_
```bash
git checkout --orphan [branch name]
git rm -rf .
git commit -am 'Initialize'

```

## 禁止某邮箱提交的解决办法
提交时提示禁止使用某邮箱名，原因是在global配置了通用的邮箱名和用户信息，在提交某些有限制的源时会提示如下的信息
> You cannot push commits with committer "xxx@xxx.com" ....


解决办法是执行以下代码后再提交
```bash
git commit --amend --reset-author --no-edit
```

如果还是不行，则尝试现在源目录下设置用户名和邮箱，然后再进行提交
```bash
git config user.email xxxx@xxx.com
git config user.name xxxx
```

设置拉取代码的换行（Windows和macOS混用时）
```sh
# 可选 global 或者 system，参数可选 true/false/input
# 设置后重新拉取代码
git config --global core.autocrlf input
```