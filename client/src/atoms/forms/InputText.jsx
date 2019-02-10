import React, { Component } from 'react';
import './InputText.scss';
import debounce from 'lodash.debounce';
import classNames from 'classnames/bind';
import ErrProtecter from '../../utils/ErrProtecter';
import { Forms, FormsDefault } from '../../utils/PropTypes';

class InputText extends Component {
  static propTypes = Forms;

  constructor(props) {
    super(props);
    // 디바운스 함수는 메모리에서 사라지는 EVENT 객체를 보호합니다.
    this.debounceHandleChange = debounce(this.debounceHandleChange, 500);
    this.state = {
      isValid: '',
    };
  }

  handleChange = (event) => {
    this.debounceHandleChange(event.target);
  };

  // 인풋의 상태에따라서 상태값이 표시됨
  debounceHandleChange = (target) => {
    const { validation, max } = this.props;
    const result = validation(target.value, max);
    console.log(result);
    this.setState({
      isValid: result,
    });
  };

  render() {
    const { isValid } = this.state;
    const {
      readOnly, value, label, disabled, type,
    } = this.props;

    const classes = classNames({
      JDinput: true,
      'JDinput--valid': isValid === true,
      'JDinput--invalid': isValid === false,
    });

    return (
      <div className="JDinput-wrap">
        <input
          onChange={this.handleChange}
          className={classes}
          disabled={disabled}
          readOnly={readOnly}
          value={value}
          type={type}
        />
        <label htmlFor="JDinput" className="JDinput_label">
          {label}
        </label>
      </div>
    );
  }
}

InputText.defaultProps = FormsDefault;

export default ErrProtecter(InputText);
