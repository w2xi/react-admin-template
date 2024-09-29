import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Locale = 'zh_CN' | 'en_US';
type Theme = 'dark' | 'light';

type Store = {
  theme: Theme;
  locale: Locale;
  collapsed: boolean;
  setLocale: (locale: Locale) => void;
  setCollapsed: (collapsed: boolean) => void;
  setTheme: (theme: Theme) => void;
}

const useAppStore = create<Store>()(
  persist(
    (set) => ({
      theme: 'dark',
      locale: 'zh_CN',
      collapsed: false,
      setLocale: (locale: Locale) => set(() => ({ locale })),
      setCollapsed: (collapsed: boolean) => set(() => ({ collapsed })),
      setTheme: (theme: Theme) => set(() => ({ theme })),
    }),
    {
      name: 'app-info',
    }
  )
)

export default useAppStore