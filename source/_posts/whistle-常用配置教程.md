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

有些时候，想要在Network中隐藏请求记录。<br>
下方的规则中，如果是正则，可能还需要转义，具体以实际效果为准。

```
# 隐藏指定请求路径的请求记录
/path/to/ enable://hide

# 隐藏指定页面的请求记录
/path/to/index.html/ enable://hide

# 隐藏 OPTIONS 请求
/example.com/ enable://hide includeFilter://m:options
```

### 请求正则替换

可以根据路径代理请求。

```
/web/static/([^.]*)\.(.*).js/  xfile:///Users/yourname/web/static/$1.js
```

上面的规则，效果如下：

> 尝试使用本地资源 `/Users/yourname/web/static/index.js` 替换 `/web/static/index.abc1323a.js` 请求
> 
> 如果本地资源不存在，则继续使用原网络上的资源
> 
> 具体是使用 `file://` 还是 `xfile://` 可根据实际需求按需配置。更多的可参考whistle的文档


## 修改请求内容

这里特别强调一下（Whistle文档中的 [操作值](http://wproxy.org/whistle/data.html) 部分亦有说明），如果需要操作的字符串（比如UA头，Cookie的值，请求的参数内容等）包含 **空格**，则需要把 **操作值** 放到 **Values** 或者 **本地文件** 中

### 修改请求资源配置

```
# 在请求地址中添加请求参数，以下配置会在往真实服务器请求的search参数中添加对应的参数
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
一般配置成 `resCors://*` 或者 `resCors://enable` 即可。


```
# 返回 access-control-allow-origin: *
www.example.com resCors://*

# 返回 access-control-allow-origin: <请求头中Origin的域名>
www.example.com resCors://enable
```

### 接口Mock

```
# 本地替换来自指定页面发起的api请求，session.json为Values中的内容。按住 Ctrl或者⌘ 后点击 session.json 内容，可以快速跳转过去编辑
example.com/api/user/session statusCode://200 resCors://* resBody://{session.json} includeFilter://reqH:origin=https://admin.example.com
```

上面的规则配置说明

> `statusCode://` 拦截请求，直接返回200，不再发往远程服务器
> `resCors://` 允许跨域，一般用于接口，可按需配置
> `resBody://` 使用Values中的配置（session.json）作为body返回
> `includeFilter://` 仅拦截来自指定域名的接口请求


接口Mock还有一些是属于代理接口，即通过同一个接口url，通过参数进行转发到实际的业务后台地址，只要有不同的地方，则可以通过规则进行过率处理。

```
/api/proxy/api.json/ includeFilter://b:CheckNetwork resBody://({"retcode":0,"data":{}}) resCors://*
/api/proxy/api.json/ includeFilter://b:GetApiA resBody://{api_a.json} resCors://*
/api/proxy/api.json/ includeFilter://b:GetApiB resBody://{api_b.json} resCors://*
/api/proxy/api.json/ includeFilter://b:GetApiC resBody://{api_c.json} resCors://*
```

上面的规则中，通过统一的URL接口请求地址 `/api/proxy/api.json/`，在body中通过参数进行区分的反向代理。
配置说明

> `includeFilter://b:` 过滤出请求指定URL时，Body中包含指定字符串的请求（更多参数参考官方的帮助文档）
> `resBody://` 替换响应内容（注意这里没有使用 statusCode://，则还是会往真实服务器发送请求，这里只是把相应的内容替换了）
> `resCors://` 添加跨域头


## 调试

### 日志查看

可以通过添加 `log://` 将页面上的控制台输出，回报到 whistle 中进行展示。也可以指定对应的日志分类如 `log://type` ，可以快速的在 `Tools` > `Console` 下通过选择类型，过滤不同页面回报回来的日志信息

```
example.com log://xxxx
```

### weinre远程调试
通过添加 `weinre://` 可以通过 weinre 进行远程调试，适合用于 iOS 的一些App页面（Android的页面建议都是打开开发者调试后，通过Chrome的 [chrome://insepect](chrome://insepect) 进行调试）。

```
example.com weinre://
```

在移动端打开页面后，可以通过点击Whistle中Network面板顶部的 `Weinre` 菜单入口，进入移动端远程调试

## 其他一些比较通用的配置

```
# 使用代理
* proxy://ip:port
* socks://ip:port
* socks://username:password@ip:port

# 禁用缓存
* cache://no

# 允许CORS
* resCors://enable

# 跨域OPTIONS请求优化
# /.*.example.com/ resHeaders://{"access-control-max-age":7200}


# 颜色可以在这里选：https://tool.chinaz.com/tools/web
# HTML
* style://color=@3A3A3A&bgColor=@0099CC includeFilter://h:accept=html
# JSON
* style://color=@3A3A3A&bgColor=@98F898 includeFilter://h:accept=/json/ includeFilter://resH:content-type=/json/
# Image 弱化
* style://color=@A3A3A3 includeFilter://h:accept=/image/ excludeFilter://h:accept=html

# 404 高亮
* style://color=@fff&bgColor=@CC0033 includeFilter://s:404
* style://color=@fff&bgColor=@CC3366 includeFilter://s:503

# 隐藏OPTIONS请求
* enable://hide includeFilter://m:OPTIONS
```