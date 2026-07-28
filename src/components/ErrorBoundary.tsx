import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

/**
 * Catches render-time crashes so one bad widget can't blank the whole page.
 * Provides a retry path instead of forcing a full reload.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, message: '' };

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return {
      hasError: true,
      message: error instanceof Error ? error.message : 'Something went wrong.',
    };
  }

  componentDidCatch(error: unknown, info: ErrorInfo): void {
    // Keep for diagnostics; safe no-op in production builds.
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught:', error, info.componentStack);
    }
  }

  private handleRetry = (): void => {
    this.setState({ hasError: false, message: '' });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div
          role="alert"
          className="mx-auto w-full max-w-lg rounded-xl border border-red-200 bg-red-50 p-6 text-center"
        >
          <h2 className="text-lg font-semibold text-red-800">Something went wrong</h2>
          <p className="mt-2 break-words text-sm text-red-700">
            {this.state.message || 'This section failed to load.'}
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={this.handleRetry}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 active:bg-red-800"
            >
              Try again
            </button>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-100"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
