import { Suspense } from 'react';
import './App.css';

// Components
import Loading from './components/Loading/Loading';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

/**
 * Main App Component
 * 
 * This is a fallback component that's not typically used in the router-based app.
 * The actual app structure is defined in main.jsx with RouterProvider.
 * 
 * This component serves as a development/testing fallback.
 */
function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-base-100">
        <Suspense fallback={<Loading />}>
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <div className="mb-8">
                <img 
                  src="/logoxx.png" 
                  alt="Xdecor Logo" 
                  className="w-24 h-24 mx-auto mb-4 rounded-full shadow-lg"
                />
                <h1 className="text-4xl font-bold text-primary mb-2">
                  Xdecor
                </h1>
                <p className="text-lg text-base-content/70">
                  Professional Home Decoration Booking Platform
                </p>
              </div>

              <div className="card bg-base-200 shadow-xl max-w-md mx-auto">
                <div className="card-body text-center">
                  <h2 className="card-title justify-center mb-4">
                    Development Mode
                  </h2>
                  <p className="mb-4">
                    This is the fallback App component. The main application 
                    runs through the RouterProvider in main.jsx.
                  </p>
                  <div className="card-actions justify-center">
                    <a 
                      href="/" 
                      className="btn btn-primary"
                      onClick={() => window.location.reload()}
                    >
                      Go to Main App
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-sm text-base-content/50">
                <p>
                  If you're seeing this page, there might be a routing issue.
                  Check the browser console for more information.
                </p>
              </div>
            </div>
          </div>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

export default App;
