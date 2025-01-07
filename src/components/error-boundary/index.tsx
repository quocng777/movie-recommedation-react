import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      this.setState({ hasError: false });
      return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Oops! Something went wrong.
            </h1>
            <p className="text-xl mb-6">
              We encountered an issue. Please try to back to home.
            </p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-md shadow-md"
            >Home</a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;