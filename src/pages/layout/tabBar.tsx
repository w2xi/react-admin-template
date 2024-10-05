import { useEffect } from 'react';
import { Tag, theme as antTheme } from 'antd';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import useAppStore from '@/stores/app';
import useTabBarStore from '@/stores/tabBar';
import useUserStore from '@/stores/user'
import type { MenuItem, MenuList } from '@/interface/layout/menu'

const { useToken } = antTheme;

const findMenuByPath = (
  menus: MenuList, 
  path: string, 
  locale: 'zh_CN' | 'en_US'
 ): MenuItem | undefined => {
  for (const menu of menus) {
    if (menu.path === path) {
      return menu
    }
    if (menu.children) {
      const target = findMenuByPath(menu.children, path, locale)
      if (target) {
        return target
      }
    }
  }
}

const initAffixTags = (menus: MenuList) => {
  const affixTags: MenuItem[] = []
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

function TabBar() {
  const navigate = useNavigate();
  const menuList = useUserStore(state => state.menuList);
  const locale = useAppStore(state => state.locale);
  const { visitedRoutes, addVisitedRoute, setVisitedRoute } = useTabBarStore();
  const { token } = useToken();

  const handleClose = (index: number) => {
    const newVisitedRoutes = [...visitedRoutes];
    newVisitedRoutes.splice(index, 1);
    navigate(newVisitedRoutes[newVisitedRoutes.length - 1].path);
    setVisitedRoute(newVisitedRoutes);
  }
  
  useEffect(() => {
    const affixTags = initAffixTags(menuList);
    addVisitedRoute(affixTags);
  }, [menuList])

  useEffect(() => {
    const path = location.pathname
    const menu = findMenuByPath(menuList, path, locale)
    if (menu) {
      addVisitedRoute(menu)
    }
  }, [location.pathname, locale])


  return (
    <div 
      style={{ 
        backgroundColor: token.colorBgElevated,
        borderBottom: `1px solid ${token.colorBorderBg}`,
      }} 
      css={styles}
    >
      { visitedRoutes.map((route, index) => (
        <Tag
          color={ location.pathname === route.path ? 'blue' : 'default' }
          onClick={() => navigate(route.path)}
          key={route.path} 
          style={{ cursor: 'pointer' }}
          onClose={() => handleClose(index)}
          closable={ !route.affix}
        >
          { route.label[locale] }
        </Tag>
      )) }
    </div>
  )
}

export default TabBar;

const styles = css`
  padding: 4px 10px;
  margin-top: 1px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.1);
  .ant-tag {
    height: 26px;
    line-height: 26px;
    display: inline-flex;
    align-items: center;
    padding: 0 8px;
    margin-right: 5px;
    position: relative;
    .ant-tag-close-icon {
      font-size: 8px;
      margin-left: 6px;
    }
  }
`