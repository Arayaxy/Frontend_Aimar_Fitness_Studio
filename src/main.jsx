import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from './auth/context/AuthProvider.jsx'
import './sass/main.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>

  </StrictMode>,
)
