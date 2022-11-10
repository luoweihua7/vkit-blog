---
title: 在RouterOS中使用Cloudflare的Worker接口更新DDNS
tags:
  - Cloudflare
  - RouterOS
categories:
  - 开发
  - RouterOS
toc: true
date: 2022-11-10 11:14:53
updated: 2022-11-10 11:14:53
cover:
thumbnail:
---

继《通过Cloudflare的Worker实现更新 DDNS 服务接口》实现了接口后，在RouterOS中通过接口调用实现动态更新DDNS

<!-- more -->

实现了Cloudflare的Worker接口后，就需要在RouterOS中进行调用来实现更新。

先说一下思路

1. 在网络连接（更新IP地址后），触发更新任务
2. 调用DDNS进行更新


# 创建更新脚本

更新脚本是修改自很早以前不知道哪里copy过来更新NoIP的一段脚本。实在是太久了，不知道具体的来源了。

在 `System` > `Scripts` 下创建新脚本。并记住脚本名称（添加定时任务要用）

脚本如下，需要按需修改自己的内容（这里以阿里云为例，如果有多个则创建多个script）

```sh
##############Script Settings##################

:local id "填写ID"
:local secret "填写密钥"
:local domain "填主域名如qq.com"
:local record "记录地址如ddns"
:local pppoe "拨号的网口"  # 比如我这里填写的是 PPP > Interface 下的拨号连接的名称
:local api "ali"  # 这里之前创建的worker的名称分别有dp,aliyun,cf。按照实际填写
:local svrname "Aliyun"

###############################################

:local fulldomain ($record.".".$domain)
:local ipaddr [/ip address get [find interface=$pppoe] address];
:for i from=( [:len $ipaddr] - 1) to=0 do={ 
  :if ([:pick $ipaddr $i] = "/") do={ 
    :local wanip [:pick $ipaddr 0 $i];
    :local lastip [:resolve $fulldomain];
    :log info "[DDNS] $svrname prepare update: $lastip -> $wanip"
    :if ("$lastip" != "$wanip") do={
      :log info "[DDNS] $svrname start update: $fulldomain"
      /tool fetch mode=https url="https://<这里改成你的Worker的域名或者自定义域名>/$api\3Fid=$id&key=$secret&domain=$domain&record=$record&ip=$wanip" keep-result=no
      #:log info "[DDNS] $svrname finish update: $fulldomain -> $wanip"
    }
    :log info "[DDNS] $svrname finish update: $fulldomain -> $wanip"
  }
}
```

# 自动更新DDNS

## 方式一：定期更新

第一种方式是定期更新，即通过 Scheduler 定期调用script来实现更新。会造成浪费，即使IP没有更新，到了执行时间也会无脑调用脚本，虽然脚本中有判断ddns域名的值与当前的IP地址一致时不会调用接口。

在 `System` > `Scheduler` 中添加一条定时任务

![](/assets/images/routeros-scheduler.png)

参数说明

> `name`：随便填，但建议填写方便识别的比如 ddns-aliyun
> `Interval`: 间隔时间，比如每5分钟，则填写 00:05:00
> `policy`: 按照实际勾选即可
> `On Event`: 在输入框中，填入 scripts 中需要执行的脚本名称即可

填写完后点击OK保存即可。到了间隔时间就会触发脚本。也建议先点击一次 `Run Script` 按钮，试跑一次。

在scripts的脚本中添加了log，所以可以在Winbox左侧的Log中，可以看到具体的执行日志。

## 方式二：外网IP变更后更新

外网IP变更，一般都是由于PPPoE重新拨号才会触发变更。

先检查一下PPPoE拨号所使用的配置

![](/assets/images/routeros-ppp.png)

这里我的配置是 `default`。那么在 `PPP` > `Profile` > `default` > `On Up` 中，填写对应脚本即可。

这里如果存在多个DDNS需要更新。则每行写一个scripts中的名称即可

这样，每次在PPPoE重新拨号后，都会触发一次脚本执行，动态更新DDNS。

需要注意的是，不同的域名服务商，允许设置的最小TTL值有差异，一般最小都是60，即1分钟。所以刚更新DDNS后，检查DDNS域名时查询到的IP地址，不一定是最新的，需要稍微等一下。因为最小1分钟，所以更新后也一般不会影响到正常的使用。

