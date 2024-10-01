import { useNavigate } from "react-router-dom";
import { Layout, Avatar, Dropdown, Space, Tooltip, theme as antTheme  } from "antd"
import { MenuUnfoldOutlined, MenuFoldOutlined, CaretDownOutlined, SunOutlined, MoonOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import useAppStore from '@/stores/app.ts';
import useUserStore from "@/stores/user";
import UserAvatar from '@/assets/mikoto-misaka.jpg'
import LanguageSvg from '@/assets/language.svg?react'
import type { MenuProps } from 'antd'

const { useToken } = antTheme;
const { Header } = Layout;

function HeaderComponent() {
  const navigate = useNavigate();
  const { token } = useToken();
  const { collapsed, locale, theme, setLocale, setTheme, setCollapsed } = useAppStore();
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
    <Header className="header" style={{ backgroundColor: token.colorBgContainer }}>
      <span className="action-btn" onClick={() => setCollapsed(!collapsed)}>
        { 
          collapsed 
            ? <MenuUnfoldOutlined /> 
            : <MenuFoldOutlined />}
      </span>
      <div className="actions">
        <Tooltip title={theme === 'dark' ? 'light mode' : 'dark mode'}>
          <span className="action-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          { theme === 'dark' ? <SunOutlined /> : <MoonOutlined /> }
          </span>
        </Tooltip>
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
          <span className="action-btn">
            <LanguageSvg height={18} width={18} />
          </span>
        </Dropdown>
        <Dropdown 
          menu={{
            onClick,
            items: [
              {
                label: <FormattedMessage id="user.logout" />,
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