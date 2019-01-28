import React, { Component } from 'react';
import './InputText.scss';
import debounce from 'lodash.debounce';
import { emBol } from '../../utils/Enums';
import ErrProtecter from '../../utils/ErrProtecter';
import { Forms, FormsDefault } from '../../utils/PropTypes';

class InputText extends Component {
  static propTypes = Forms;

  // 이부분은 반복을 줄일수 없나..
  constructor(props) {
    super(props);
    this.disabled = props.disabled;
    this.validation = props.validation;
    // 디바운스 함수는 메모리에서 사라지는 EVENT 객체를 보호합니다.
    this.debounceHandleChange = debounce(this.debounceHandleChange, 500);
    this.classes = ['JDinput'].concat(props.classes);
    this.max = props.max;
    this.label = props.label;
    this.readOnly = props.readOnly;
    this.value = props.value;
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
    this.classes = this.classes.filter(
      val => val !== 'JDinput--valid' && val !== 'JDinput--invalid',
    );
    const validation = this.validation(target.value, this.max);
    if (validation === emBol.NEUTRAL) {
      this.setState({
        classes: this.classes,
      });
    } else if (validation) {
      this.classes.push('JDinput--valid');
      this.setState({
        classes: this.classes,
      });
    } else {
      this.classes.push('JDinput--invalid');
      this.setState({
        classes: this.classes,
      });
    }
  };

  render() {
    const { disabled, classes } = this.state;
    return (
      <div className="JDinput-wrap">
        <input
          onChange={this.handleChange}
          id="JDinput"
          className={`${classes.join(' ')}`}
          disabled={disabled}
          readOnly={this.readOnly}
          value={this.value}
        />
        <label htmlFor="JDinput" className="JDinput_label">
          {this.label}
        </label>
      </div>
    );
  }
}

InputText.defaultProps = FormsDefault;

export default ErrProtecter(InputText);
