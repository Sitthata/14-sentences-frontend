import './styles/output.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import routes from './routes/AppRouter'

function App() {
  const router = createBrowserRouter(routes)
  return <RouterProvider router={router} />
}

export default App
