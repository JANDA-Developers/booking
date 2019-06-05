import React, {useEffect, useRef, useState, FormEvent} from "react";
import "./InputText.scss";
import "./Textarea.scss";
import classNames from "classnames";
import JDicon, {IconSize, IIcons} from "../../icons/Icons";
import ErrProtecter from "../../../utils/errProtect";
import autoHyphen, {numberStr, stringToNumber} from "../../../utils/autoFormat";
import {NEUTRAL} from "../../../types/enum";
import {getByteLength} from "../../../utils/elses";
import {autoComma} from "../../../utils/utils";

interface IProps extends React.HTMLAttributes<HTMLInputElement> {
  readOnly?: boolean;
  disabled?: boolean;
  textarea?: boolean;
  scroll?: boolean;
  doubleHeight?: boolean;
  halfHeight?: boolean;
  label?: string;
  type?: string;
  dataError?: string;
  icon?: IIcons;
  iconHover?: boolean;
  iconOnClick?: any;
  dataSuccess?: string;
  validation?: any;
  // 음... 곤란하군 만약에 이벤트 객체를 핸들링할 경우가 생긴다면
  // onChnage=> onChangeValue로 바꾸어야겠다.
  onChange?(foo?: any): void;
  onChangeValid?: any;
  onBlur?(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>): any;
  refContainer?: any;
  isValid?: any;
  value?: string | null | number;
  max?: number;
  defaultValue?: string;
  // 컨트롤 일때만 작동함
  hyphen?: boolean;
  byte?: boolean;
  comma?: boolean;
  allWaysShowValidMessage?: boolean;
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
  halfHeight,
  dataError,
  dataSuccess,
  allWaysShowValidMessage,
  icon,
  iconOnClick,
  iconHover,
  hyphen,
  byte,
  comma,
  ...props
}) => {
  const [selfValid, setSelfValid] = useState<boolean | "">("");

  const valueFormat = (inValue: any) => {
    let inInValue = inValue;

    if (inInValue === NaN) inInValue = 0;
    if (typeof inValue === "number") {
      inInValue = inInValue.toString();
    }
    if (typeof inInValue === "string") {
      if (hyphen) return autoHyphen(inInValue);
      if (comma) return autoComma(inInValue);
      return inInValue;
    }
    return undefined;
  };

  const inHandleChange = (event: any) => {
    const {target} = event;
    const result = validation(target.value, max);
    if (onChange) {
      if (hyphen || comma) {
        if (typeof value === "number") {
          onChange(stringToNumber(target.value));
        } else {
          onChange(numberStr(target.value));
        }
      } else onChange(target.value);
    }

    onChangeValid ? onChangeValid(result) : setSelfValid(result);

    if (!value && (hyphen || comma)) {
      target.value = valueFormat(target.value);
    }
  };

  const {className} = props;
  const classes = classNames(textarea ? "JDtextarea" : "JDinput", className, {
    "JDinput--labeled": label !== undefined && !textarea,
    "JDinput--valid": (isValid === true || selfValid === true) && !textarea,
    "JDinput--invalid": (isValid === false || selfValid === false) && !textarea,
    "JDinput--allWaysShowValidMessage":
      allWaysShowValidMessage === true && !textarea,
    /* --------------------------------- 텍스트어리어 --------------------------------- */
    "JDtextarea--labeled": label !== undefined && textarea,
    "JDtextarea--scroll": scroll && textarea,
    "JDtextarea--doubleHeight": doubleHeight && textarea,
    "JDtextarea--halfHeight": halfHeight && textarea,
    "JDtextarea--valid": isValid === true,
    "JDtextarea--invalid": isValid === false
  });

  const inRefContainer = useRef(null);

  // 벨리데이션과 언컨트롤일때 defaultValue를 설정하는 역할을함
  useEffect(() => {
    let domInput;
    onChangeValid && onChangeValid(validation(formatedValue));
    if (refContainer) domInput = refContainer.current;
    else domInput = inRefContainer.current;
    if (typeof defaultValue === "undefined") return;
    if (typeof defaultValue === "string" || "number") {
      domInput.value = valueFormat(defaultValue);
      onChangeValid && onChangeValid(validation(defaultValue));
    }
  }, []);

  const formatedValue = valueFormat(value);

  // 인풋 과 텍스트어리어 경계
  return !textarea ? (
    <div className="JDinput-wrap">
      {icon ? (
        <span className="JDinput-iconWrap">
          {icon && (
            <JDicon
              size={IconSize.MEDIUM}
              onClick={iconOnClick}
              hover={iconHover}
              icon={icon}
            />
          )}
        </span>
      ) : null}
      <input
        onChange={inHandleChange}
        disabled={disabled}
        readOnly={readOnly}
        onBlur={onBlur}
        type={type}
        value={formatedValue}
        ref={refContainer || inRefContainer}
        data-color="1213"
        className={classes}
        {...props}
      />
      <label
        htmlFor="JDinput"
        data-error={dataError}
        data-success={dataSuccess}
        className="JDinput_label"
      >
        {label}
      </label>
    </div>
  ) : (
    <div className="JDinput-wrap">
      <textarea
        disabled={disabled}
        value={formatedValue || undefined}
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
      {byte && (
        <span className="JDtextarea__byte">
          {getByteLength(formatedValue || undefined)}
        </span>
      )}
    </div>
  );
};

InputText.defaultProps = {
  readOnly: false,
  disabled: false,
  textarea: false,
  scroll: false,
  doubleHeight: false,
  label: "",
  type: "",
  dataError: "",
  dataSuccess: "",
  isValid: "",
  validation: () => NEUTRAL,
  max: 10000,
  refContainer: undefined,
  value: undefined
};

export default ErrProtecter(InputText);
