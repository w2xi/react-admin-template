import { useEffect } from 'react'
import { Tag, Dropdown, theme as antTheme } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import { css } from '@emotion/react'
import { FormattedMessage } from 'react-intl'
import useAppStore from '@/stores/app'
import useTabBarStore from '@/stores/tabBar'
import useUserStore from '@/stores/user'
import { findMenuByPath, initAffixTags } from '@/utils'
import type { MenuProps } from 'antd'

const { useToken } = antTheme

function TabBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const menuList = useUserStore(state => state.menuList)
  const { locale } = useAppStore()
  const { visitedRoutes, addVisitedRoute, setVisitedRoute } = useTabBarStore()
  const { token } = useToken()

  const handleClose = (index: number) => {
    const newVisitedRoutes = [...visitedRoutes]
    newVisitedRoutes.splice(index, 1)
    navigate(newVisitedRoutes[newVisitedRoutes.length - 1].path)
    setVisitedRoute(newVisitedRoutes)
  }

  useEffect(() => {
    addVisitedRoute(initAffixTags(menuList))
  }, [menuList])

  useEffect(() => {
    const path = location.pathname
    const menu = findMenuByPath(menuList, path)
    if (menu) {
      addVisitedRoute(menu)
    }
  }, [location.pathname])

  const handleClick: MenuProps['onClick'] = ({ key }) => {
    const index = visitedRoutes.findIndex(route => route.path === location.pathname)
    const affixTags = initAffixTags(menuList)
    const currentRoute = visitedRoutes[index]

    switch (key) {
      case 'close': {
        if (!currentRoute.affix) {
          handleClose(index)
        }
        break
      }
      case 'close-others': {
        addVisitedRoute(affixTags.concat(currentRoute))
        break
      }
      case 'close-all': {
        setVisitedRoute(affixTags)
        navigate('/')
        break
      }
    }
  }

  return (
    <div
      style={{
        backgroundColor: token.colorBgElevated,
        borderBottom: `1px solid ${token.colorBorderBg}`,
      }}
      css={styles}
    >
      {visitedRoutes.map((route, index) => (
        <Tag
          color={location.pathname === route.path ? 'blue' : 'default'}
          onClick={() => navigate(route.path)}
          key={route.path}
          style={{ cursor: 'pointer' }}
          onClose={() => handleClose(index)}
          closable={!route.affix}
        >
          {route.label[locale]}
        </Tag>
      ))}

      <Dropdown
        menu={{
          onClick: handleClick,
          items: [
            {
              label: <FormattedMessage id="tabBar.actions.close" />,
              key: 'close',
            },
            {
              label: <FormattedMessage id="tabBar.actions.close-others" />,
              key: 'close-others',
            },
            {
              label: <FormattedMessage id="tabBar.actions.close-all" />,
              key: 'close-all',
            },
          ],
        }}
        trigger={['click']}
      >
        <SettingOutlined className="icon-setting" style={{ color: token.colorTextSecondary }} />
      </Dropdown>
    </div>
  )
}

export default TabBar

const styles = css`
  position: relative;
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
  .icon-setting {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`
