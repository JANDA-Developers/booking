import React, { Component } from 'react';
import './Switch.scss';
import PropTypes from 'prop-types';
import ErrProtecter from '../../utils/ErrProtecter';

class Switch extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    ltxt: PropTypes.string,
    rtxt: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.disabled = props.disabled;
    this.rtxt = props.rtxt;
    this.ltxt = props.ltxt;
  }

  state = { checked: false, disabled: false };

  componentWillMount = () => {
    this.setState({
      disabled: this.disabled,
    });
  };

  handleCheckboxChange = (checkedFlag) => {
    if (!this.disabled) {
      const checkFlag = !checkedFlag;
      this.setState({ checked: checkFlag });
    }
  };

  PropTypespropTypes: {
    firstname: PropTypes.string.isRequired,
  };

  render() {
    const { checked, disabled } = this.state;
    return (
      <span
        tabIndex={0}
        className="JDswitch"
        role="button"
        onClick={() => this.handleCheckboxChange(checked)}
        onKeyPress={() => this.handleCheckboxChange(checked)}
      >
        <label htmlFor="JDswitch">
          {this.ltxt !== ''
          && <span className="JDswitch__ltxt">{this.ltxt}</span>
          }
          <input
            onChange={() => {}}
            checked={checked}
            className="JDswitch__input"
            disabled={disabled}
            type="checkbox"
          />
          <span className="JDswitch__lever" />
          {this.rtxt !== ''
          && <span className="JDswitch__ltxt">{this.rtxt}</span>
          }
        </label>
      </span>
    );
  }
}

Switch.defaultProps = {
  disabled: false,
  ltxt: '',
  rtxt: '',
};

export default ErrProtecter(Switch);
