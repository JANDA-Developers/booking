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
  anchor?: boolean;
}

const TextButton: React.FC<Iprops> = ({ anchor, size, color, className, ...props }) => {
  const classNames = classnames("textButton", className, {
    "textButton--anchor": anchor,
    ...colorClass("textButton", color),
    ...textSizeClass("textButton", size)
  });

  return <span className={classNames} {...props} />;
};

export default TextButton;
