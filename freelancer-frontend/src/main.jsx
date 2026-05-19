// ======================================================
// 🚀 MAIN ENTRY FILE
// ======================================================

window.global = window;

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// 👇 IMPORT AUTH PROVIDER
import { AuthProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>

    {/* 👇 WRAP APP WITH AUTH PROVIDER */}
    <AuthProvider>
      <App />
    </AuthProvider>

  </StrictMode>,
);
