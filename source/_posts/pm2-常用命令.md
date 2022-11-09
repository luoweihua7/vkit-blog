---
title: PM2 常用命令
tags:
  - 命令
categories:
  - 开发
  - 服务端开发
  - PM2
toc: true
date: 2022-08-20 03:48:24
updated: 2022-08-20 03:48:24
cover: /assets/images/pm2.png
thumbnail:
---

[PM2](https://pm2.keymetrics.io/) 是 NodeJS 进程管理工具，提供了Node应用管理，如自动重载，进程守护等特性。用来管理并查看Node进程的状态。这里列出一些常用命令，依然是作为备忘。

<!-- more -->

# 万金油命令
```
pm2 -h
pm2 [option] -h
```

# 启动
```
pm2 start ./path/to/process.conf.js --name service-name
```

# 停止
```
pm2 stop ./path/to/process.conf.js
```

# 停止某服务/模块
```
pm2 stop service-name
pm2 stop 0
```

# 重启
```
pm2 restart 0
pm2 restart service-name
```

# 无损重启
```
pm2 reload 0
pm2 reload service-name
```

# 删除服务
```
pm2 delete service-name
```

# 查看日志
```
pm2 logs
```

# 清空日志
```
pm2 flush
```

# 结束进程
同时退出Daemon
```
pm2 kill
```