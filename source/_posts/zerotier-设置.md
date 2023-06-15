---
title: ZeroTier 设置
tags:
  - ZeroTier
  - OpenWrt
categories:
  - 网络
toc: true
date: 2023-06-15 22:58:18
updated: 2023-06-15 22:58:18
cover: /assets/images/zerotier/zerotier.png
thumbnail:
---

ZeroTier 网站及客户端详细设置图文教程

<!-- more -->

# ZeroTier 网站设置

## 注册并登陆

https://my.zerotier.com/network

## 添加网络

![ZeroTier Website Network](/assets/images/zerotier/website-network.png)

## 编辑网络

### 基础信息

名称和描述可随便填写
访问控制选择 **私有**（知道网络ID后初次连接，需要管理员勾选允许）或者 **公开**（知道网络ID即可连接到网络）

![ZeroTier Website Network Basics](/assets/images/zerotier/website-network-basics.png)

### IPv4指派

选择简单模式，并在简单模式的选项列表随便选择一个与自己网络不同的网段
选择高级模式，填写私有网络子网段的起始和结束IP（不会填写可以先选择简单，看生成的格式）

![ZeroTier Website Network IPv4 Assign](/assets/images/zerotier/website-network-ipv4assign.png)

### 高级设置

高级设置在 **IPv4指派 (IPv4 Assign)** 的上方。

如果设置好IPv4指派，则会自动生成一条带有 **(LAN)** 字样的路由。

手动添加路由转发，配置路由转发，可在网络中接入一台机器节点后，访问到指定的网络地址（需要节点客户端设置）

说明
> **目标地址(Destination)**: 目标网络，可以是IP也可以是网段，指家庭或者工作的网络
> **转发(Via)**: 经由某IP转发，即访问目标网络是通过Via填写的IP机器进行转发的

![ZeroTier Website Network Advanced](/assets/images/zerotier/website-network-advanced.png)

高级设置放到下面的原因，是因为 IPv4指派 修改后，需要在高级中设置对应的路由，至少虚拟网的网段需要与 IPv4指派 中的网段一致（选择简单模式会自动设置，若无则需手动添加）

## 成员管理

![ZeroTier Website Network Members](/assets/images/zerotier/website-network-members.png)

# ZeroTier 客户端设置

客户端下载: https://www.zerotier.com/download/

[iPhone 下载](https://apps.apple.com/us/app/zerotier-one/id1084101492)
[Android 下载](https://play.google.com/store/apps/details?id=com.zerotier.one&pli=1)

客户端无需任何特殊设置，只需要填写 ZeroTier 网络设置中的 **网络ID(Network ID)** 即可。
注意，如果基础设置了为私有网络，需要在客户端连接后，重新进入到 ZeroTier 相对网络的成员管理中，勾选授权

# OpenWrt 设置

![OpenWrt ZeroTier Setting](/assets/images/zerotier/openwrt-setting.png)


参照上方设置后，点击保存并应用。
相同的，如果在 ZeroTier 的网络基础设置中选择了私有网络，则需要在成员管理中勾选授权。

