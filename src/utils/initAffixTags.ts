import type { MenuList } from '@/interface/layout/menu'

export const initAffixTags = (menus: MenuList) => {
  const affixTags: MenuList = []
  const findAffixTags = (menus: MenuList) => {
    menus.forEach(menu => {
      if (menu.affix) {
        affixTags.push(menu)
      }
      if (menu.children) {
        findAffixTags(menu.children)
      }
    })
  }
  findAffixTags(menus)
  
  return affixTags
}