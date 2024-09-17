import { Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import useAppStore from '@/stores/app.ts';

const { Header } = Layout;

const styles = {
  fontSize: '18px',
}

function HeaderComponent() {
  const { collapsed, setCollapsed } = useAppStore();

  return (
    <Header className="header">
      <span className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
        { 
          collapsed 
            ? <MenuUnfoldOutlined style={styles} /> 
            : <MenuFoldOutlined style={styles} />}
      </span>
    </Header>
  )
}

export default HeaderComponent;