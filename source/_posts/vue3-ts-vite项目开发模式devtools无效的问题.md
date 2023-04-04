---
title: vue3+ts+vite项目开发模式devtools无效的问题
tags:
  - Vue
categories:
  - 开发
  - 前端开发
toc: true
date: 2023-04-04 09:31:31
updated: 2023-04-04 09:31:31
cover: /assets/images/vuejs.png
thumbnail:
---

解决在Vue3 + TypeScript + Vite 项目中，在开发模式 `npm run dev` 下，vue-devtools无效的问题

<!-- more -->

往上一般的解决办法有以下几个

## 解决方法一

更新 vue-devtools 到beta版本： [Chrome商店下载](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg)

自测问题未解决，表现为Chrome下的devtools中，vue-devtools的标签都看不到

## 解决办法二

在 `main.ts` 入口文件中，添加以下代码。

自测问题未解决，表现为Chrome下的devtools中，vue-devtools的标签可以看到了，但是内容为空

```ts
const app = createApp(App)
app.use(store).mount('#app')

const win: any = window

if (process.env.NODE_ENV === 'development') {
    if ('__VUE_DEVTOOLS_GLOBAL_HOOK__' in win) {
        win.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app
    }
}
```

## 自己摸索到的解决办法三

在解决办法二中，已经可以展示vue-devtools的标签，说明方向是正确的。

进而看了一下vue-devtools的代码，发现在 `packages/app-backend-core/src/hook.ts` 文件中，有如下初始化代码。

```ts
export function installHook (target, isIframe = false) {
  // ...
  let hook
  if (isIframe) {
    // ...
  } else {
    // ...

    hook.once('init', Vue => {
      // ...
    })

    hook.once('app:init', (app, version, types) => {
      // ...
    })

    hook.once('vuex:init', store => {
      // ...
    })
  }

  Object.defineProperty(target, '__VUE_DEVTOOLS_GLOBAL_HOOK__', {
    get () {
      return hook
    },
  })

  // ...
}
```

可见，在代码中，是通过3个once事件，进行初始化的，并对外暴露 `__VUE_DEVTOOLS_GLOBAL_HOOK__` 对象。

所以在 `main.ts` 入口中，获取到对应的对象，即可解决问题

```ts
const app = createApp(App)
import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      // ...
    }
  },
  mutations: {},
  actions: {}
})

app.use(store).mount('#app')

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-underscore-dangle
  const devHook = window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

  if (devHook) {
    devHook.enabled = true;
    devHook.emit('app:init', app, app.version, {});
    devHook.emit('vuex:init', store);
  }
}
```
