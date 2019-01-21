import React, { Component } from 'react';
import './Textarea.scss';
import debounce from 'lodash.debounce';
import { Forms, FormsDefault } from '../../utils/PropTypes';
import { emBol } from '../../utils/Enums';
import ErrProtecter from '../../utils/ErrProtecter';

class Textarea extends Component {
  static propTypes = Forms;

  constructor(props) {
    super(props);
    this.disabled = props.disabled;
    this.validation = props.validation;
    // 디바운스 함수는 메모리에서 사라지는 EVENT 객체를 보호합니다.
    this.debounceHandleChange = debounce(this.debounceHandleChange, 500);
    this.classes = ['JDtextarea'].concat(props.classes);
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
  // 이부분이 input 과 중복 이긴하나 추후에 제거 하겠습니다. 이게 얼마나 반복될지에따라서...
  debounceHandleChange = (target) => {
    this.classes.filter(val => val !== 'JDinput--valid' || 'JDinput--invalid');
    const validation = this.validation(target.value, this.max);
    if (validation === emBol.NEUTRAL) {
      this.setState({
        classes: this.classes,
      });
    } else if (validation) {
      this.classes.concat('JDinput--valid');
      this.setState({
        classes: this.classes,
      });
    } else {
      this.classes.concat('JDinput--invalid');
      this.setState({
        classes: this.classes,
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

Textarea.defaultProps = FormsDefault;

export default ErrProtecter(Textarea);
