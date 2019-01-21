import React, { Component } from 'react';
import './CheckBox.scss';
import ErrProtecter from '../../utils/ErrProtecter';
import { Forms, FormsDefault } from '../../utils/PropTypes';

class Checkbox extends Component {
  static propTypes = Forms;

  constructor(props) {
    super(props);
    this.disabled = props.disabled;
    this.label = props.label;
    this.classes = props.classes;
  }

  state = { checked: false, disabled: false, classes: '' };

  handleCheckboxChange = (checkedFlag) => {
    if (!this.disabled) {
      const checkFlag = !checkedFlag;
      this.setState({ checked: checkFlag });
    }
  };

  componentWillMount = () => {
    this.setState({
      disabled: this.disabled,
      classes: this.classes,
    });
  };

  render() {
    const { checked, disabled, classes } = this.state;
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
          className={`JDcheck_box ${classes.join(' ')}`}
          type="checkbox"
        />
        <span className="JDcheck_box_label">{this.label}</span>
      </span>
    );
  }
}

Checkbox.defaultProps = FormsDefault;

export default ErrProtecter(Checkbox);
