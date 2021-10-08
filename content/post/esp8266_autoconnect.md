---
title: ESP8266使用AutoConnect配网
date: 2021-10-08 
summary: ESP8266配网

---



## 缘起

看到[视频](https://www.bilibili.com/video/BV1Mf4y177W6)，就想给初代 FansBoard 加上当初想做而没做的配网功能。

因为当初开发 FansBoard 第一代的时候选用了 NodeMCU 的框架，资源比较少，很多功能需要自己造轮子，比如配网。

因为工作量太大，所以最后 FansBoard 第一代的配网仍然是硬编码形式的。跟它的开发套件的定位倒也是匹配的。

## 开干

Arduino 环境是现成的，装个 ESP8266 的 package 就行了，然后 clone 下来 https://github.com/bilibilifmk/wifi_link_tool 这个仓库，安装进Arduino IDE。

这时候理论上就可以跑个 demo 试试了。

## 转折

然而转折来得很快。当然，这时候我已经接受了从 NodeMCU 迁移到 Arduino 框架几乎等于要重新写一遍代码的事实。然而更坏的消息是这个 demo 它跑不起来。

然后就打算简单的打印点 log 查一下，过程中找到了几个 bug，然后基本上也浏览了一遍代码。提了个 issue 来告诉作者问题。



但是浏览过代码之后，觉得这个项目代码结构和组织形式有点乱，个人估计可持续迭代的可能性不高。而且它独特的功能就是集群配网，这个我暂时用不到。剩下的配网和OTA功能是很常规的，应该会有不少其他第三方库支持。



出于以上考虑，去官网翻了翻，找到了一个 [AutoConnect](https://github.com/Hieromon/AutoConnect) 库，依赖只有`pagebuilder`和`arduinoJSON`这两个库，还算比较轻量吧。

于是又开始研究这个库了。

## 小结

这个库的文档比较完备，代码结构清晰，质量不错，个人觉得还是比较稳的。经过十来分钟的尝试，也成功把 demo 跑起来了，开发板也连上了家里的wifi。

那么，接下来就是把 FansBoard 第一代的代码全部移植到 Arduino 框架上来了。大概还得加上 web 的配置界面。又是好多工作量啊。
