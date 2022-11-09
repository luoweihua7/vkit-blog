---
title: Nuxt3下使用AntDesignVue
tags:
  - Vue
  - Nuxt
categories:
  - 开发
  - 前端开发
toc: true
date: 2022-09-16 16:56:45
updated: 2022-09-16 16:56:45
cover:
thumbnail:
---

在 Nuxt3 框架下使用 Ant Design Vue 组件库的开发设置。

<!-- more -->

# 创建项目

```sh
npx nuxi init nuxt-app
```

# 添加 Ant Design Vue 组件库相关模块

```sh
npm i ant-design-vue @ant-design/icons-vue unplugin-vue-components --save
```

# Nuxt 配置

修改 `nuxt.config.ts` 配置文件为如下内容

```js
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  build: {
    transpile: [
      "lodash-es",
    ]
  },
  vite: {
    ssr: {
      noExternal: ['ant-design-vue', 'dayjs'],
    },
    plugins: [
      Components({
        resolvers: [AntDesignVueResolver()]
      })
    ],
  }
})
```

以上配置为最小化配置。之后就可以在项目中直接使用诸如 `<a-input />` 模块进行开发了。


其中使用的模块版本如下(之前的版本未尝试)

> "nuxt": "3.0.0-rc.10"
> 
> "ant-design-vue": "^3.2.12",



# 遇到的问题

参考 [NUXT 3 Module Error on adding ant-design-vue](https://stackoverflow.com/questions/72555420/nuxt-3-module-error-on-adding-ant-design-vue) 和 [Nuxt 3 installation steps](https://github.com/vueComponent/ant-design-vue/discussions/5210) 配置后，使用Antd组件库时，会报 `ERR_MODULE_NOT_FOUND` 错误，最后通过在 `nuxt.config.ts` 的配置中，添加 `build` 配置字段解决，参考上面的完整配置。
