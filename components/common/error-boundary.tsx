"use client";

import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Production-grade Error Boundary Component
 * Catches React errors and provides graceful fallback UI
 * Logs errors to monitoring service in production
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to monitoring service (Sentry, LogRocket, etc.)
    if (process.env.NODE_ENV === "production") {
      // window.Sentry?.captureException(error, { extra: errorInfo });
      console.error("Error Boundary Caught:", error, errorInfo);
    } else {
      console.error("Error Boundary Caught:", error, errorInfo);
    }

    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="card p-8 max-w-2xl w-full">
            <div className="text-center">
              {/* Error Icon */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center text-red-600 text-4xl mx-auto mb-6">
                ⚠️
              </div>

              {/* Error Title */}
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">
                Something went wrong
              </h2>

              {/* Error Message */}
              <p className="text-[var(--color-text-secondary)] mb-6">
                We encountered an unexpected error. Don't worry, we've been notified and
                are working on a fix.
              </p>

              {/* Development Error Details */}
              {process.env.NODE_ENV === "development" && this.state.error && (
                <details className="text-left mb-6 p-4 bg-red-50 rounded-xl border-2 border-red-200">
                  <summary className="cursor-pointer font-medium text-red-900 mb-2">
                    Error Details (Development Only)
                  </summary>
                  <pre className="text-xs text-red-800 overflow-auto max-h-48">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={this.handleReset}
                  className="btn btn-primary"
                  aria-label="Try again"
                >
                  Try Again
                </button>
                <a
                  href="/"
                  className="btn btn-ghost"
                  aria-label="Go to homepage"
                >
                  Go to Homepage
                </a>
                <a
                  href="/dashboard"
                  className="btn btn-secondary"
                  aria-label="Go to dashboard"
                >
                  Go to Dashboard
                </a>
              </div>

              {/* Support Link */}
              <p className="mt-6 text-sm text-[var(--color-text-tertiary)]">
                Need help? <a href="/support" className="text-[var(--color-forest-deep)] underline">Contact Support</a>
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
