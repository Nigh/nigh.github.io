---
title: first inkpaper post
date: 2015-11-06 00:32:17 +0800
tags:
    - 💻
    - trial
---

试用inkpaper，生成明显比hexo快多了。文章多了之后应该会更加明显。

<!--more-->

### 格式

在`source`目录中建立任意`.md`文件（可置于子文件夹），使用如下格式

    ``` yaml
    update: 年-月-日 时:分:秒 #更新时间，可选，可加时区如" +0800"
    author: 作者ID
    cover: 题图链接 #可选
    draft: true #草稿，可选
    top: true #置顶文章，可选
    preview: 文章预览，也可在正文中使用<!--more-->分割 #可选
    tags: #可选
        - 标签1
        - 标签2
    ---
    Markdown格式的正文
    ```
