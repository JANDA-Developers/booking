import React, { Component } from 'react';
import './Switch.scss';
import PropTypes from 'prop-types';
import ErrProtecter from '../../utils/ErrProtecter';
import { Forms, FormsDefault } from '../../utils/PropTypes';

class Switch extends Component {
  static propTypes = Forms;

  constructor(props) {
    super(props);
    this.disabled = props.disabled;
    this.rtxt = props.rtxt;
    this.ltxt = props.ltxt;
    this.classes = props.classes;
    this.checked = props.checked;
  }

  state = { checked: false, disabled: false, classes: '' };

  componentWillMount = () => {
    this.setState({
      disabled: this.disabled,
      classes: this.classes,
      checked: this.checked,
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
    const { checked, disabled, classes } = this.state;
    return (
      <span
        tabIndex={0}
        className="JDswitch"
        role="button"
        onClick={() => this.handleCheckboxChange(checked)}
        onKeyPress={() => this.handleCheckboxChange(checked)}
      >
        <label htmlFor="JDswitch">
          {this.ltxt !== '' && <span className="JDswitch__ltxt">{this.ltxt}</span>}
          <input
            onChange={() => {}}
            checked={checked}
            className={`JDswitch__input ${classes.join(' ')}`}
            disabled={disabled}
            type="checkbox"
          />
          <span className="JDswitch__lever" />
          {this.rtxt !== '' && <span className="JDswitch__ltxt">{this.rtxt}</span>}
        </label>
      </span>
    );
  }
}

Switch.defaultProps = FormsDefault;

export default ErrProtecter(Switch);
