---
title: tecnico.cc-1-PWA应用初探
date: 2021-07-29 
summary: 第一个PWA应用
---

> 本文参考 https://medium.com/@toricpope/transform-a-react-app-into-a-progressive-web-app-pwa-dea336bd96e6 进行操作

## 计划

最近的计划是关于`Domiso v1.0`发布的，后面还是计划将谱面编辑和试听的功能都放在网页端，桌面端的App和安卓端的`AutoXJS`就只负责与游戏交互进行演奏的功能，这样谱面的编辑和试听就能够同时兼顾桌面和移动端。试听功能拟采用`https://github.com/jazz-soft/JZZ`这个框架，研究了一下demo，功能基本都覆盖甚至超过了我的需求，是个挺好的轮子。

## 变化

因为突然的灵感写了一个战力计算器。因为逻辑比较简单，所以就想先作为练手项目，熟悉一下PWA应用的搭建吧。这样也不至于后面写`Domiso`的时候碰到问题太多。

## Go！

`npx create-react-app my-app --template cra-template-pwa`直接用模板创建了一个项目。跑起来之后，在`Chrome`的调试界面进入`Lighthouse`选项卡，勾选`Progressive Web App`进行审查，当然也可以全部勾选看看其他部分有些什么问题。

然后在结果页面就能看到有哪些部分不满足PWA应用需求的。

### Service worker

`Service worker`是一个客户端(*client-side*)的资源代理，将资源缓存在本地，使得页面可以立即展示，而不需要依赖网络。

在`index.js`中将`serviceWorkerRegistration.unregister()`的`unregister`改为`register`

然而，在`serviceWorkerRegistration.js`中`register`方法只能在`production`环境生效，

```jsx
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator)
```

修改这里也不能正常运行。所以还是`npm run build`编译出发行包，然后`serve -s build`直接在build目录启动服务器测试。

然后再跑一遍`lighthouse`测试，已经能够作为PWA应用安装了！就只有（`Downloaded icon was empty or corrupted`）图标问题需要解决了。在`manifest.json`里面添加对应的图标资源就OK啦。

