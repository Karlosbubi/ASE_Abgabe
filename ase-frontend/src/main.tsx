import { StrictMode } from 'react'
import { ReactFlowProvider } from "@xyflow/react";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ReactFlowProvider>
            <Toaster
                position="top-right"
                containerStyle={{ top: '4.5rem' }} // verschiebt Toasts unter die NavBar
            />
            <App />
        </ReactFlowProvider>
    </StrictMode>,
)
