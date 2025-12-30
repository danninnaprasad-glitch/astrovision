
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

/**
 * Astro Vision AI - Production Initialization
 * This script handles global error capturing to ensure the user never sees a blank screen.
 */

// Shimming process for browser environments where process.env might be missing
if (typeof (window as any).process === 'undefined') {
  (window as any).process = { env: {} };
}

window.addEventListener('error', (event) => {
  console.error('Celestial Sync Error:', event.error);
  const root = document.getElementById('root');
  if (root && root.innerHTML === '') {
    root.innerHTML = `
      <div style="padding: 40px; font-family: 'Cinzel', serif; color: #064E3B; background: #FFFBF2; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
        <div style="font-size: 4rem; margin-bottom: 20px;">🌌</div>
        <h1 style="font-size: 2rem; margin-bottom: 20px; letter-spacing: 0.1em;">Celestial Misalignment</h1>
        <p style="max-width: 500px; line-height: 1.6; opacity: 0.7; font-family: sans-serif; font-weight: 300;">
          The Astro Vision AI interface failed to synchronize with your browser environment. This usually indicates a configuration or script loading issue.
        </p>
        <div style="margin: 30px 0; padding: 25px; background: rgba(0,0,0,0.03); border: 1px solid rgba(0,0,0,0.05); border-radius: 20px; font-family: monospace; font-size: 11px; text-align: left; max-width: 600px; overflow-x: auto; color: #666;">
          <strong>Error Trace:</strong><br/>
          ${event.error?.message || event.message || 'Unknown initialization error'}
        </div>
        <button onclick="window.location.reload()" style="margin-top: 10px; padding: 18px 45px; background: #064E3B; color: white; border: none; border-radius: 50px; cursor: pointer; text-transform: uppercase; letter-spacing: 3px; font-weight: bold; font-size: 10px; box-shadow: 0 10px 30px rgba(6,78,59,0.2);">
          Retry Alignment
        </button>
      </div>
    `;
  }
});

const mountApp = () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } else {
    console.error("FATAL: Root element (#root) missing in index.html");
  }
};

// Ensure DOM is ready before mounting
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}
