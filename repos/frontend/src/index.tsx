import './styles'
import 'tailwindcss/tailwind.css'
import { StrictMode } from 'react'
import { Router } from '@CPAF/router'
import { createRoot } from 'react-dom/client'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <StrictMode>
    <Router />
  </StrictMode>
)
