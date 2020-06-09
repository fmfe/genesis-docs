module.exports = {
    base: '/genesis-docs/',
    title: 'Vue Genesis',
    description: '基于 Vue SSR 的微前端、微服务、轻量级的解决方案',
    themeConfig: {
      repo: 'fmfe/genesis',
      repoLabel: 'Github',
      nav: [
        { text: '首页', link: '/' },
        { text: '指南', link: '/guide/' },
        {
          text: '核心库',
          items: [
            { text: 'genesis-core', link: '/core/' },
            { text: 'genesis-compiler', link: '/compiler/' },
            { text: 'genesis-app', link: '/app/' },
            { text: 'genesis-remote', link: '/remote/' },
          ]
        },
        { text: '官方博客', link: '/blog/followme5.0' },
      ],
      sidebar: [
        '/',
        {
          title: '指南',
          path: '/guide/',
          collapsable: false,
          children: [
            '/guide/introduce',
            '/guide/',
          ]
        },
        {
          title: '进阶',
          path: '/guide/',
          collapsable: false,
          children: [
            '/guide/renderer',
            '/guide/micro',
            '/guide/meta',
            '/guide/webpack',
            '/guide/babel',
            '/guide/postcss',
          ]
        },
        {
          title: '官方博客',
          path: '/blog/',
          collapsable: false,
          children: [
            '/blog/followme5.0',
            '/blog/2020-05-25'
          ]
        }
      ]
    }
  }
  
  