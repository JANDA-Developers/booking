import React, { useEffect, useRef, useState } from 'react';
import './InputText.scss';
import './Textarea.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import JDicon from '../icons/Icons';
import ErrProtecter from '../../utils/ErrProtecter';
import { NEUTRAL } from '../../utils/Enums';
import autoHyphen from '../../utils/AutoHyphen';

interface IProps extends React.HTMLAttributes<HTMLInputElement> {
  readOnly?: boolean;
  disabled?: boolean;
  textarea?: boolean;
  scroll?: boolean;
  doubleHeight?: boolean;
  label?: string;
  type?: string;
  dataError?: string;
  icon?: string;
  dataSuccess?: string;
  validation?: any;
  onChange?: any;
  onChangeValid?: any;
  onBlur?: any;
  refContainer?: any;
  isValid?: any;
  value?: string;
  max?: number;
  defaultValue?: string;
  hyphen?: boolean;
}

const InputText: React.FC<IProps> = ({
  readOnly,
  label,
  disabled,
  type,
  validation,
  onChange,
  onBlur,
  max,
  isValid,
  onChangeValid,
  refContainer,
  textarea,
  scroll,
  value,
  defaultValue, // UNcontrolled
  doubleHeight,
  dataError,
  dataSuccess,
  icon,
  hyphen,
  ...props
}) => {
  const inHandleChange = (event: any) => {
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

  // for unControlled
  useEffect(() => {
    let domInput;
    if (refContainer) domInput = refContainer.current;
    else domInput = inRefContainer.current;
    if (defaultValue !== undefined) domInput.value = defaultValue;
  }, []);

  // 인풋 과 텍스트어리어 경계
  return !textarea ? (
    <div className="JDinput-wrap">
      {icon !== '' ? <span className="JDinput-iconWrap">{icon && <JDicon icon={icon} />}</span> : null}
      <input
        onChange={inHandleChange}
        disabled={disabled}
        readOnly={readOnly}
        onBlur={onBlur}
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
        onBlur={onBlur}
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
};

InputText.defaultProps = {
  readOnly: false,
  disabled: false,
  textarea: false,
  scroll: false,
  doubleHeight: false,
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
