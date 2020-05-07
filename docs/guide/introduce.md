# 介绍

## 项目起源
2019年年底的时候，得知公司要推出一个 [Followme5.0](https://www.followme.com?source=genesis) 的版本，到时候将会大幅度的重构整个web端的产品，所以本项目也开始应运而生。当时网站首页采用的是 [Nuxt](https://github.com/nuxt/nuxt.js) 作为SSR的框架，但是它无法满足我们的一些需求，也曾尝试过编写 [Nuxt](https://github.com/nuxt/nuxt.js) 插件来实现我们的需求，但是最终无法实现，只能另起炉灶了。    

## 为什么没有继续使用Nuxt?
[Followme](https://www.followme.com?source=genesis)是一个极其复杂的网站，我们的技术栈包含了 SSR 和 CSR，在更新公共组件的时候，经常需要同时更新十几个项目，而前端的项目编译又特别慢，就导致哪怕是一个文案的改动，也需要发布大半天。而 [Nuxt](https://github.com/nuxt/nuxt.js) 的架构形态都是单应用，无法在一个页面上同时支持多个应用实例，以及做到 SSR 微服务化。在微服务理念的构思下，我们开始思考如何重新设计我们需要的 Genesis