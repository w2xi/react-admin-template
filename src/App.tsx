import { useEffect, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Spin, ConfigProvider, theme as antTheme } from 'antd'
import { IntlProvider } from 'react-intl'
import enUS from 'antd/es/locale/en_US'
import zhCN from 'antd/es/locale/zh_CN'
import { localeConfig } from './locales'
import RenderRouter from './routes'
import RouteGuard from './routes/permission'
import useAppStore from './stores/app'

function App() {
  const { theme, locale, loading } = useAppStore()

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
          <Suspense fallback={null}>
            <Spin
              className="app-loading-wrapper"
              spinning={loading}
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.44)' : 'rgba(255, 255, 255, 0.44)',
              }}
            >
            </Spin>
            <RouteGuard>
              <RenderRouter />
            </RouteGuard>
          </Suspense>
        </BrowserRouter>
      </IntlProvider>
    </ConfigProvider>
  )
}

export default App
