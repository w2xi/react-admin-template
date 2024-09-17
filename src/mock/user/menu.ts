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
    code: 'icon',
    icon: 'icon',
    label: {
      zh_CN: '图标',
      en_US: 'Icon',
    },
    path: '/icon',
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
  }
]

Mock.mock('/api/layout/menu', 'get', () => {
  return response(menuList)
})