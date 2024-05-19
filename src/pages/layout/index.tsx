import React, { useState } from 'react';
import { Layout } from "antd";
import { Outlet } from 'react-router-dom';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import MenuComponent from './menu';
import type { MenuList } from '../../interface/layout/menu.interface.ts';

const { Header, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  height: 56,
  backgroundColor: '#fff',
};

const layoutStyle = {
  overflow: 'hidden',
  height: '100vh'
};

const contentStyle = {
  padding: '10px',
  background: '#efefef',
};

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
    <Layout style={layoutStyle}>
      <Sider width="25%">
        <MenuComponent menuList={menuList}></MenuComponent>
      </Sider>
      <Layout>
        <Header style={headerStyle}>Header</Header>
        <Content style={contentStyle}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
};

export default LayoutPage;
