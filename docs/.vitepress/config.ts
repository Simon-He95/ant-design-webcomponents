module.exports = {
  lang: 'zh-CN',
  title: 'ant-design-webcomponents',
  base: '/',
  description: 'webcomponents of ant-design',
  lastUpdated: true,
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  logoSmall:
    'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  head: [
    // 添加图标
    [
      'link',
      {
        rel: 'icon',
        href: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
      },
    ],
  ],
  themeConfig: {
    lastUpdatedText: 'Updated Date',
    nav: nav(),
    sidebar: {
      '/component/': sidebarGuide(),
    },
    socialLinks: [{ icon: 'github', link: 'ant-design-webcomponents' }],
    editLink: {
      pattern: 'ant-design-webcomponents',
      text: '在GitHub编辑此页',
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present SimonHe',
    },
    algolia: {
      appId: 'STWB4WOZ42',
      apiKey: '1701b060177b65718c4edbc4b1a595e3',
      indexName: 'lazy-js-utils',
    },
  },
}

function nav() {
  return [
    { text: '组件', link: '/component/button' },
    {
      text: '加入我们',
      link: 'https://github.com/Simon-He95/ant-design-webcomponents',
    },
  ]
}

function sidebarGuide() {
  return [
    {
      text: 'General',
      collapsible: false,
      items: [
        { text: 'Button', link: '/component/button' },
        { text: 'Icon', link: '/component/icon' },
        { text: 'Typography', link: '/component/typography' },
      ],
    },
    {
      text: 'Layout',
      collapsible: false,
      items: [
        { text: 'Divider', link: '/component/divider' },
        { text: 'Grid', link: '/component/grid' },
        { text: 'Layout', link: '/component/layout' },
        { text: 'Space', link: '/component/space' },
      ],
    },
    {
      text: 'Navigation',
      collapsible: false,
      items: [
        { text: 'Anchor', link: '/component/anchor' },
        { text: 'Breadcrumb', link: '/component/breadcrumb' },
        { text: 'Dropdown', link: '/component/dropdown' },
        { text: 'Menu', link: '/component/menu' },
        { text: 'Pagination', link: '/component/pagination' },
        { text: 'Steps', link: '/component/steps' },
      ],
    },
    {
      text: 'Data Entry',
      collapsible: false,
      items: [
        { text: 'AutoComplete', link: '/component/autoComplete' },
        { text: 'Cascader', link: '/component/cascader' },
        { text: 'Checkbox', link: '/component/checkbox' },
        { text: 'DatePicker', link: '/component/datePicker' },
        { text: 'Form', link: '/component/form' },
        { text: 'Input', link: '/component/input' },
        { text: 'InputNumber', link: '/component/inputNumber' },
        { text: 'Mentions', link: '/component/mentions' },
        { text: 'Radio', link: '/component/radio' },
        { text: 'Rate', link: '/component/rate' },
        { text: 'Select', link: '/component/select' },
        { text: 'Slider', link: '/component/slider' },
        { text: 'Switch', link: '/component/switch' },
        { text: 'TimePicker', link: '/component/timePicker' },
        { text: 'Transfer', link: '/component/transfer' },
        { text: 'TreeSelect', link: '/component/treeSelect' },
        { text: 'Upload', link: '/component/upload' },
      ],
    },
    {
      text: 'Data Display',
      collapsible: false,
      items: [
        { text: 'Avatar', link: '/component/avatar' },
        { text: 'Badge', link: '/component/badge' },
        { text: 'Calendar', link: '/component/calendar' },
        { text: 'Card', link: '/component/card' },
        { text: 'Carousel', link: '/component/carousel' },
        { text: 'Collapse', link: '/component/collapse' },
        { text: 'Carousel', link: '/component/carousel' },
        { text: 'Descriptions', link: '/component/descriptions' },
        { text: 'Empty', link: '/component/empty' },
        { text: 'Image', link: '/component/image' },
        { text: 'List', link: '/component/List' },
        { text: 'Popover', link: '/component/popover' },
        { text: 'QRCode', link: '/component/qRCode' },
        { text: 'Segmented', link: '/component/segmented' },
        { text: 'Statistic', link: '/component/statistic' },
        { text: 'Table', link: '/component/table' },
        { text: 'Tabs', link: '/component/tabs' },
        { text: 'Tag', link: '/component/tag' },
        { text: 'Timeline', link: '/component/timeline' },
        { text: 'Tooltip', link: '/component/tooltip' },
        { text: 'Tour', link: '/component/tour' },
        { text: 'Tree', link: '/component/tree' },
      ],
    },
    {
      text: 'Feedback',
      collapsible: false,
      items: [
        { text: 'Alert', link: '/component/alert' },
        { text: 'Drawer', link: '/component/drawer' },
        { text: 'Message', link: '/component/message' },
        { text: 'Modal', link: '/component/modal' },
        { text: 'Notification', link: '/component/notification' },
        { text: 'Popconfirm', link: '/component/popconfirm' },
        { text: 'Progress', link: '/component/progress' },
        { text: 'Result', link: '/component/result' },
        { text: 'Skeleton', link: '/component/skeleton' },
        { text: 'Spin', link: '/component/spin' },
      ],
    },
    {
      text: 'Other',
      collapsible: false,
      items: [
        { text: 'Affix', link: '/component/affix' },
        { text: 'App', link: '/component/app' },
        { text: 'ConfigProvider', link: '/component/configProvider' },
        { text: 'FloatButton', link: '/component/floatButton' },
        { text: 'Watermark', link: '/component/watermark' },
      ],
    },
  ]
}
