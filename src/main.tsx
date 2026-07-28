import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';

const container = document.getElementById('root');

if (!container) {
  document.body.innerHTML =
    '<div style="font-family:system-ui,sans-serif;padding:2rem;text-align:center">Could not start the app: missing #root element.</div>';
  throw new Error('Missing #root element');
}

createRoot(container).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
