---
title: "「WSL」Windows 下的 Linux 开发环境"
date: "2018-11-13"
description: "Windows 的开挂操作 —— WSL 折腾记"
"info":
    name: "赤琦"
    url: ""
---

# 🈲 Windows 下的 Linux 开发神器

**适用于 Linux 的 Windows 子系统「英语：Windows Subsystem for Linux，简称 WSL」** 是一个为在 Windows 10 上能够原生运行 Linux 二进制可执行文件（ELF 格式）的兼容层。它是由微软与 Canonical 公司合作开发，目标是使纯正的 Ubuntu 14.04/18.04, OpenSUSE, Kali Linux 和 Debian 映像能下载和解压到用户的本地计算机，并且映像内的工具和实用工具能在此子系统上原生运行。

WSL 提供了一个微软开发的 Linux 兼容内核接口（不包含 Linux 代码），来自 Ubuntu 的用户模式二进制文件在其上运行。

该子系统不能运行所有 Linux 软件，例如那些图形用户界面，以及那些需要未实现的 Linux 内核服务的软件。 不过，这可以用在外部 X 服务器上运行的图形 X 窗口系统缓解。

*Tip：适用于 Windows 1607 (build 14316)及其以上版本，需要开启开发者模式，并且最好是专业版以上版本，具体支持情况请 Google*

## 💁🏻‍ 为什么要使用 WSL

    （待补充……🕧 该睡觉了

## 🕵🏻 简单两步使用 WSL

### └ 一、启用 适用于 Linux 的 Windows 子系统

1. 控制面板 

2. 程序和卸载 

3. 启用或关闭 windows 功能

    ![](/img/wsl0.jpg)

4. 重启系统

### └ 二、安装你喜欢的发行版

1. 打开 Microsoft Store

2. 搜索 wsl

3. 安装你喜欢的任意发行版

    *Windows目前只提供 Debian 系的发行版，当然 SUSE 也很香*

     ![](/img/wsl1.jpg)

4. 打开你的 Linux 会出现 installing ……

    *安装失败可以重新打开，或者卸载重新安装，再或者重新开启一下 [启用 适用于 Linux 的 Windows 子系统](#启用-适用于-linux-的-windows-子系统)*

5. 输入用户名、密码即可开启你的 Linux 之旅

## 💪🏻 WSL 折腾记（未完……待补充

