import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const queryClient = new QueryClient()
root.render(
  <React.StrictMode>
        <CookiesProvider>
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
    </CookiesProvider>
  </React.StrictMode>
);

