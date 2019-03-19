import React, { useEffect, useRef } from 'react';
import './InputText.scss';
import './Textarea.scss';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import JDicon from '../icons/Icons';
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
  dayPicker,
  doubleHeight,
  dataError,
  dataSuccess,
  icon,
  ...props
}) {
  // 중복방지
  const inbounceHandleChange = (target) => {
    const result = validation(target.value, max);
    onChange(target.value);
    onChangeValid(result);
  };

  const inDebounceHandleChange = debounce(inbounceHandleChange, 100);

  const inHandleChange = (event) => {
    const { target } = event;
    inDebounceHandleChange(target);
  };

  const classes = classNames({
    JDinput: true && !textarea,
    'JDinput--valid': isValid === true && !textarea,
    'JDinput--invalid': isValid === false && !textarea,
    /* --------------------------------- 텍스트어리어 --------------------------------- */
    JDtextarea: true && textarea,
    'JDtextarea--scroll': scroll && textarea,
    'JDtextarea--doubleHeight': doubleHeight && textarea,
    'JDtextarea--valid': isValid === true,
    'JDtextarea--invalid': isValid === false,
  });

  const inRefContainer = useRef(null);

  useEffect(() => {
    let domInput;

    if (refContainer) domInput = refContainer.current;
    else domInput = inRefContainer.current;
    if (value !== undefined) domInput.value = value;
  }, []);

  // 인풋 과 텍스트어리어 경계
  return !textarea ? (
    <div className="JDinput-wrap">
      {icon !== '' ? (
        <span className="JDinput-iconWrap">
          <JDicon icon={icon} />
        </span>
      ) : null}
      <input
        onChange={inHandleChange}
        className={classes}
        disabled={disabled}
        readOnly={readOnly}
        type={type}
        value={dayPicker ? value : undefined}
        ref={refContainer || inRefContainer}
        data-color="1213"
        {...props}
      />
      <label htmlFor="JDinput" data-error={dataError} data-success={dataSuccess} className="JDinput_label">
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

InputText.propTypes = {
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  textarea: PropTypes.bool,
  dayPicker: PropTypes.bool,
  scroll: PropTypes.bool,
  doubleHeight: PropTypes.bool,
  label: PropTypes.string,
  type: PropTypes.string,
  dataError: PropTypes.string,
  icon: PropTypes.string,
  dataSuccess: PropTypes.string,
  validation: PropTypes.func,
  onChange: PropTypes.func,
  onChangeValid: PropTypes.func,
  refContainer: PropTypes.any,
  isValid: PropTypes.any,
  value: PropTypes.any,
  max: PropTypes.number,
};

InputText.defaultProps = {
  readOnly: false,
  disabled: false,
  textarea: false,
  scroll: false,
  doubleHeight: false,
  dayPicker: false,
  label: '',
  type: '',
  dataError: '',
  icon: '',
  dataSuccess: '',
  isValid: '',
  onChangeValid: () => {},
  onChange: () => {},
  validation: () => NEUTRAL,
  max: 10000,
  refContainer: undefined,
  value: undefined,
};

export default ErrProtecter(InputText);
