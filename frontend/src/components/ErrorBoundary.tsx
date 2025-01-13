import { ReplayCircleFilledRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Component, ErrorInfo, ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

interface IState {
  hasError: boolean;
  error: Error;
  info: ErrorInfo;
}

class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      hasError: false,
      error: { name: "", message: "", stack: "" },
      info: { componentStack: "" },
    };
  }

  static getDerivedStateFromError(_: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // In production we would log the error to an error reporting service
    console.error("Uncaught error:", error, info);
    this.setState({ error, info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong. Reload the page and try again.</h1>
          <IconButton
            aria-label="reload"
            size="large"
            onClick={() => location.reload()}
          >
            <ReplayCircleFilledRounded />
          </IconButton>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
