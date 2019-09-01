import classNames from "classnames";
import React, {Fragment} from "react";
import ErrProtecter from "../../utils/errProtect";
import {IUl} from "../../types/interface";
import {s4, textAlignClass} from "../../utils/utils";
import "./List.scss";
import {TextAlign} from "../../types/enum";

interface IProps extends IUl {
  className?: string;
  border?: boolean;
  stripe?: boolean;
  withIndex?: boolean;
  contents: any[];
  align?: TextAlign;
  noWrap?: boolean;
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
  ...props
}) => {
  const classes = classNames("JDlist", className, {
    ...textAlignClass("JDlist", align),
    "JDlist--bordered": border,
    "JDlist--stripe": stripe,
    "JDlist--mbShort": marginBottom === "short",
    "JDlist--mbNormal": marginBottom === "normal",
    "JDlist--mbLong": marginBottom === "long",
    "JDlist--whiteSpace": noWrap
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
                    {linePoint && `${linePoint}`}
                    {withIndex && index}
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
