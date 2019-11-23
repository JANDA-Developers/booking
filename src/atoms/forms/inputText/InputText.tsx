import React, { useEffect, useRef, useState, FormEvent } from "react";
import "./InputText.scss";
import "./Textarea.scss";
import classNames from "classnames";
import JDicon, { IconSize, IIcons } from "../../icons/Icons";
import ErrProtecter from "../../../utils/errProtect";
import autoHyphen, {
  numberStr,
  toNumber,
  card_space
} from "../../../utils/autoFormat";
import { NEUTRAL } from "../../../types/enum";
import { getByteLength } from "../../../utils/elses";
import { autoComma, s4 } from "../../../utils/utils";
import $ from "jquery";

interface IProps {
  readOnly?: boolean;
  disabled?: boolean;
  textarea?: boolean;
  scroll?: boolean;
  doubleHeight?: boolean;
  halfHeight?: boolean;
  label?: string;
  size?: "fullWidth" | "fullHeight";
  type?: string;
  textAlign?: "center";
  dataError?: string;
  icon?: IIcons;
  iconHover?: boolean;
  autoHeight?: boolean;
  iconOnClick?: any;
  dataSuccess?: string;
  validation?: any;
  onChange?(value?: any): void;
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
  card?: boolean;
  returnNumber?: boolean;
  allWaysShowValidMessage?: boolean;
  className?: string;
  wrapClassName?: string;
}

const InputText: React.FC<IProps &
  React.AllHTMLAttributes<HTMLInputElement>> = ({
  readOnly,
  label,
  disabled,
  type,
  returnNumber,
  validation,
  onChange,
  className,
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
  autoHeight,
  dataError,
  dataSuccess,
  allWaysShowValidMessage,
  icon,
  iconOnClick,
  textAlign,
  iconHover,
  hyphen,
  byte,
  card,
  size,
  wrapClassName,
  comma,
  ...props
}) => {
  const [selfValid, setSelfValid] = useState<boolean | "">("");

  const valueFormat = (inValue: any) => {
    let inInValue = inValue;

    if (typeof inValue === "number") {
      if (isNaN(inInValue)) inInValue = "";
      inInValue = inInValue.toString();
    }
    if (typeof inInValue === "string") {
      if (card) return card_space(inInValue);
      if (hyphen) return autoHyphen(inInValue);
      if (comma) return autoComma(inInValue);
      return inInValue;
    }
    return undefined;
  };

  const inHandleChange = (event: any) => {
    const { target } = event;
    const result = validation(target.value, max);
    autoChangeHeight();
    if (onChange) {
      if (hyphen || comma) {
        if (typeof value === "number" || returnNumber) {
          onChange(toNumber(target.value));
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

  const wrapClasses = classNames("JDinput-wrap", wrapClassName, {
    "JDinput-wrap--fullWidth": size === "fullWidth",
    "JDinput-wrap--fullHeight": size === "fullHeight"
  });

  const classes = classNames(textarea ? "JDtextarea" : "JDinput", className, {
    "JDinput--labeled": label && !textarea,
    "JDinput--center": textAlign === "center",
    "JDinput--valid": (isValid === true || selfValid === true) && !textarea,
    "JDinput--invalid": (isValid === false || selfValid === false) && !textarea,
    "JDinput--allWaysShowValidMessage":
      allWaysShowValidMessage === true && !textarea,
    /* --------------------------------- 텍스트어리어 --------------------------------- */
    "JDtextarea--autoHeight": autoHeight,
    "JDtextarea--labeled": label && textarea,
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
    if (refContainer) domInput = refContainer.current;
    else domInput = inRefContainer.current;
    if (typeof defaultValue === "undefined") return;
    if (typeof defaultValue === "string" || "number") {
      domInput.value = valueFormat(defaultValue);
      onChangeValid && onChangeValid(validation(defaultValue));
    }
  }, []);

  const autoChangeHeight = () => {
    if (autoHeight) {
      const target = $(`#JDtextarea${newId}`);
      target.height("auto").height(target.prop("scrollHeight") + 12);
    }
  };

  useEffect(() => {
    autoChangeHeight();
  });

  const newId = s4();

  const formatedValue = valueFormat(value);

  // 인풋 과 텍스트어리어 경계
  return !textarea ? (
    <div className={wrapClasses}>
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
    <div className={wrapClasses}>
      <textarea
        disabled={disabled}
        value={formatedValue || undefined}
        onKeyDown={e => {
          e.nativeEvent.stopImmediatePropagation();
          e.stopPropagation();
        }}
        onKeyPress={e => {
          e.nativeEvent.stopImmediatePropagation();
          e.stopPropagation();
        }}
        onChange={inHandleChange}
        onBlur={onBlur}
        id={`JDtextarea${newId}`}
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
