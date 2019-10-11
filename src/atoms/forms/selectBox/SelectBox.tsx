import React from "react";
import Select from "react-select";
import "./SelectBox.scss";
import PropTypes from "prop-types";
import classNames from "classnames";
import {SelectComponentsProps} from "react-select/lib/Select";
import {isEmpty} from "../../../utils/utils";

export interface IselectedOption<T = any> {
  label: string;
  value: T;
}

export enum SelectBoxSize {
  TWO = "4rem",
  FOUR = "6rem",
  SIX = "9rem",
  FIVE = "11rem"
}

// Value === selectedOption
// defaultValue 는 그 값이 바뀌어도 업데이트 되지않을것임
interface Iprops extends SelectComponentsProps {
  label?: string | JSX.Element;
  disabled?: boolean;
  selectedOption?: IselectedOption | null;
  options?: IselectedOption[];
  onChange?(foo: IselectedOption): void;
  className?: string;
  rightLabel?: string;
  props?: any;
  defaultValue?: IselectedOption | null;
  isOpen?: boolean;
  menuCanOverflow?: boolean;
  textOverflow?: "visible" | "hidden";
  mode?: "small";
  size?: SelectBoxSize;
  background?: "white";
  borderColor?: "primary";
  displayArrow?: boolean;
}

const JDselect: React.SFC<Iprops> = ({
  label,
  disabled,
  selectedOption,
  onChange,
  noOptionsMessage = "--",
  rightLabel,
  options,
  mode,
  className,
  size,
  isOpen,
  defaultValue,
  placeholder,
  textOverflow,
  background,
  menuCanOverflow,
  displayArrow,
  borderColor,
  autoSize,
  // eslint-disable-next-line no-unused-vars
  ...props
}) => {
  // 👿 이거 ㅇefaultValue랑 selectedOption이랑 많이 햇갈림ㅠㅠ
  // placeHolder 가 보일려면 value 는 undefined 여야 합니다.
  let validSelectedOption;
  if (selectedOption && selectedOption.value === undefined)
    validSelectedOption = undefined;
  else validSelectedOption = selectedOption;

  const handleChange = (selectOption: any) => {
    onChange && onChange(selectOption);
  };

  const classes = classNames("JDselect", className, {
    "JDselect--unDisplayArrow": displayArrow === false,
    "JDselect--disabled": disabled,
    "JDselect--small": mode === "small",
    "JDselect--bg": background === "white",
    "JDselect--border-primary": borderColor === "primary",
    "JDselect--textOverflowVisible": textOverflow === "visible",
    "JDselect--menuCanOverflow": menuCanOverflow,
    "JDselect--autoSize": autoSize
  });

  const selectStyle: any = {
    width: size
  };

  const deafultPlaceHolder = "선택";

  return (
    <div style={selectStyle} className={classes}>
      {label !== "" ? (
        <span className="JDselect__label JDselect__label--top">{label}</span>
      ) : null}
      <Select
        {...props}
        options={options}
        value={validSelectedOption}
        defaultValue={defaultValue}
        onChange={handleChange}
        className="react-select-container"
        classNamePrefix="react-select"
        isDisabled={disabled}
        noOptionsMessage={() => noOptionsMessage}
        placeholder={placeholder || deafultPlaceHolder}
        // menuIsOpen={true}
      />
      {rightLabel && (
        <span className="JDselect__label JDselect__label--right">
          {rightLabel}
        </span>
      )}
    </div>
  );
};

JDselect.defaultProps = {
  disabled: false,
  label: "",
  onChange: () => {},
  selectedOption: undefined,
  props: {}
};

export default JDselect;
