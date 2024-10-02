import { 
  DashboardOutlined, 
  LineChartOutlined, 
  BarChartOutlined, 
  AppleOutlined,
  StockOutlined,
  AppstoreOutlined,
  FundOutlined,
} from '@ant-design/icons';

interface CustomIconProps {
  type?: string;
}

function CustomIcon({ type }: CustomIconProps) {
  if (type === 'dashboard') {
    return <DashboardOutlined />
  } else if (type === 'charts') {
    return <StockOutlined />
  } else if (type === 'bar-chart') {
    return <BarChartOutlined />
  } else if (type === 'line-chart') {
    return <LineChartOutlined />
  } else if (type === 'icon') {
    return <AppleOutlined />
  } else if (type === 'business') {
    return <FundOutlined />
  } else {
    return <AppstoreOutlined />
  }
}

export default CustomIcon;