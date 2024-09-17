import { create } from 'zustand'

type Locale = 'zh_CN' | 'en_US';

type Store = {
  locale: Locale;
  collapsed: boolean;
  setLocale: (locale: Locale) => void;
  setCollapsed: (collapsed: boolean) => void;
}

const useAppStore = create<Store>()((set) => ({
  locale: 'zh_CN',
  collapsed: false,
  setLocale: (locale: Locale) => set(() => ({ locale })),
  setCollapsed: (collapsed: boolean) => set(() => ({ collapsed })),
}))

export default useAppStore