import React, { Component } from 'react';
import './CheckBox.scss';
import PropTypes from 'prop-types';
import ErrProtecter from '../../utils/ErrProtecter';

class Checkbox extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    label: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.disabled = props.disabled;
    this.label = props.label;
  }

  state = { checked: false, disabled: false };

  handleCheckboxChange = (checkedFlag) => {
    if (!this.disabled) {
      const checkFlag = !checkedFlag;
      this.setState({ checked: checkFlag });
    }
  };

  componentWillMount = () => {
    this.setState({
      disabled: this.disabled,
    });
  };

  render() {
    const { checked, disabled } = this.state;
    return (
      <span
        className="JDcheck_box_wrap"
        tabIndex={0}
        role="button"
        onKeyPress={() => this.handleCheckboxChange(checked)}
        onClick={() => this.handleCheckboxChange(checked)}
      >
        <input
          onChange={() => {}}
          checked={checked}
          disabled={disabled}
          className="JDcheck_box"
          type="checkbox"
        />
        <span className="JDcheck_box_label">{this.label}</span>
      </span>
    );
  }
}

Checkbox.defaultProps = {
  disabled: false,
  label: '',
};

export default ErrProtecter(Checkbox);
