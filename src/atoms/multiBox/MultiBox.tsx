import React, {useState} from "react";
import "./MultiBox.scss";
import classNames from "classnames";
import Button from "../button/Button";
import {s4} from "../../utils/utils";

interface IProps {
  labels: string[];
  selectedValue: string[];
  value: string[];
  onChange: (value: string[]) => void;
  withAllToogler?: boolean;
  defaultAllToogle?: boolean;
  withAllTooglerLabel?: string;
}

const JDmultiBox: React.FC<IProps> = ({
  value,
  selectedValue,
  defaultAllToogle = false,
  labels,
  onChange,
  withAllToogler,
  withAllTooglerLabel
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

  const classes = classNames({
    JDswitch__input: true
  });

  return (
    <div className="multiBox">
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
  );
};

export default JDmultiBox;
