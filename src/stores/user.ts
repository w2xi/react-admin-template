import { create } from 'zustand'
import type { MenuList } from '../interface/layout/menu'

type Store = {
  menuList: MenuList;
  setMenuList: (menuList: MenuList) => void;
}

const useUserStore = create<Store>()((set) => ({
  menuList: [],
  setMenuList: (menuList: MenuList) => set(() => ({ menuList })),
}))

export default useUserStore