import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider, theme as antTheme } from 'antd'
import { IntlProvider } from 'react-intl'
import enUS from 'antd/es/locale/en_US'
import zhCN from 'antd/es/locale/zh_CN'
import { localeConfig } from './locales'
import RenderRouter from './routes'
import RouteGuard from './routes/permission'
import useAppStore from './stores/app'
import './App.css'

function App() {
  const { theme, locale } = useAppStore()

  useEffect(() => {
    console.log('location', location.pathname);
  }, [location.pathname])

  const getAntdLocale = () => {
    if (locale === 'zh_CN') {
      return zhCN
    } else {
      return enUS
    }
  }

  return (
    <ConfigProvider
      locale={getAntdLocale()}
      theme={{
        algorithm: theme === 'dark' ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
      }}
    >
      <IntlProvider locale={locale.split('_')[0]} messages={localeConfig[locale]}>
        <BrowserRouter>
          <RouteGuard>
            <RenderRouter />
          </RouteGuard>
        </BrowserRouter>
      </IntlProvider>
    </ConfigProvider>
  )
}

export default App
