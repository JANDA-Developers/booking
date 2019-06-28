import classNames from "classnames";
import React, {Fragment} from "react";
import ErrProtecter from "../../utils/errProtect";
import {IUl} from "../../types/interface";
import {s4} from "../../utils/utils";
import "./List.scss";

interface IProps extends IUl {
  className?: string;
  border?: boolean;
  stripe?: boolean;
  withIndex?: boolean;
  contents: any[];
  align?: "center" | "left" | "right";
  marginBottom?: "short" | "normal" | "long";
}

const JDlist: React.FC<IProps> = ({
  children,
  className,
  border,
  stripe,
  withIndex,
  marginBottom = "normal",
  align = "left",
  contents,
  ...props
}) => {
  const classes = classNames("JDlist", className, {
    "JDlist--left": align === "left",
    "JDlist--center": align === "center",
    "JDlist--right": align === "right",
    "JDlist--bordered": border,
    "JDlist--stripe": stripe,
    "JDlist--mbShort": marginBottom === "short",
    "JDlist--mbNormal": marginBottom === "normal",
    "JDlist--mbLong": marginBottom === "long"
  });

  return (
    <Fragment>
      <ul className={classes} {...props}>
        {contents.map((content, index) => (
          <li className="JDlist__li" key={s4()}>
            <Fragment>
              {withIndex && <span className="JDlist__index">{index}</span>}{" "}
              {content}
            </Fragment>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default ErrProtecter<IProps>(JDlist);
