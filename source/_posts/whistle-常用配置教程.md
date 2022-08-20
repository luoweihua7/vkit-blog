---
title: Whistle 常用配置教程
date: 2022-08-20 00:06:30
cover: /assets/images/whistle.png
tags:
  - Whistle
categories:
  - 开发
  - 前端开发
  - Whistle
toc: true
---


[Whistle](https://github.com/avwo/whistle) 是基于 Node 实现的跨平台抓包调试工具。
记录以下 Whistle 从安装到配置的一些经验，同时也作为备忘让自己可以在想要时使用。

<!-- more -->


# 安装 Whistle

需要先安装 [NodeJS](https://nodejs.org/en/)，建议安装最新的 LTS 版本。
NodeJS 安装好后，使用以下命令，在全局安装 Whistle，后续即可使用 `w2` 命令启用 Whistle。

```sh
npm install whistle --location=global
```

> `npm i -g whistle` 时一直提示使用 `--location=global`，所以这里就使用了新的参数


# 配置证书

```sh
w2 start --init
```

支持 Windows 和 macOS 系统的证书安装。需要输入密码或者确认时，确认通过并输入密码即可。

# 初识 Whistle

在浏览器打开 [http://127.0.0.1:8899](http://127.0.0.1:8899) 地址，可以访问到 Whistle 的首页。

// TODO 这里添加图片等


# 个人设置【可选】

以下为自己使用的 Whistle 设置，可以根据自己的需求进行配置。


# Whistle 配置

## 资源代理配置


### 域名代理

指定域名代理，顺序不重要，同时可以配置端口。

```
# 配置域名代理
www.example.com 123.123.123.123
www.example.com 123.123.123.123:8888

# 与上面的配置效果是一样的
123.123.123.123 www.example.com
123.123.123.123:8888 www.example.com
```

_使用技巧：如果将 IP 地址，配置为不存在的地址，可以实现去广告的效果_

### 域名正则代理

使用正则表达式配置域名代理。
以下配置，会将 `example.com` 及子域名如 `xxx.example.com` 代理到 `123.123.123.123`。

```
/example.com/ 123.123.123.123
```


### Https降级

可以将 Https 请求转为 Http，可以解决代理服务没有配置证书的场景。
一般无需配置，Whistle 好像可以自动转，有问题后再使用。

```
www.example.com http://www.example.com
www.example.com 123.123.123.123:8888
```

### 拦截请求

在客户端拦截请求，使得请求不再访问到服务器，在 Whistle 直接返回 JSON 内容。

```
www.example.com statusCode://200 resBody://({"code":"1"})
```

### 隐藏请求记录

有些时候，想要在Network中隐藏请求记录。

```
# 隐藏指定请求路径的请求记录
/path/to/api.php/ enable://hide

# 隐藏指定页面的请求记录
/path/to/index.html/ enable://hide

# 隐藏 OPTIONS 请求
/example.com/ enable://hide includeFilter://m:options
```

### 请求正则替换

可以根据路径代理请求。

```
/web/static/([^.]*)\.(.*).js/  xfile///Users/yourname/web/static/$1.js
```

上面的规则，效果如下：

> 尝试使用本地资源 `/Users/yourname/web/static/index.js` 替换 `/web/static/index.abc1323a.js` 请求
> 
> 如果本地资源不存在，则继续使用原网络上的资源


## 修改请求内容

### 修改请求资源配置

```
# 在请求地址中添加请求参数
/cgi-bin/api.json/  reqMerge://(a=1&b=2&rnd=13ac)
/cgi-bin/api.json/  reqMerge://{"a":1,"b":2,"rnd":"13ac"}
# 也可以在Values中以配置文件的形式添加更多的请求参数
/cgi-bin/api.json/  reqMerge://{query_string.json}

# 修改Cookie
/cgi-bin/api.json/  reqCookies://{cookie.json}
```

## 修改响应内容

### 添加跨域头

部分请求会因为没有跨域头，导致请求失败。可以在 Whistle 中添加跨域头配置，解决调试问题。
一般建议配置成 `resCors://enable` 即可。


```
# 返回 access-control-allow-origin: *
www.example.com resCors://*

# 返回 access-control-allow-origin: <请求头中Origin的域名>
www.example.com resCors://enable
```





