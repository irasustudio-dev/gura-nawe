import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initializeGA } from './utils/analytics';
import { registerServiceWorker } from './utils/serviceWorker';

// Initialize analytics
initializeGA();

// Register service worker for offline support
if (import.meta.env.PROD) {
  registerServiceWorker();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
