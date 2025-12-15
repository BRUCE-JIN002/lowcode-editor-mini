import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Preview Error Boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 border border-red-300 bg-red-50 rounded">
          <h3 className="text-red-800 font-semibold mb-2">预览渲染错误</h3>
          <p className="text-red-600 text-sm mb-2">
            组件渲染时发生错误，请检查组件配置或数据格式。
          </p>
          <details className="text-xs text-red-500">
            <summary>错误详情</summary>
            <pre className="mt-2 whitespace-pre-wrap">
              {this.state.error?.message}
            </pre>
          </details>
          <button
            className="mt-3 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
            onClick={() => this.setState({ hasError: false, error: undefined })}
          >
            重试
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
