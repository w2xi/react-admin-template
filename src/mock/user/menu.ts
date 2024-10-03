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
  {
    code: 'components',
    icon: 'components',
    label: {
      zh_CN: '组件',
      en_US: 'Components',
    },
    path: '/components',
    children: [
      {
        code: 'json-editor',
        icon: 'json-editor',
        label: {
          zh_CN: 'JSON 编辑器',
          en_US: 'JSON Editor',
        },
        path: '/components/json-editor',
      },
    ]
  },
  {
    code: 'error-page',
    icon: 'error-page',
    label: {
      zh_CN: '错误页面',
      en_US: 'Error Page',
    },
    path: '/error',
    children: [
      {
        code: '403',
        icon: '403',
        label: {
          zh_CN: '403',
          en_US: '403',
        },
        path: '/error/403',
      },
      {
        code: '404',
        icon: '404',
        label: {
          zh_CN: '404',
          en_US: '404',
        },
        path: '/error/404',
      }
    ]
  }
]

Mock.mock('/api/layout/menu', 'get', () => {
  return response(menuList)
})