module.exports = {
    themeConfig: {
      // nav: [
      //   { text: '首页', link: '/' },
      //   { text: '介绍', link: '/guide/' }
      // ],
      sidebar: [
        {
          title: '快速开始',
          path: '/guide/',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            '/guide/',
            '/guide/install'
          ]
        },
        {
          title: '@fmfe/genesis-core',
          sidebarDepth: 2,
          children: ['/core/', '/core/ssr','/core/renderer','/core/plugin', '/core/format' ]
        },
      ]
    }
  }
  
  