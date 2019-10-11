import React, { Component, FunctionComponent } from 'react';

export function EerrorProtect<P>(WrappedComponent: FunctionComponent<P>) {
  return class extends React.Component<P, any> {
    state = {
      hasErr: false,
    };

    ComponentDidCatch = () => {
      this.setState({
        hasErr: true,
      });
    };

    render() {
      const { hasErr } = this.state;
      if (hasErr) {
        return 'sorry Something Wrong';
      }
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default EerrorProtect;
