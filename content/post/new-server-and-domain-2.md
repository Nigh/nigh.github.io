---
title: tecnico.cc-2-HTTPS
date: 2021-08-18 
summary: SSL证书与HTTPS
---

## 备案

改了几次备案资料，好歹最后备案还是成功下来了。虽然在主机商申请了免费的SSL证书，但是那玩意儿每年都得手工更新，麻烦得很。好在`Caddy`支持自动申请和续期SSL证书。

而配置也异常简单，把之前`Caddyfile`中的端口直接换成域名：

```caddy
tecnico.cc

root * /home/ubuntu/www/test
file_server
```

这样就ok了。没错，默认的配置下面，`Caddy`就会自动帮你完成https需要的证书，实在是非常方便啊。



那么正式的开发又可以继续了。

