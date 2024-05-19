import { BrowserRouter, RouterProvider } from 'react-router-dom'
import RenderRouter from './routes'
import './App.css'

function App() {
  return (
    // <RouterProvider router={router}></RouterProvider>
    <BrowserRouter>
      <RenderRouter />
    </BrowserRouter>
  )
}

export default App
