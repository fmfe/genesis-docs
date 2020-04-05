module.exports = {
    base: '/genesis-docs/',
    themeConfig: {
      // nav: [
      //   { text: '首页', link: '/' },
      //   { text: '介绍', link: '/guide/' }
      // ],
      sidebar: [
        {
          title: '指南',
          path: '/guide/',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            '/guide/'
          ]
        },
        {
          title: '@fmfe/genesis-core',
          sidebarDepth: 2,
          children: ['/core/', '/core/ssr','/core/renderer','/core/plugin', '/core/format' ]
        },
        {
          title: '@fmfe/genesis-compiler',
          sidebarDepth: 2,
          children: ['/compiler/', '/compiler/build', '/compiler/watch']
        },
      ]
    }
  }
  
  