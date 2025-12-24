import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'

// Handle redirect from GitHub Pages 404.html
const l = window.location
if (l.search[1] === '/') {
    const decoded = l.search
        .slice(1)
        .split('&')
        .reduce(
            (prev, curr) => {
                const [key, val] = curr.split('=')
                prev[key] = val
                return prev
            },
            {} as Record<string, string>
        )
    window.history.replaceState(null, '', l.pathname.slice(0, -10) + decoded.p + (decoded.q ? '?' + decoded.q : ''))
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
)
