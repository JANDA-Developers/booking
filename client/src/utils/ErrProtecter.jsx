import React, { Component } from 'react';

const ErrorFallback = 'sorry Something Wrong';

const ErrProtecter = CheckComponent => class ErrProtect extends Component {
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
      return <CheckComponent {...this.props} />;
    }
};

export default ErrProtecter;
