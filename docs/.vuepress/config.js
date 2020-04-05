module.exports = {
    base: '/genesis-docs/',
    themeConfig: {
      title: 'Genesis',
      repo: 'fmfe/genesis',
      repoLabel: 'Github',
      nav: [
        { text: '首页', link: '/' },
        { text: '指南', link: '/guide/' },
        { text: '核心库', link: '/core/' },
        { text: '开发编译', link: '/compiler/' }
      ],
      sidebar: [
        '/',
        {
          title: '指南',
          path: '/guide/',
          collapsable: false,
          children: [
            '/guide/'
          ]
        },
        // {
        //   title: '@fmfe/genesis-core',
        //   collapsable: false,
        //   children: ['/core/', '/core/ssr','/core/renderer','/core/plugin', '/core/format' ]
        // },
        // {
        //   title: '@fmfe/genesis-compiler',
        //   collapsable: false,
        //   children: ['/compiler/', '/compiler/build', '/compiler/watch']
        // },
      ]
    }
  }
  
  