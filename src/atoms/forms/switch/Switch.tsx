import React, { Fragment } from "react";
import "./Switch.scss";
import PropTypes from "prop-types";
import classNames from "classnames";
import wrapClassNames from "classnames";
import ErrProtecter from "../../../utils/errProtect";
import JDlabel from "../../label/JDLabel";
import { s4 } from "../../../utils/utils";
import Tooltip from "../../tooltip/Tooltip";
import { JDatomExtentionSet } from "../../../types/interface";
import { JDmrClass, JDmbClass } from "../../../utils/autoClasses";

interface IProps extends JDatomExtentionSet {
  disabled?: boolean;
  checked?: boolean;
  onChange?(foo: boolean): void;
  label?: string | JSX.Element;
  ltxt?: string;
  rtxt?: string;
  tooltip?: string;
}

const JDswitch: React.FC<IProps> = ({
  disabled,
  checked = false,
  onChange,
  ltxt,
  tooltip,
  rtxt,
  label,
  mr,
  mb
}) => {
  const handleCheckboxChange = () => {
    const flag = disabled ? checked : !checked;
    onChange && onChange(flag);
  };

  const classes = classNames({
    JDswitch__input: true
  });

  const newId = s4();

  const wrapClasses = classNames("JDswitch-wrapWrap", undefined, {
    ...JDmbClass(mb),
    ...JDmrClass(mr)
  });

  return (
    <span
      className={wrapClasses}
      data-tip={tooltip}
      data-for={tooltip ? `btnTooltip${newId}` : undefined}
    >
      <span className="JDswitch-wrap">
        {label && <JDlabel txt={label} />}
        <span
          tabIndex={0}
          className="JDswitch"
          role="button"
          onKeyPress={handleCheckboxChange}
          onClick={handleCheckboxChange}
        >
          <label htmlFor="JDswitch">
            {ltxt && <span className="JDswitch__ltxt">{ltxt}</span>}
            <input
              onChange={() => {}}
              checked={checked}
              className={classes}
              disabled={disabled}
              type="checkbox"
            />
            <span className="JDswitch__lever" />
            {rtxt && <span className="JDswitch__rtxt">{rtxt}</span>}
          </label>
        </span>
        {tooltip && (
          <Tooltip type="dark" effect="solid" id={`btnTooltip${newId}`}>
            <span>{tooltip}</span>
          </Tooltip>
        )}
      </span>
    </span>
  );
};

export default JDswitch;
