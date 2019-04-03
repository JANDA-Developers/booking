import React, { useEffect, useRef } from 'react';
import './InputText.scss';
import './Textarea.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import JDicon from '../icons/Icons';
import ErrProtecter from '../../utils/ErrProtecter';
import { NEUTRAL } from '../../utils/Enums';
import autoHyphen from '../../utils/AutoHyphen';

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
  hyphen,
  ...props
}) {
  const inHandleChange = (event) => {
    const { target } = event;
    const result = validation(target.value, max);
    onChange(target.value.replace(/-/gi, ''));
    onChangeValid(result);
  };

  const classes = classNames(textarea ? 'JDtextarea' : 'JDinput', props && props.className, {
    'JDinput--valid': isValid === true && !textarea,
    'JDinput--invalid': isValid === false && !textarea,
    /* --------------------------------- 텍스트어리어 --------------------------------- */
    'JDtextarea--scroll': scroll && textarea,
    'JDtextarea--doubleHeight': doubleHeight && textarea,
    'JDtextarea--valid': isValid === true,
    'JDtextarea--invalid': isValid === false,
  });

  const inRefContainer = useRef(null);

  // ⚠️ 언컨트롤드를 위해서 만들었는데  왜필요한지 모르겠다
  useEffect(() => {
    // let domInput;
    // if (refContainer) domInput = refContainer.current;
    // else domInput = inRefContainer.current;
    // if (value !== undefined) domInput.value = value;
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
        disabled={disabled}
        readOnly={readOnly}
        type={type}
        value={hyphen ? autoHyphen(value) : value}
        ref={refContainer || inRefContainer}
        data-color="1213"
        {...props}
        className={classes}
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
