import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './Router'
import './styles/index.scss'
import { StrictMode } from 'react'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
