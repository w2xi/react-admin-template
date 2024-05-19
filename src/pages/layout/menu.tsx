
import { Menu } from 'antd';
import type { FC } from 'react';
import type { MenuList } from '../../interface/layout/menu.interface.ts';
import { useNavigate } from 'react-router-dom';

interface MenuProps {
  menuList: MenuList;
}

const MenuComponent: FC<MenuProps> = (props) => {
  const { menuList } = props;
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
          label: item.label,
          children: item.children?.map((child) => ({
            key: child.path,
            label: child.label,
          }))
        } : {
          key: item.path,
          label: item.label,
        }
      })}
    >
    </Menu>
  )
}

export default MenuComponent;