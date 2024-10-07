import { useEffect, useState } from 'react'
import { Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import useAppStore from '@/stores/app.ts'
import CustomIcon from './custom-icon.tsx'
import { findClosestParentMenuByPath } from '@/utils'
import type { FC } from 'react'
import type { MenuList } from '../../interface/layout/menu.ts'

interface MenuProps {
  menuList: MenuList
}

const MenuComponent: FC<MenuProps> = ({ menuList } ) => {
  const [openKey, setOpenKey] = useState<string>('')
  const { locale } = useAppStore()
  const navigate = useNavigate()
  const location = useLocation()

  const onMenuClick = (path: string) => {
    navigate(path)
  }

  const onOpenChange = (openKeys: string[]) => {
    setOpenKey(openKeys.pop() || '')
  }

  useEffect(() => {
    const menu = findClosestParentMenuByPath(menuList, location.pathname)
    if (menu) {
      setOpenKey(menu.code)
    }
  }, [location.pathname])

  return (
    <Menu
      mode="inline"
      openKeys={openKey ? [openKey] : []}
      selectedKeys={[location.pathname]}
      onOpenChange={onOpenChange}
      onSelect={k => onMenuClick(k.key)}
      items={menuList.map(item => {
        return item.children
          ? {
              key: item.code,
              label: item.label[locale],
              icon: <CustomIcon type={item.icon} />,
              children: item.children?.map(child => ({
                key: child.path,
                label: child.label[locale],
                icon: <CustomIcon type={child.icon} />,
              })),
            }
          : {
              key: item.path,
              label: item.label[locale],
              icon: <CustomIcon type={item.icon} />,
            }
      })}
    ></Menu>
  )
}

export default MenuComponent
