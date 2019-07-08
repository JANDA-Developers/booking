import React from "react";
import "./Radio.scss";
import classNames from "classnames";
import PropTypes from "prop-types";
import ErrProtecter from "../../../utils/errProtect";

interface IProps {
  id: string;
  groupName: string;
  label?: string;
  disabled?: boolean;
  selectedValue?: any;
  onChange?(foo?: any): void;
  value?: any;
  checked?: boolean;
}

const JDradio: React.FC<IProps> = ({
  id,
  disabled,
  groupName,
  label,
  onChange,
  value,
  selectedValue,
  checked = false
}) => {
  const handleRadioChange = () => {
    if (!disabled) {
      onChange && onChange(value);
    }
  };

  const classes = classNames({
    JDradio__input: true,
    "JDradio__input--gap": true
  });

  return (
    <span className="JDradio">
      <label tabIndex={0} role="button" htmlFor={id}>
        <input
          id={id}
          className={classes}
          name={groupName}
          type="radio"
          value={value}
          disabled={disabled}
          checked={checked || selectedValue === value}
          onClick={handleRadioChange}
        />
        <span className="JDradio__label" />
        {label && <span className="JDradio__label-text">{label}</span>}
      </label>
    </span>
  );
};

export default ErrProtecter(JDradio);
