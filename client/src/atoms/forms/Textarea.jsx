import React, { Component } from 'react';
import './Textarea.scss';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { emBol } from '../../utils/Enums';
import ErrProtecter from '../../utils/ErrProtecter';

class Textarea extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    validation: PropTypes.func,
    max: PropTypes.number,
    label: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.disabled = props.disabled;
    this.validation = props.validation;
    // 디바운스 함수는 메모리에서 사라지는 EVENT 객체를 보호합니다.
    this.debounceHandleChange = debounce(this.debounceHandleChange, 500);
    this.classes = ['JDtextarea'];
    this.max = props.max;
    this.label = props.label;
  }

  state = { disabled: false, classes: '' };

  componentWillMount = () => {
    this.setState({
      disabled: this.disabled,
      classes: this.classes,
    });
  };

  handleChange = (event) => {
    this.debounceHandleChange(event.target);
  };

  // 인풋의 상태에따라서 상태값이 표시됨
  debounceHandleChange = (target) => {
    this.classes.filter(val => val !== 'JDinput--valid' || 'JDinput--invalid');
    const validation = this.validation(target.value, this.max);
    if (validation === emBol.NEUTRAL) {
      this.setState({
        classes: [this.classes],
      });
    } else if (validation) {
      this.setState({
        classes: [this.classes, 'JDinput--valid'],
      });
    } else {
      this.setState({
        classes: [this.classes, 'JDinput--invalid'],
      });
    }
  };

  render() {
    const { disabled, classes } = this.state;
    return (
      <div className="JDinput-wrap">
        <textarea
          onChange={this.handleChange}
          id="JDtextarea"
          className={`${classes.join(' ')}`}
          disabled={disabled}
        />
        <label htmlFor="JDtextarea" className="JDtextarea_label">
          {this.label}
        </label>
      </div>
    );
  }
}

Textarea.defaultProps = {
  disabled: false,
  validation: () => emBol.NEUTRAL,
  max: 10000,
  label: '',
};

export default ErrProtecter(Textarea);
