import React, { Component } from 'react';
import './Textarea.scss';
import debounce from 'lodash.debounce';
import classNames from 'classnames/bind';
import { Forms, FormsDefault } from '../../utils/PropTypes';
import ErrProtecter from '../../utils/ErrProtecter';

class Textarea extends Component {
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

  // todo: em부분 좀 어떻게 해보자 좋은 방법이 있을텐데
  // todo: 이부분이 input 과 중복 이긴하나 추후에 제거 하겠습니다. 이게 얼마나 반복될지에따라서...
  debounceHandleChange = (target) => {
    const { validation, max } = this.props;
    const result = validation(target.value, max);
    this.setState({
      isValid: result,
    });
  };

  // todo: html for 저거좀 어떻게 해보자
  render() {
    const { isValid } = this.state;
    const {
      disabled, value, label, readOnly, scroll,
    } = this.props;

    const classes = classNames({
      JDtextarea: true,
      'JDtextarea--scroll': scroll,
      'JDtextarea--valid': isValid === true,
      'JDtextarea--invalid': isValid === false,
    });

    return (
      <div className="JDinput-wrap">
        <textarea
          value={value}
          onChange={this.handleChange}
          id="JDtextarea"
          className={classes}
          disabled={disabled}
          readOnly={readOnly}
        />
        <label htmlFor="JDtextarea" className="JDtextarea_label">
          {label}
        </label>
      </div>
    );
  }
}

Textarea.defaultProps = FormsDefault;

export default ErrProtecter(Textarea);
