import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import RenderRouter from './routes'
import RouteGuard from './routes/permission'
import './App.css'

function App() {
  useEffect(() => {
    console.log('location', location.pathname);
  }, [location.pathname])

  return (
    <BrowserRouter>
      <RouteGuard>
        <RenderRouter />
      </RouteGuard>
    </BrowserRouter>
  )
}

export default App
