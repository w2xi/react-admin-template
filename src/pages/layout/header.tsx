import { Layout, Avatar, Dropdown, Space, Switch  } from "antd"
import { MenuUnfoldOutlined, MenuFoldOutlined, DownOutlined, CaretDownOutlined } from '@ant-design/icons'
import useAppStore from '@/stores/app.ts';
import useUserStore from "@/stores/user";
import { useNavigate } from "react-router-dom";
import UserAvatar from '@/assets/mikoto-misaka.jpg'
import LanguageSvg from '@/assets/language.svg?react'
import type { MenuProps } from 'antd'

const { Header } = Layout;

const styles = {
  fontSize: '18px',
}

function HeaderComponent() {
  const navigate = useNavigate();
  const { collapsed, locale, setCollapsed, setLocale } = useAppStore();
  const { clear } = useUserStore();

  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'logout': {
        clear()
        navigate('/login')
        break;
      }
      case 'zh_CN': {
        setLocale('zh_CN')
        break;
      }
      case 'en_US': {
        setLocale('en_US')
        break;
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
      <div className="actions">
        <Dropdown
          menu={{
            onClick,
            items: [
              {
                key: 'zh_CN',
                disabled: locale === 'zh_CN',
                label: '中文',
              },
              {
                key: 'en_US',
                disabled: locale === 'en_US',
                label: 'English',
              },
            ],
          }}
          trigger={['click']}
        >
          <span style={{ cursor: 'pointer' }}>
            <LanguageSvg height={20} width={20} />
          </span>
        </Dropdown>
        <Dropdown menu={{
            onClick,
            items: [
              {
                label: 'logout',
                key: 'logout',
              },
            ], 
          }} 
          trigger={['click']}
        >
          <Space style={{ cursor: 'pointer' }}>
            <Avatar size={46} icon={<img src={UserAvatar} alt="avatar" />} />
            <CaretDownOutlined />
          </Space>
        </Dropdown>
      </div>
    </Header>
  )
}

export default HeaderComponent;