---
title: tecnico.cc-3-non-root部署
date: 2021-08-19 
summary: 非根目录部署

---

按照计划是将应用部署在`app.tecnico.cc/xxxxx`这样的子域名下。

Caddy的配置如下：

```caddy
app.tecnico.cc {
        root * {$HOME}/www/app.tecnico.cc
        file_server
        encode gzip
}
```

然后把页面按照目录放到`HOME/www/app.tecnico.cc/`里面就能直接访问到了。

## 问题

碰到的第一个问题是忘记加`app.tecnico.cc`子域名的解析了。加上就ok了。实际上可以直接加上泛域名解析，把所以子域名都解析到同一个ip下面，这样做是可以满足现在的需求的。



第二个问题是所有资源的获取路径都错误的是从根目录下获取的，而不是页面所在的目录，所以获取不到。

举例来说，本来资源路径是`https://app.tecnico.cc/abcd/static/xxx.js`，但是实际上变成了`https://app.tecnico.cc/static/xxx.js`.

查阅了一下文档，发现在这个模板项目的`index.js`的代码注释中就有线索，只要在`package.json`中加上`"homepage": ".",`这条配置，就能够把里面的环境变量`PUBLIC_URL`更改为当前目录了。默认不加的话，是在根目录。当然，如果需要的话，也可以改成其他路径。



然后第一个应用，虽然功能还没开始写，但是页面已经确确实实的跑起来了。也可以作为PWA应用安装到本地了。

