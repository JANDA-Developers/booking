import React, { Component } from 'react';
import './Switch.scss';
import ErrProtecter from '../../utils/ErrProtecter';
import { Forms, FormsDefault } from '../../utils/PropTypes';

class Switch extends Component {
  static propTypes = Forms;

  constructor(props) {
    super(props);
    this.state = {
      classes: props.classes,
      checked: props.checked,
    };
  }

  handleCheckboxChange = (checkedFlag) => {
    const { disabled } = this.props;
    if (!disabled) {
      const checkFlag = !checkedFlag;
      this.setState({ checked: checkFlag });
    }
  };

  render() {
    const { checked, classes } = this.state;
    const { ltxt, rtxt, disabled } = this.props;
    return (
      <span
        tabIndex={0}
        className="JDswitch"
        role="button"
        onClick={() => this.handleCheckboxChange(checked)}
        onKeyPress={() => this.handleCheckboxChange(checked)}
      >
        <label htmlFor="JDswitch">
          {ltxt !== '' && <span className="JDswitch__ltxt">{ltxt}</span>}
          <input
            onChange={() => {}}
            checked={checked}
            className={`JDswitch__input ${classes.join(' ')}`}
            disabled={disabled}
            type="checkbox"
          />
          <span className="JDswitch__lever" />
          {rtxt !== '' && <span className="JDswitch__rtxt">{rtxt}</span>}
        </label>
      </span>
    );
  }
}

Switch.defaultProps = FormsDefault;

export default ErrProtecter(Switch);
