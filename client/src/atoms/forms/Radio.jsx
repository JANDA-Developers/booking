import React, { Component } from 'react';
import './Radio.scss';
import ErrProtecter from '../../utils/ErrProtecter';
import { Forms, FormsDefault } from '../../utils/PropTypes';

class Radio extends Component {
  static propTypes = Forms;

  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked,
    };
  }

  handleRadioChange = () => {
    if (!this.disabled) {
      this.setState(state => ({ checked: !state.checked }));
    }
  };

  render() {
    const { checked } = this.state;
    const {
      id, classes, disabled, groupName, label,
    } = this.props;
    return (
      <span className="JDradio">
        <label tabIndex={0} role="button" htmlFor={id}>
          <input
            id={id}
            className={`JDradio__input JDradio__input--gap ${classes.join(' ')}`}
            name={groupName}
            type="radio"
            checked={checked}
            disabled={disabled}
            onChange={this.handleRadioChange}
          />
          <span className="JDradio__label" />
          <span className="JDradio__label-text">{label}</span>
        </label>
      </span>
    );
  }
}

Radio.defaultProps = FormsDefault;

export default ErrProtecter(Radio);
