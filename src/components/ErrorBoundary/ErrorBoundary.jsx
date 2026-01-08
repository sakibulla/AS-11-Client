import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

/**
 * Error Boundary Component
 * 
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // You can also log the error to an error reporting service here
    // Example: logErrorToService(error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body text-center">
                {/* Error Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-error" />
                  </div>
                </div>

                {/* Error Title */}
                <h2 className="card-title justify-center text-error mb-2">
                  Oops! Something went wrong
                </h2>

                {/* Error Description */}
                <p className="text-base-content/70 mb-6">
                  We encountered an unexpected error. This has been logged and 
                  our team will look into it.
                </p>

                {/* Development Error Details */}
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <div className="bg-base-300 rounded-lg p-4 mb-6 text-left">
                    <h3 className="font-semibold text-sm mb-2 text-error">
                      Error Details (Development Only):
                    </h3>
                    <pre className="text-xs text-base-content/60 overflow-auto max-h-32">
                      {this.state.error.toString()}
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="card-actions justify-center gap-2">
                  <button 
                    onClick={this.handleReload}
                    className="btn btn-primary btn-sm"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reload Page
                  </button>
                  <button 
                    onClick={this.handleGoHome}
                    className="btn btn-outline btn-sm"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Go Home
                  </button>
                </div>

                {/* Additional Help */}
                <div className="mt-4 text-xs text-base-content/50">
                  <p>
                    If this problem persists, please contact support or 
                    try refreshing the page.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // If no error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;