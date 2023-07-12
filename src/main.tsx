import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './Router'
import './styles/index.scss'

createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
)
