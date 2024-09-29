
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import useAppStore from '@/stores/app.ts';
import CustomIcon from './custom-icon.tsx';
import type { FC } from 'react';
import type { MenuList } from '../../interface/layout/menu.ts';

interface MenuProps {
  menuList: MenuList;
}

const MenuComponent: FC<MenuProps> = (props) => {
  const { menuList } = props;
  const { locale } = useAppStore();
  const navigate = useNavigate();

  const onMenuClick = (path: string) => {
    navigate(path);
  }

  return (
    <Menu
      mode="inline" 
      selectedKeys={[location.pathname]}
      onSelect={k => onMenuClick(k.key)}
      items={menuList.map((item) => {
        return item.children ? {
          key: item.code,
          label: item.label[locale],
          icon: <CustomIcon type={item.icon} />,
          children: item.children?.map((child) => ({
            key: child.path,
            label: child.label[locale],
            icon: <CustomIcon type={child.icon} />,
          }))
        } : {
          key: item.path,
          label: item.label[locale],
          icon: <CustomIcon type={item.icon} />,
        }
      })}
    >
    </Menu>
  )
}

export default MenuComponent;