import React, { useState } from 'react';
import { Layout } from "antd";
import { Outlet } from 'react-router-dom';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import MenuComponent from './menu';
import './index.scss';
import type { MenuList } from '../../interface/layout/menu.interface.ts';

const { Header, Sider, Content } = Layout;

const menus: MenuList = [
  {
    key: '1',
    code: '1',
    icon: <UserOutlined />,
    label: 'nav 1',
    path: '/1',
  },
  {
    key: '2',
    code: '2',
    icon: <VideoCameraOutlined />,
    label: 'nav 2',
    path: '/2',
  },
  {
    key: '3',
    code: '3',
    icon: <UploadOutlined />,
    label: 'nav 3',
    path: '/3',
  },
]

const LayoutPage: React.FC = () => {
  const [menuList] = useState<MenuList>(menus)

  return (
    <Layout className='layout-container'>
      <Sider className='sidebar'>
        <MenuComponent menuList={menuList}></MenuComponent>
      </Sider>
      <Layout>
        <Header className='header'>Header</Header>
        <Content className='content'>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
};

export default LayoutPage;
