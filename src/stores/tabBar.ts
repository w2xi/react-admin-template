import { create } from 'zustand'
import type { MenuItem, MenuList } from '@/interface/layout/menu'

type Store = {
  visitedRoutes: MenuList
  addVisitedRoute: (route: MenuItem | MenuList) => void
  setVisitedRoute: (routes: MenuList) => void
  clear: () => void
}

const useAppStore = create<Store>()(set => ({
  visitedRoutes: [],
  addVisitedRoute: (route: MenuItem | MenuList) =>
    set(state => {
      const routes = Array.isArray(route) ? route : [route]
      const newRoutes = routes.filter(item => !state.visitedRoutes.find(route => route.path === item.path))
      return { visitedRoutes: state.visitedRoutes.concat(newRoutes) }
    }),
  setVisitedRoute: (routes: MenuList) => set(() => ({ visitedRoutes: routes })),
  clear: () => set(() => ({ visitedRoutes: [] })),
}))

export default useAppStore
