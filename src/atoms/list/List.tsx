import classNames from "classnames";
import React, { Fragment } from "react";
import ErrProtecter from "../../utils/errProtect";
import { IUl, JDatomExtentionSet } from "../../types/interface";
import { s4, textAlignClass } from "../../utils/utils";
import "./List.scss";
import { TextAlign, TextSize } from "../../types/enum";
import { JDmbClass, JDmrClass, textSizeClass } from "../../utils/autoClasses";

interface IProps extends IUl, JDatomExtentionSet {
  className?: string;
  border?: boolean;
  stripe?: boolean;
  withIndex?: boolean;
  contents: any[];
  align?: TextAlign;
  noWrap?: boolean;
  size?: TextSize;
  marginBottom?: "short" | "normal" | "long";
  linePoint?: string;
}

const JDlist: React.FC<IProps> = ({
  children,
  className,
  noWrap,
  border,
  stripe,
  withIndex,
  marginBottom = "normal",
  align = "left",
  contents,
  linePoint,
  mb,
  mr,
  size,
  ...props
}) => {
  const classes = classNames("JDlist", className, {
    ...textAlignClass("JDlist", align),
    "JDlist--bordered": border,
    "JDlist--stripe": stripe,
    "JDlist--mbShort": marginBottom === "short",
    "JDlist--mbNormal": marginBottom === "normal",
    "JDlist--mbLong": marginBottom === "long",
    "JDlist--whiteSpace": noWrap,
    ...JDmbClass(mb),
    ...JDmrClass(mr),
    ...textSizeClass("textButton", size)
  });

  return (
    <Fragment>
      <ul className={classes} {...props}>
        {contents.map((content, index) => (
          <li className="JDlist__li" key={s4()}>
            <Fragment>
              {linePoint ||
                (withIndex && (
                  <span className="JDlist__index">
                    {withIndex && index}
                    {linePoint && `${linePoint}`}
                  </span>
                ))}
              {content}
            </Fragment>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default JDlist;
