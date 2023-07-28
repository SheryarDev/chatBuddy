import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { UserProvider } from './context/auth.tsx'
import { MessagesProvider } from './context/MessagesContext.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
    <MessagesProvider>
    <App />
    </MessagesProvider>
    </UserProvider>
  </React.StrictMode>
)
