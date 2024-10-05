import React, { Suspense, useEffect } from 'react'
import { Layout, theme as antTheme } from 'antd'
import { Outlet } from 'react-router-dom'
import './index.scss'
import MenuComponent from './menu'
import HeaderComponent from './header'
import TabBar from './tabBar.tsx'
import { getMenuList } from '../../api/layout.ts'
import useUserStore from '@/stores/user.ts'
import useAppStore from '@/stores/app.ts'
import ReactLogo from '@/assets/react.svg'

const { useToken } = antTheme
const { Sider, Content } = Layout

const LayoutPage: React.FC = () => {
  const { token } = useToken()
  const { menuList, setMenuList } = useUserStore()
  const { collapsed } = useAppStore()

  const fetchMenuList = async () => {
    const { code, result } = await getMenuList()
    if (code === 200) {
      setMenuList(result)
    }
  }

  useEffect(() => {
    fetchMenuList()
  }, [])

  return (
    <Layout className="layout-container">
      <Sider className="sidebar" collapsed={collapsed} style={{ backgroundColor: token.colorBgContainer }}>
        <div className="logo-wrapper">
          <img src={ReactLogo} alt="logo" />
          {collapsed ? null : (
            <span className="title" style={{ color: token.colorText }}>
              Admin
            </span>
          )}
        </div>
        <MenuComponent menuList={menuList}></MenuComponent>
      </Sider>
      <Layout>
        <HeaderComponent />
        <TabBar />
        <Content className="content">
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutPage
