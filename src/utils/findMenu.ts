import type { MenuItem, MenuList } from '@/interface/layout/menu'

export const findMenuByPath = (menus: MenuList, path: string): MenuItem | undefined => {
  for (const menu of menus) {
    if (menu.path === path) {
      return menu
    }
    if (menu.children) {
      const target = findMenuByPath(menu.children, path)
      if (target) {
        return target
      }
    }
  }
}

export const findClosestParentMenuByPath = (menus: MenuList, path: string, parent?: MenuItem): MenuItem | '' => {
  for (const menu of menus) {
    if (parent && menu.path === path) {
      return menu
    }
    if (menu.children) {
      const target = findClosestParentMenuByPath(menu.children, path, menu)
      if (target) {
        return menu
      }
    }
  }

  return ''
}