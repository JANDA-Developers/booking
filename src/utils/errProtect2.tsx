import React from 'react';

export default class ErrorBoundary extends React.Component<any, any> {
  constructor(...args: any) {
    super(args);
    this.state = {
      catchedError: false,
    };
  }

  componentDidCatch(error: Error, errorInfo: Object): void {
    this.setState({ catchedError: error });
  }

  render(): JSX.Element | React.ReactNode {
    const { children } = this.props;
    const { catchedError } = this.state;

    if (catchedError) return <div>Something went wrong</div>;

    // return the children
    return children;
  }
}
