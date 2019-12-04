import React, { useState } from "react";
import "./MultiBox.scss";
import classNames from "classnames";
import Button from "../button/Button";
import { s4 } from "../../utils/utils";

interface IProps {
  labels: string[];
  selectedValue: string[];
  value: string[];
  onChange: (value: string[]) => void;
  withAllToogler?: boolean;
  defaultAllToogle?: boolean;
  withAllTooglerLabel?: string;
  className?: string;
  noWrap?: boolean;
}

const JDmultiBox: React.FC<IProps> = ({
  value,
  selectedValue,
  defaultAllToogle = false,
  labels,
  onChange,
  withAllToogler,
  withAllTooglerLabel,
  className,
  noWrap
}) => {
  const [onAllToggle, setAllToggle] = useState(defaultAllToogle);
  const handleMultiBoxAllChange = () => {
    setAllToggle(!onAllToggle);
    onChange(!onAllToggle ? value : []);
  };

  const handleMultiBoxChange = (inValue: string) => {
    const index = selectedValue.findIndex(inInValue => inInValue === inValue);
    if (index === -1) {
      selectedValue.push(inValue);
    } else {
      selectedValue.splice(index, 1);
    }
    onChange(selectedValue.slice());
  };

  const classes = classNames("multiBox", className, {
    "multiBox--noWrap": noWrap
  });

  const innerClasses = classNames("multiBox__inner", undefined, {
    "multiBox__inner--noWrap": noWrap
  });

  return (
    <div className={`multiBox ${classes}`}>
      <div className={innerClasses}>
        {withAllToogler && (
          <Button
            size="small"
            toggle={onAllToggle}
            label={withAllTooglerLabel}
            onClick={handleMultiBoxAllChange}
          />
        )}
        {labels.map((label, index) => (
          <Button
            size="small"
            key={s4()}
            toggle={selectedValue.includes(value[index])}
            label={label}
            onClick={() => handleMultiBoxChange(value[index])}
          />
        ))}
      </div>
    </div>
  );
};

export default JDmultiBox;
