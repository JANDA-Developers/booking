import React, { Component } from 'react';

const ErrorFallback = 'sorry Something Wrong';

const ErrProtect = CheckComponent => class ErrProtecter extends Component {
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
        return <ErrorFallback />;
      }
      return <CheckComponent />;
    }
};

export default ErrProtect;
