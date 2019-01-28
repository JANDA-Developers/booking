import React, { Component } from 'react';
import './Radio.scss';
import ErrProtecter from '../../utils/ErrProtecter';
import { Forms, FormsDefault } from '../../utils/PropTypes';

class Radio extends Component {
  static propTypes = Forms;

  constructor(props) {
    super(props);
    this.disabled = props.disabled;
    this.label = props.label;
    this.classes = props.classes;
    this.groupName = props.groupName;
    this.id = props.id;
  }

  state = { checked: false, disabled: false, classes: '' };

  handleRadioChange = (checkedFlag) => {
    if (!this.disabled) {
      const checkFlag = !checkedFlag;
      this.setState({ checked: checkFlag });
    }
  };

  componentWillMount = () => {
    this.setState({
      disabled: this.disabled,
      classes: this.classes,
      checked: this.checked,
    });
  };

  render() {
    const { checked, disabled, classes } = this.state;
    return (
      <span className="JDradio">
        <label tabIndex={0} role="button" htmlFor={this.id}>
          <input
            id={this.id}
            className={`JDradio__input JDradio__input--gap ${classes.join(' ')}`}
            name={this.groupName}
            type="radio"
            checked={checked}
            disabled={disabled}
          />
          <span className="JDradio__label">{this.label}</span>
        </label>
      </span>
    );
  }
}

Radio.defaultProps = FormsDefault;

export default ErrProtecter(Radio);
