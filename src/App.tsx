import { BrowserRouter } from 'react-router-dom'
import RenderRouter from './routes'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <RenderRouter />
    </BrowserRouter>
  )
}

export default App
