import React from "react";
import { IDiv } from "../../../types/interface";
import classNames from "classnames";

interface Iprops extends IDiv {
  desc?: string | JSX.Element;
  title?: string;
  propsendCircle?: boolean;
}

const JDboxHeader: React.FC<Iprops> = ({
  className,
  title,
  desc,
  ...props
}) => {
  const classes = classNames("JDboxHeader", className, {});
  return (
    <div className={classes} {...props}>
      <div className="JDboxHeader__titleSection">
        <h6 className="JDboxHeader__title JDstandard-small-space JDmargin-bottom0">
          <b>{title} </b>
        </h6>
        {desc && <div className="JDboxHeader__decs">{desc}</div>}
      </div>
    </div>
  );
};

export default JDboxHeader;
