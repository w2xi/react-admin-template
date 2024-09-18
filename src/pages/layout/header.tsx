import { Layout, Avatar, Dropdown, Space, Switch  } from "antd"
import { MenuUnfoldOutlined, MenuFoldOutlined, DownOutlined, CaretDownOutlined } from '@ant-design/icons'
import useAppStore from '@/stores/app.ts';
import useUserStore from "@/stores/user";
import { useNavigate } from "react-router-dom";
import UserAvatar from '@/assets/mikoto-misaka.jpg'
import type { MenuProps } from 'antd'

const { Header } = Layout;

const styles = {
  fontSize: '18px',
}

const items: MenuProps['items'] = [
  {
    label: 'logout',
    key: 'logout',
  },
];

function HeaderComponent() {
  const navigate = useNavigate();
  const { collapsed, setCollapsed } = useAppStore();
  const { clear } = useUserStore();

  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'logout': {
        clear()
        navigate('/login')
      }
    }
  }

  return (
    <Header className="header">
      <span className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
        { 
          collapsed 
            ? <MenuUnfoldOutlined style={styles} /> 
            : <MenuFoldOutlined style={styles} />}
      </span>
      <Dropdown menu={{items, onClick}} trigger={['click']}>
        <Space style={{ cursor: 'pointer' }}>
          <Avatar size={46} icon={<img src={UserAvatar} alt="avatar" />} />
          <CaretDownOutlined />
        </Space>
      </Dropdown>
    </Header>
  )
}

export default HeaderComponent;