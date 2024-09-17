import React, { useEffect, useState } from 'react';
import { Layout } from "antd";
import { Outlet } from 'react-router-dom';
import './index.scss';
import MenuComponent from './menu';
import HeaderComponent from './header';
import { getMenuList } from '../../api/layout.ts';
import useUserStore from '@/stores/user.ts';
import useAppStore from '@/stores/app.ts';
import ReactLogo from '@/assets/react.svg';

const { Sider, Content } = Layout;

const LayoutPage: React.FC = () => {
  const { menuList, setMenuList } = useUserStore()
  const { collapsed } = useAppStore()

  const fetchMenuList = async () => {
    const { code, result } = await getMenuList()

    console.log(code, result)

    if (code === 200) {
      setMenuList(result)
    }
  }

  useEffect(() => {
    fetchMenuList()
  }, [])

  return (
    <Layout className='layout-container'>
      <Sider className='sidebar' collapsed={collapsed}>
        <div className='logo-wrapper'>
          <img src={ReactLogo} alt="logo" />
          { collapsed ? null : <span className='title'>Admin</span> }
        </div>
        <MenuComponent menuList={menuList}></MenuComponent>
      </Sider>
      <Layout>
        <HeaderComponent />
        <Content className='content'>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
};

export default LayoutPage;
