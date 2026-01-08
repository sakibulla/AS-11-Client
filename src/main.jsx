import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router/dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';

// Styles
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

// Components
import { router } from './routes/router.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.jsx';

// React Query Configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Toast Configuration
const toastConfig = {
  position: "top-right",
  autoClose: 4000,
  hideProgressBar: false,
  newestOnTop: true,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: "colored",
  toastClassName: "custom-toast",
};

// Initialize React App
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found. Make sure you have a div with id="root" in your HTML.');
}

const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider 
            router={router}
            fallbackElement={
              <div className="min-h-screen bg-base-100 flex items-center justify-center">
                <div className="loading loading-spinner loading-lg text-primary"></div>
              </div>
            }
          />
          <ToastContainer {...toastConfig} />
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);

// Development helpers
if (import.meta.env.DEV) {
  console.log('🚀 Xdecor Client v2.0.0 - Development Mode');
  console.log('📍 Environment:', import.meta.env.MODE);
  console.log('🌐 API URL:', import.meta.env.VITE_API_URL);
}

// Performance monitoring
if (import.meta.env.PROD) {
  // Register service worker for production
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
}
