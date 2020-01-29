import React from "react";
import { ISpan, JDatomExtentionSet } from "../../types/interface";
import classnames from "classnames";
import { colorClass } from "../../utils/utils";
import { JDColor, TextSize } from "../../types/enum";
import "./TextButton.scss";
import { textSizeClass, JDmrClass, JDmbClass } from "../../utils/autoClasses";

interface Iprops extends ISpan, JDatomExtentionSet {
  color?: JDColor;
  size?: TextSize;
  anchor?: boolean;
  mode?: "roundBorder";
}

const TextButton: React.FC<Iprops> = ({
  anchor,
  size,
  mode,
  color,
  className,
  mb,
  mr,
  ...props
}) => {
  const classNames = classnames("textButton", className, {
    "textButton--anchor": anchor,
    "textButton--roundBorder": mode === "roundBorder",
    ...colorClass("textButton", color),
    ...textSizeClass("textButton", size),
    ...JDmbClass(mb),
    ...JDmrClass(mr)
  });

  return <span className={classNames} {...props} />;
};

export default TextButton;
