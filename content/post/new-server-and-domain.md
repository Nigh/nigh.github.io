---
title: 新的域名和服务器配置-1
date: 2021-07-29 
summary: 买了新的域名和服务器
---

## 购置

之前`腾讯云`搞活动有个比较便宜的主机就买下来了。

配置为`单核2GB|50Gb储存|500Gb流量|5Mbps带宽`，每个月15块钱。

然后在阿里的万网注册了一个`tecnico.cc`的域名，10年380块，算下来每个月大约3块2。



所以这套配置如果不涨价的话，每个月18块钱，还算挺便宜吧。



## 配置

在阿里的控制台对域名进行了实名注册和备案。

然后配置一下域名解析到服务器的ip



再重置服务器密码，这样才能用ssh登录



## 测试

拉取`Ello`的页面作为测试：`git clone https://gitee.com/xianii/ello-world`

拉取子模块`git submodule update --init --recursive`

由于主题的子模块托管在`github`，从腾讯云上拉取失败了。

没办法，只能进入`theme`目录，手动从`github`的第三方加速镜像拉取`git clone https://hub.fastgit.org/Nigh/tinyworks`

### 0|hugo server

想直接使用`hugo server`来测试，然而配置了一番，端口啥的都弄了，服务器上跑的`hugo server`没法从域名访问到。

### 1|caddyserver

还是用`caddy`跑个页面测试吧。

跟随 https://caddyserver.com/docs/install#debian-ubuntu-raspbian 文档操作安装`caddy`

然后新建了一个测试目录，进入目录，新建一个文件`Caddyfile`，内容如下：

```caddy
:80
respond "Hello, world!"
```

然后在目录下运行`caddy adapt`，成功运行起来。

再通过`tecnico.cc`访问，显示出了`Hello, world!`的字样。测试成功。

> 由于监听80, 443等端口需要更高的权限，所以需要使用`sudo`权限启动`caddy`
>
> 先`caddy stop`，再`sudo caddy start`即可。

### 2|未备案

虽然过了几分钟腾讯就用未备案的警告页面给我重定向了。

所以又去弄域名备案了。

### 3|pages

未备案不能用域名访问，但是直接用ip地址访问来测试还是没问题的。

新建一个目录`~/www/test`，然后把测试的网页复制进去。

修改`Caddyfile`的内容为：

```caddy
:80

root * /home/ubuntu/www/test
file_server
```

然后`caddy reload`更新配置。刷新网页即可看到页面正常显示出来了。

> Caddyfile的root命令不支持~目录，需要写入完整的路径
>
> 或者可以使用环境变量写作`root * {$HOME}/www/test`
>
> 更多caddyfile用法参见官方文档

