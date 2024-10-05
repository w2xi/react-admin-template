import {
  DashboardOutlined,
  LineChartOutlined,
  BarChartOutlined,
  StockOutlined,
  AppstoreOutlined,
  FundOutlined,
  WarningOutlined,
} from '@ant-design/icons'

interface CustomIconProps {
  type?: string
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
  } else if (type === 'components') {
    return <AppstoreOutlined />
  } else if (type === 'business') {
    return <FundOutlined />
  } else if (type === 'error-page') {
    return <WarningOutlined />
  } else {
    return null
  }
}

export default CustomIcon
