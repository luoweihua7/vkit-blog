---
title: 通过Cloudflare的Worker实现更新 DDNS 服务接口
tags:
  - Cloudflare
categories:
  - 开发
  - Cloudflare
toc: true
date: 2022-11-05 01:23:45
updated: 2022-11-05 01:23:45
cover: /assets/images/cf-worker.png
thumbnail:
---

利用Cloudflare的 Worker，搭建 DDNS 更新服务接口

<!-- more -->

最近将家里的iKuai软路由拨号更换为 RouterOS 硬路由器。打开页面虽然感受上没有太大的变化，但是发现DNS解析快很多，于是决定将RouterOS作为主路由使用。

之前在iKuai下进行的DDNS自动更新的服务，也需要修改到RouterOS中。

经过一通骚操作，解决了DNSPod的更新，发现ROS的命令，对新手来说，还是有些上手难度。

因今年开始腾讯云免费大量收紧，正在将腾讯云的 Serverless 函数迁移到 Cloudflare Worker，便把DDNS写了一个Worker。

# 准备条件

注册Cloudflare账户

[可选] Cloudflare域名，如果在CF有域名，则可以实现自己域名的dns更新服务


# 初始化

Cloudflare 有 Worker 的官方脚手架 [wrangler](https://developers.cloudflare.com/workers/wrangler/)。

## 安装NodeJS

在 https://nodejs.org 下载并安装NodeJS

安装好后打开命令行检查是否可以正确输出版本号
```sh
node -v
npm -v
```

## 初始化Worker

通过 Wrangler 脚手架创建初始化，按照提示一步步操作即可。

```sh
npx wrangler generate ddns
```

# 业务实现

开发初始时是想着自己用到了什么服务就随便写一个，所以代码写的很凌乱。

整体的流程分为几个步骤：

1. 检查DDNS域名是否存在，如果存在则获取到对应域名的记录ID
2. 如果记录ID存在，则通过记录ID更新DDNS
3. 如果记录ID不存在，则新建一个A记录，实现DDNS

具体的代码可以看这里 [https://github.com/luoweihua7/cloudflare-ddns-worker.git](https://github.com/luoweihua7/cloudflare-ddns-worker.git)

# 使用

## 克隆代码
将上面的代码克隆到本地

```sh
git clone https://github.com/luoweihua7/cloudflare-ddns-worker.git
```

## 安装依赖

```sh
cd cloudflare-ddns-worker/src
npm install
```

## 部署

在这里，你应该修改一下文件 `cloudflare-ddns-worker/wrangler.toml` 中的 `name` 字段内容，修改为自己喜欢的名字，比如 `ddns`，创建worker时会以此名称作为域名前缀。

```sh
npm run deploy
```

部署时按照提示一步步进行操作即可。

## 使用

替换对应参数后，按照对应服务，进行访问


### DNSPod

先在 [https://console.dnspod.cn/account/token/token](https://console.dnspod.cn/account/token/token) 中申请到DNSPodToken （暂时没试过腾讯云的API密钥，也可以试试)

> `id`: ID，例如 123456，以自己申请到的为准
> 
> `key`: Token，例如 abcd1234，以自己申请到的为准
> 
> `domain`: 主域名，主域名，主域名。例如 baidu.com
> 
> `record`: 记录值，例如 ddns，或者多级子域名如 ddns.api
> 
> `ip`: 新的IP地址



```
https://<wrangler.toml中的name>.<你的子域>.workers.dev/dp?id=<id>&key=<key>&domain=<domain>&record=<record>&ip=<ip>
```

### Aliyun

> `id`: ID，例如 123456，以自己申请到的为准
> 
> `key`: Token，例如 abcd1234，以自己申请到的为准
> 
> `domain`: 主域名，主域名，主域名。例如 baidu.com
> 
> `record`: 记录值，例如 ddns，或者多级子域名如 ddns.api
> 
> `ip`: 新的IP地址

```
https://<wrangler.toml中的name>.<你的子域>.workers.dev/ali?id=<id>&key=<key>&domain=<domain>&record=<record>&ip=<ip>
```

### Cloudflare

> `id`: 邮箱地址，账号的登录邮箱。也可以传空值
> 
> `key`: API密钥，注意需要有对应的权限，在 [https://dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens) 中找 `Global API Key`。当id为空时，这个参数字段需要使用创建的 `API令牌`，注意给对应令牌相应的权限
> 
> `domain`: 主域名，主域名，主域名。例如 baidu.com
> 
> `record`: 记录值，例如 ddns，或者多级子域名如 ddns.api
> 
> `ip`: 新的IP地址

```
https://<wrangler.toml中的name>.<你的子域>.workers.dev/cf?id=<id>&key=<key>&domain=<domain>&record=<record>&ip=<ip>
```
