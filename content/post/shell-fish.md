---
title: Using the fish shell
date: 2015-12-08 18:10:00 +0800
tags:
    - ⚙
    - 💻
    - note
summary: fish 终端安装试用

---

    fish is a smart and user-friendly command line
    shell for OS X, Linux, and the rest of the family.

fish是一个界面友好的智能shell，官网如是说。

今听人说起，于是尝试一下。

## 安装
安装环境是在树莓派2上，系统是raspbian jessie。

首先直接通过apt安装fish：`sudo apt-get install fish`

然后把fish配置为登录shell：

1. `sudo vim /etc/shells`确认fish在shells列表里面，如果不在，则把`type fish`的路径添加进去
2. `chsh -s /usr/bin/fish`把fish设置为登录shell，前面的路径就是`type fish`得到的
3. `sudo reboot now`重启一下就好了
4. `fish help`可以打开fish的帮助文件

## 试用
首先发现的fish特性就是命令着色

补全不再是大小写敏感的了
