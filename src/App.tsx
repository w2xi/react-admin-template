import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider, theme as antTheme } from 'antd'
import RenderRouter from './routes'
import RouteGuard from './routes/permission'
import useAppStore from './stores/app'
import './App.css'

function App() {
  const { theme } = useAppStore()

  useEffect(() => {
    console.log('location', location.pathname);
  }, [location.pathname])

  return (
    <ConfigProvider
    theme={{
        algorithm: theme === 'dark' ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
      }}
    >
      <BrowserRouter>
        <RouteGuard>
          <RenderRouter />
        </RouteGuard>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
