import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Projects from './components/projects.tsx'
import About from './components/about.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    Component: App
  },
  {
    path: "/projects",
    Component: Projects
  },
  {
    path: "/about",
    Component: About
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
