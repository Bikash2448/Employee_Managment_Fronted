import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
<GoogleOAuthProvider clientId="965514216154-3osju3u91ll539gp8us0n6k5gv972o3g.apps.googleusercontent.com">
    <App />
</GoogleOAuthProvider>
)
