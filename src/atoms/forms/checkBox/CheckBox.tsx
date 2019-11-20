import React from "react";
import "./CheckBox.scss";
import classNames from "classnames";
import ErrProtecter from "../../../utils/errProtect";

interface IProps {
  disabled?: boolean;
  checked?: boolean | null;
  label?: string;
  className?: string;
  size?: "small";
  onChange?(foo: boolean): void;
  id?: string;
}

const JDcheckbox: React.FC<IProps> = ({
  disabled,
  checked = false,
  onChange,
  size,
  label,
  className,
  ...props
}) => {
  const warpClasses = classNames("JDcheck_box_wrap", className, {
    "JDcheck_box_wrap--small": size === "small"
  });
  const classes = classNames("JDcheck_box", className, {
    "JDcheck_box--small": size === "small"
  });

  const onHandleClick = () => {
    if (checked !== undefined && onChange) {
      const flag = disabled ? checked : !checked;
      onChange(flag || false);
    }
  };

  return (
    <span
      className={`${warpClasses}`}
      tabIndex={0}
      role="button"
      onKeyPress={onHandleClick}
      onClick={onHandleClick}
    >
      <input
        {...props}
        onChange={() => {}}
        checked={checked || false}
        disabled={disabled}
        className={classes}
        type="checkbox"
      />
      <span className="JDcheck_box_label">{label}</span>
    </span>
  );
};

JDcheckbox.defaultProps = {
  checked: false,
  disabled: false
};

export default ErrProtecter(JDcheckbox);
