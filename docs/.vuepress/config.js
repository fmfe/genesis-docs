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
      {
        text: "多语言",
        items: [
          { text: "English", link: "https://anish2690.github.io/genesis-docs-en/", target: '_self', rel: '' },
          { text: "简体中文", link: "https://fmfe.github.io/genesis-docs/guide/", target: '_self', rel: '' },
        ],
      },

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
          '/blog/2020-05-25',
          '/blog/2020-06-18',
          '/blog/2020-06-27',
          '/blog/2021-01-21.md'
        ]
      }
    ]
  }
}

