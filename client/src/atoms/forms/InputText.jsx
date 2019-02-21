/* eslint-disable no-underscore-dangle */
import React, { useEffect, useRef } from 'react';
import './InputText.scss';
import './Textarea.scss';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import ErrProtecter from '../../utils/ErrProtecter';
import { NEUTRAL } from '../../utils/Enums';

function InputText({
  readOnly,
  label,
  disabled,
  type,
  validation,
  onChange,
  max,
  isValid,
  onChangeValid,
  refContainer,
  textarea,
  scroll,
  value,
  doubleHeight,
}) {
  // 인풋의 상태에따라서 상태값이 표시됨

  const inbounceHandleChange = (target) => {
    const result = validation(target.value, max);
    onChange(target.value);
    onChangeValid(result);
  };

  const inDebounceHandleChange = debounce(inbounceHandleChange, 500);

  const inHandleChange = (event) => {
    const { target } = event;
    inDebounceHandleChange(target);
  };

  const classes = classNames({
    JDinput: true && !textarea,
    'JDinput--valid': isValid === true && !textarea,
    'JDinput--invalid': isValid === false && !textarea,
    JDtextarea: true && textarea,
    'JDtextarea--scroll': scroll && textarea,
    'JDtextarea--doubleHeight': doubleHeight && textarea,
    'JDtextarea--valid': isValid === true,
    'JDtextarea--invalid': isValid === false,
  });

  const inRefContainer = useRef(null);

  useEffect(() => {
    let domInput;
    if (refContainer) {
      domInput = refContainer.current;
    } else {
      domInput = inRefContainer.current;
    }
    if (value !== undefined) domInput.value = value;
  }, []);

  return !textarea ? (
    <div className="JDinput-wrap">
      <input
        onChange={inHandleChange}
        className={classes}
        disabled={disabled}
        readOnly={readOnly}
        type={type}
        ref={refContainer || inRefContainer}
      />
      <label htmlFor="JDinput" className="JDinput_label">
        {label}
      </label>
    </div>
  ) : (
    <div className="JDinput-wrap">
      <textarea
        disabled={disabled}
        value={value}
        onChange={inHandleChange}
        id="JDtextarea"
        className={classes}
        readOnly={readOnly}
        ref={refContainer || inRefContainer}
      />
      <label htmlFor="JDtextarea" className="JDtextarea_label">
        {label}
      </label>
    </div>
  );
}

// todo: Max를 어떻게 할수없나?
InputText.propTypes = {
  readOnly: PropTypes.bool,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  validation: PropTypes.func,
  onChange: PropTypes.func,
  max: PropTypes.number,
  isValid: PropTypes.any,
  onChangeValid: PropTypes.func,
  refContainer: PropTypes.any,
  textarea: PropTypes.bool,
  scroll: PropTypes.bool,
  value: PropTypes.any,
  doubleHeight: PropTypes.bool,
};

InputText.defaultProps = {
  readOnly: false,
  label: '',
  disabled: false,
  type: '',
  validation: () => NEUTRAL,
  onChange: () => {},
  max: 10000,
  isValid: '',
  onChangeValid: () => {},
  refContainer: undefined,
  textarea: false,
  scroll: false,
  value: undefined,
  doubleHeight: false,
};

export default ErrProtecter(InputText);
