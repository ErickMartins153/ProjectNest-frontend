import { Component, ReactNode } from "react";
import { ExceptionBody } from "../models/error/ExceptionBody";

interface ErrorBoundaryState {
  hasError: boolean;
  error: ExceptionBody | null;
}

export class ErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: unknown) {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.error("ErrorBoundary capturou um erro:", error, info);
  }

  render() {
    if (this.state.hasError && this.state.error instanceof ExceptionBody) {
      const { httpStatus, message, request, timeStamp } = this.state.error;

      return (
        <div>
          <h1>Algo deu errado!</h1>
          <p>Status: {httpStatus}</p>
          <p>Mensagem: {message}</p>
          <p>Request: {request}</p>
          <p>Horário: {timeStamp}</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Tentar novamente
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
