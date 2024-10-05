import { request } from './request'
import type { MenuList } from '../interface/layout/menu'

export const getMenuList = () => {
  return request<MenuList>({
    method: 'get',
    url: '/api/layout/menu',
  })
}
