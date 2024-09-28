import Mock from 'mockjs'
import response from '../response'
import type { MenuList } from '../../interface/layout/menu'

const menuList: MenuList = [
  {
    code: 'dashboard',
    icon: 'dashboard',
    label: {
      zh_CN: '首页',
      en_US: 'Dashboard',
    },
    path: '/dashboard',
  },
  {
    code: 'charts',
    icon: 'charts',
    label: {
      zh_CN: '图表',
      en_US: 'Charts',
    },
    path: '/charts',
    children: [
      {
        code: 'bar',
        icon: 'bar-chart',
        label: {
          zh_CN: '柱状图',
          en_US: 'Bar Chart',
        },
        path: '/charts/bar',
      },
      {
        code: 'line',
        icon: 'line-chart',
        label: {
          zh_CN: '折线图',
          en_US: 'Line Chart',
        },
        path: '/charts/line',
      },
    ]
  },
  {
    code: 'Business',
    icon: 'business',
    label: {
      zh_CN: '业务',
      en_US: 'Business',
    },
    path: '/business',
    children: [
      {
        code: 'article',
        icon: 'article',
        label: {
          zh_CN: '表格',
          en_US: 'Table',
        },
        path: '/business/article',
      },
    ]
  },
]

Mock.mock('/api/layout/menu', 'get', () => {
  return response(menuList)
})