module.exports = {
    base: '/genesis-docs/',
    themeConfig: {
      title: 'Genesis',
      repo: 'fmfe/genesis',
      repoLabel: 'Github',
      nav: [
        { text: '首页', link: '/' },
        { text: '指南', link: '/guide/' },
        {
          text: 'API',
          items: [
            { text: 'genesis-core', link: '/core/' },
            { text: 'genesis-compiler', link: '/compiler/' }
          ]
        }
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
        }
      ]
    }
  }
  
  