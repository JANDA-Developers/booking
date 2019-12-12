import React from "react";
import JDLabel from "../../label/JDLabel";
import { IDiv } from "../../../types/interface";
import classNames from "classnames";
import BaseHeader from "../../base/BaseHeader";

interface Iprops {
  headerRgiht?: JSX.Element | JSX.Element[];
  title: string;
  desc?: string;
}

const CardHeader: React.FC<Iprops & IDiv> = ({
  headerRgiht,
  className,
  title,
  desc,
  ...props
}) => {
  const classes = classNames("cardHeader", className, {});
  return (
    <BaseHeader {...props} className={classes}>
      <div className="cardHeader__titleSection">
        <h5 className="cardHeader__title JDstandard-space">
          <b>{title} </b>
        </h5>
        {desc && <div className="cardHeader__decs">{desc}</div>}
        <div className="cardHeader__rightWrap">
          {headerRgiht && <div>{headerRgiht}</div>}
        </div>
      </div>
    </BaseHeader>
  );
};

export default CardHeader;
