---
title: tecnico.cc-4-新的开发框架
date: 2021-11-08 
summary: 引入yarn,vite,prettier,windicss

---

## icon

1. 绘制`192x192`图标
2. 通过 https://www.favicon-generator.org/ 生成`favicon`资源包。
3. 如果需要包含更多分辨率的`favicon.ico`，可以使用 https://redketchup.io/icon-converter 生成

## yarn
全局安装`yarn`包管理器

```
npm install -g yarn
```

## vite

前端开发与构建工具

#### 新建项目引入

```
yarn create vite
```

或者参考官方文档。

#### 在当前项目引入
- `yarn add vite vite-plugin-checker @vitejs/plugin-react --dev`
- 将`index.html`移动到根目录，因为`vite`路径处理方式的不同，`%PUBLIC_URL%`也不需使用了
- `package.json`中，修改`scripts`：`"dev": "vite"`、`"build": "vite build"`、`"serve": "vite preview"`

## prettier
使用`prettier`来进行代码格式化。 

```
yarn add prettier --dev
```

在根目录建立`.prettierrc.json`进行配置。或者参照官方文档。

`package.json`中，修改`scripts`：添加`"format": "prettier --write src"`、`"predev": "yarn format"`

这样，在运行`yarn dev`时，会自动先运行一次格式化。

## windicss

原本想使用[tailwindcss](https://tailwindcss.com/)这个前端框架，因为体积原因，又不想引入整个臃肿的`tailwind.css`，于是我找到了[windicss](https://windicss.org/)这个项目，完全兼容[tailwindcss](https://tailwindcss.com/)特性，并且可以按需生成使用到的css

```
yarn add vite-plugin-windicss windicss --dev
```

然后，在`vite.config.js`中，添加插件：
```js
import WindiCSS from 'vite-plugin-windicss'

export default {
  plugins: [
    WindiCSS(),
  ],
}
```

最后，在入口`jsx`文件中，引入`import 'virtual:windi.css'`即可。

## Material-UI

一个 React UI 框架

```
yarn add @material-ui/core@next @emotion/react @emotion/styled
```

