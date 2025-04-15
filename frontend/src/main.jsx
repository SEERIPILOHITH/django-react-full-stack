import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

import Nav from './components/Nav'
createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <Nav />
    <App />
    

  </StrictMode>,
)
