import React from "react";
import { ISpan } from "../../types/interface";
import classnames from "classnames";
import { colorClass } from "../../utils/utils";
import { JDColor, TextSize } from "../../types/enum";
import "./TextButton.scss";
import { textSizeClass } from "../../utils/autoClasses";

interface Iprops extends ISpan {
  color?: JDColor;
  size?: TextSize;
}

const TextButton: React.FC<Iprops> = ({ size, color, className, ...props }) => {
  const classNames = classnames("TextButton", className, {
    ...colorClass("TextButton", color),
    ...textSizeClass("TextButton", size)
  });

  return <span className={classNames} {...props} />;
};

export default TextButton;
