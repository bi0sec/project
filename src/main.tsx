import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from './config/authConfig';
import App from './App.tsx';
import './index.css';
import { initializeStores } from './utils/initializeStores';

const msalInstance = new PublicClientApplication(msalConfig);

// Default to using redirect in production and popup in development
const isRedirectEnabled = import.meta.env.PROD;

// Initialize stores if needed
if (!localStorage.getItem('training-storage')) {
  initializeStores();
}

msalInstance.initialize().then(() => {
  // Handle redirect promise after initialization
  if (isRedirectEnabled) {
    msalInstance.handleRedirectPromise().catch(error => {
      console.error("Redirect error:", error);
    });
  }

  msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS) {
      console.log("Login successful");
    }
  });

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    </StrictMode>
  );
});