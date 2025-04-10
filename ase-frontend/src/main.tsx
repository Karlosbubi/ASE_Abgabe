import { StrictMode } from 'react'
import { ReactFlowProvider } from "@xyflow/react";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ReactFlowProvider>
            <App />
        </ReactFlowProvider>
    </StrictMode>,
)
