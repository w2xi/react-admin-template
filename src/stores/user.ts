import { create } from 'zustand'
import type { MenuList } from '@/interface/layout/menu'
import type { LoginResult } from '@/interface/user/login'
import { persist } from 'zustand/middleware'

type Store = {
  userInfo?: LoginResult
  menuList: MenuList
  setMenuList: (menuList: MenuList) => void
  setUserInfo: (userInfo: LoginResult) => void
  clear: () => void
}

const useUserStore = create<Store>()(
  persist(
    set => ({
      userInfo: undefined,
      menuList: [],
      setMenuList: (menuList: MenuList) => set(() => ({ menuList })),
      setUserInfo: (userInfo: LoginResult) => set(() => ({ userInfo })),
      clear: () => {
        set(() => {
          return {
            userInfo: undefined,
            menuList: [],
          }
        })
      },
    }),
    {
      name: 'user-info',
    },
  ),
)

export default useUserStore
