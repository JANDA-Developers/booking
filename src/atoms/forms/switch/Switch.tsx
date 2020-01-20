import React from "react";
import "./Switch.scss";
import classNames from "classnames";
import JDlabel from "../../label/JDLabel";
import { s4 } from "../../../utils/utils";
import Tooltip from "../../tooltip/Tooltip";
import { JDatomExtentionSet, ISpan } from "../../../types/interface";
import { JDmrClass, JDmbClass } from "../../../utils/autoClasses";

interface IProps extends JDatomExtentionSet {
  disabled?: boolean;
  checked?: boolean;
  onChange?(foo: boolean): void;
  label?: string | JSX.Element;
  ltxt?: string;
  rtxt?: string;
  tooltip?: string;
  id?: string;
  className?: string;
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
  mb,
  className,
  ...props
}) => {
  const handleCheckboxChange = () => {
    const flag = disabled ? checked : !checked;
    onChange && onChange(flag);
  };

  const classes = classNames(className, undefined, {
    JDswitch__input: true
  });

  const newId = s4();

  const wrapClasses = classNames("JDswitch-wrap", undefined, {
    ...JDmbClass(mb),
    ...JDmrClass(mr)
  });

  return (
    <span
      {...props}
      className={"JDswitch-wrapWrap"}
      data-tip={tooltip}
      data-for={tooltip ? `btnTooltip${newId}` : undefined}
    >
      <span className={wrapClasses}>
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
