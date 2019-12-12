import React from "react";
import { IDiv } from "../../types/interface";
import "./BaseHeader.scss";
import classNames from "classnames";
interface Iprops extends IDiv {}

const BaseHeader: React.FC<Iprops> = prop => {
  const classes = classNames("baseHeader", prop.className, {});
  return <div {...prop} className={classes} />;
};

export default BaseHeader;
